/**
 * Generate REST API reference Markdown topics from openapi/storagesphere-api.yaml.
 * Does not modify sidebars.js or introduction-to-the-api-reference.md.
 */

const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');

const ROOT = path.join(__dirname, '..');
const SPEC_PATH = path.join(ROOT, 'openapi', 'storagesphere-api.yaml');
const OUTPUT_DIR = path.join(ROOT, 'docs', 'rest_api_guide', 'api-reference');
const INTRO_FILE = 'introduction-to-the-api-reference.md';

const SLUG_OVERRIDES = {
  generateApiToken: 'generate-api-token',
  listStorageSystems: 'list-storage-systems',
  getStorageSystemDetails: 'get-storage-system-details',
  startStorageDiscovery: 'start-storage-discovery',
  getSystemHealth: 'get-system-health',
  listPerformanceMetrics: 'list-performance-metrics',
  listAlerts: 'list-alerts',
  acknowledgeAlert: 'acknowledge-an-alert',
  listReports: 'list-reports',
  generateReport: 'generate-a-report',
  getJobStatus: 'get-job-status',
};

const HTTP_METHODS = ['get', 'post', 'put', 'patch', 'delete', 'head', 'options'];

function loadSpec() {
  const raw = fs.readFileSync(SPEC_PATH, 'utf8');
  return yaml.load(raw);
}

function titleToSlug(title) {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

function slugForOperation(operationId, summary) {
  return SLUG_OVERRIDES[operationId] || titleToSlug(summary);
}

function resolveRef(spec, ref) {
  if (!ref || !ref.startsWith('#/')) return null;
  const parts = ref.slice(2).split('/');
  let node = spec;
  for (const part of parts) {
    node = node?.[part];
  }
  return node || null;
}

function resolveSchema(spec, schema) {
  if (!schema) return null;
  if (schema.$ref) {
    return resolveSchema(spec, resolveRef(spec, schema.$ref));
  }
  if (schema.allOf) {
    const merged = { type: 'object', properties: {}, required: [] };
    for (const part of schema.allOf) {
      const resolved = resolveSchema(spec, part);
      if (!resolved) continue;
      merged.properties = { ...merged.properties, ...(resolved.properties || {}) };
      if (resolved.required) {
        merged.required = [...new Set([...merged.required, ...resolved.required])];
      }
    }
    return merged;
  }
  return schema;
}

function schemaTypeLabel(schema) {
  if (!schema) return 'object';
  if (schema.type === 'array') {
    const inner = schema.items ? schemaTypeLabel(resolveSchema({ components: { schemas: {} } }, schema.items)) : 'object';
    if (schema.items?.$ref) return 'array of objects';
    return `array of ${inner}s`;
  }
  if (schema.enum) {
    return `string`;
  }
  if (schema.format) {
    return `${schema.type || 'string'}`;
  }
  return schema.type || 'object';
}

function enumSuffix(schema) {
  if (!schema?.enum?.length) return '';
  const values = schema.enum.map((v) => `\`${v}\``).join(', ');
  return ` Supported values: ${values}.`;
}

function schemaPropertyDescription(spec, name, schema, prefix = '') {
  const resolved = resolveSchema(spec, schema);
  const field = prefix ? `${prefix}.${name}` : `\`${name}\``;
  const displayField = prefix ? `\`${prefix}.${name}\`` : `\`${name}\``;
  let desc = resolved?.description || schema?.description || '';
  if (resolved?.enum || schema?.enum) {
    desc = (desc ? desc.replace(/\.$/, '') : 'Value') + enumSuffix(resolved || schema);
  }
  if (resolved?.format === 'date-time') {
    desc = desc ? `${desc} Format: \`date-time\`.` : 'Format: `date-time`.';
  }
  return { field: displayField, type: schemaTypeLabel(resolved || schema), desc };
}

function schemaToRows(spec, schema, prefix = '') {
  const resolved = resolveSchema(spec, schema);
  if (!resolved) return [];

  if (resolved.type === 'array' && resolved.items) {
    const itemSchema = resolveSchema(spec, resolved.items);
    if (itemSchema?.properties) {
      const rows = [];
      if (prefix) {
        rows.push({
          field: `\`${prefix}\``,
          type: 'array of objects',
          desc: resolved.description || 'Items returned by the request.',
        });
      }
      for (const [name, prop] of Object.entries(itemSchema.properties)) {
        const row = schemaPropertyDescription(spec, name, prop, prefix ? `${prefix}[].` : 'items[].');
        row.field = `\`${prefix ? `${prefix}[].${name}` : `items[].${name}`}\``;
        rows.push(row);
      }
      if (resolved.properties?.count) {
        rows.push({
          field: `\`${prefix ? `${prefix.replace(/\[\]$/, '')}` : ''}count\``.replace('``', '`count`'),
          type: 'integer',
          desc: resolved.properties.count.description || 'Number of items returned.',
        });
      }
      return rows;
    }
  }

  if (resolved.properties) {
    const rows = [];
    for (const [name, prop] of Object.entries(resolved.properties)) {
      if (prop.type === 'array' && prop.items?.$ref) {
        const itemSchema = resolveSchema(spec, prop.items);
        rows.push({
          field: `\`${name}\``,
          type: 'array of objects',
          desc: prop.description || `${name} returned by the request.`,
        });
        for (const [itemName, itemProp] of Object.entries(itemSchema.properties || {})) {
          const row = schemaPropertyDescription(spec, itemName, itemProp);
          row.field = `\`${name}[].${itemName}\``;
          rows.push(row);
        }
      } else if (prop.type === 'array') {
        rows.push({
          field: `\`${name}\``,
          type: schemaTypeLabel(prop),
          desc: (prop.description || '') + enumSuffix(prop.items || prop),
        });
      } else {
        rows.push(schemaPropertyDescription(spec, name, prop));
      }
    }
    return rows;
  }

  return [];
}

function buildExampleFromSchema(spec, schema) {
  const resolved = resolveSchema(spec, schema);
  if (!resolved) return {};
  if (resolved.example) return resolved.example;
  if (resolved.properties) {
    const obj = {};
    for (const [key, prop] of Object.entries(resolved.properties)) {
      const r = resolveSchema(spec, prop);
      if (r?.example !== undefined) obj[key] = r.example;
      else if (r?.type === 'array') obj[key] = r.items?.example ? [r.items.example] : [];
      else if (r?.type === 'object') obj[key] = buildExampleFromSchema(spec, r);
      else if (r?.type === 'boolean') obj[key] = true;
      else if (r?.type === 'integer' || r?.type === 'number') obj[key] = 0;
      else obj[key] = '';
    }
    return obj;
  }
  return {};
}

function getSuccessResponse(operation) {
  const codes = ['200', '201', '202', '204'];
  for (const code of codes) {
    if (operation.responses?.[code]) {
      return { code, response: operation.responses[code] };
    }
  }
  return null;
}

function getServerUrl(spec) {
  return spec.servers?.[0]?.url || 'https://api.example.com/v1';
}

function buildPathUrl(spec, pathTemplate, parameters, exampleParams = {}) {
  let url = getServerUrl(spec) + pathTemplate;
  for (const param of parameters || []) {
    if (param.in === 'path') {
      const value = exampleParams[param.name] || param.schema?.example || `example-${param.name}`;
      url = url.replace(`{${param.name}}`, value);
    }
  }
  return url;
}

function buildCurlExample(spec, method, pathTemplate, operation) {
  const upper = method.toUpperCase();
  const params = operation.parameters || [];
  const exampleParams = {};
  for (const param of params) {
    if (param.schema?.example) exampleParams[param.name] = param.schema.example;
    if (param.name === 'alertId') exampleParams.alertId = 'alert-001';
    if (param.name === 'jobId') exampleParams.jobId = 'DISC-20260613-00042';
    if (param.name === 'storageSystemId') exampleParams.storageSystemId = 'ss-001';
  }

  let url = buildPathUrl(spec, pathTemplate, params, exampleParams);
  const query = params.filter((p) => p.in === 'query');
  if (query.length) {
    const qs = query
      .filter((p) => p.schema?.example !== undefined)
      .map((p) => `${encodeURIComponent(p.name)}=${encodeURIComponent(p.schema.example)}`)
      .join('&');
    if (qs) url += `?${qs}`;
  }

  const lines = [`curl -X ${upper} "${url}" \\`];
  const needsAuth = requiresAuth(spec, operation);

  if (needsAuth) {
    lines.push('  -H "Authorization: Bearer <access-token>" \\');
  }
  lines.push('  -H "Accept: application/json" \\');

  const bodySchema = operation.requestBody?.content?.['application/json']?.schema;
  if (bodySchema) {
    lines.push('  -H "Content-Type: application/json" \\');
    const example = buildExampleFromSchema(spec, bodySchema);
    const body = JSON.stringify(example, null, 2)
      .split('\n')
      .map((line, i, arr) => (i === arr.length - 1 ? line : line + ','))
      .join('\n');
    lines.push(`  -d '${body.replace(/'/g, "'\\''")}'`);
  } else {
    lines[lines.length - 1] = lines[lines.length - 1].replace(/ \\$/, '');
  }

  return lines.join('\n');
}

function requiresAuth(spec, operation) {
  if (operation.security !== undefined) {
    return operation.security.length > 0;
  }
  return (spec.security || []).length > 0;
}

function collectOperations(spec) {
  const operations = [];
  for (const [pathTemplate, pathItem] of Object.entries(spec.paths || {})) {
    for (const method of HTTP_METHODS) {
      if (!pathItem[method]) continue;
      operations.push({
        pathTemplate,
        method,
        operation: pathItem[method],
      });
    }
  }
  return operations;
}

function renderTable(headers, rows) {
  if (!rows.length) return '';
  const head = `| ${headers.join(' | ')} |\n| ${headers.map(() => '---').join(' | ')} |`;
  const body = rows.map((row) => `| ${row.join(' | ')} |`).join('\n');
  return `${head}\n${body}`;
}

function renderOperationMarkdown(spec, entry, sidebarPosition) {
  const { pathTemplate, method, operation } = entry;
  const { operationId, summary, description } = operation;
  const slug = slugForOperation(operationId, summary);
  const title = summary;
  const overview = description || summary;

  const lines = [];
  lines.push('---');
  lines.push(`id: ${slug}`);
  lines.push(`title: ${title}`);
  lines.push(`description: ${overview}`);
  lines.push(`sidebar_position: ${sidebarPosition}`);
  lines.push('---');
  lines.push('');
  lines.push(`# ${title}`);
  lines.push('');
  lines.push('## Overview');
  lines.push('');
  lines.push(overview.endsWith('.') ? overview : `${overview}.`);
  lines.push('');
  lines.push('## HTTP method and endpoint');
  lines.push('');
  lines.push('```http');
  lines.push(`${method.toUpperCase()} ${pathTemplate}`);
  lines.push('```');
  lines.push('');
  lines.push('## Authentication');
  lines.push('');
  if (requiresAuth(spec, operation)) {
    lines.push('This API uses bearer authentication.');
    lines.push('');
    lines.push('```http');
    lines.push('Authorization: Bearer <access-token>');
    lines.push('```');
  } else {
    lines.push('Authentication is not required for this API.');
  }
  lines.push('');
  lines.push('## Request parameters');
  lines.push('');
  const params = operation.parameters || [];
  if (params.length) {
    const rows = params.map((param) => [
      `\`${param.name}\``,
      param.in,
      param.required ? 'Yes' : 'No',
      param.schema?.type || 'string',
      (param.description || '') + enumSuffix(param.schema),
    ]);
    lines.push(renderTable(['Parameter', 'Location', 'Required', 'Type', 'Description'], rows));
  } else {
    lines.push('This API does not use request parameters.');
  }
  lines.push('');
  lines.push('## Request body');
  lines.push('');
  const bodySchema = operation.requestBody?.content?.['application/json']?.schema;
  if (bodySchema) {
    const resolved = resolveSchema(spec, bodySchema);
    const required = new Set(resolved?.required || []);
    const rows = Object.entries(resolved?.properties || {}).map(([name, prop]) => [
      `\`${name}\``,
      required.has(name) ? 'Yes' : 'No',
      schemaTypeLabel(prop),
      (prop.description || '') + enumSuffix(prop),
    ]);
    lines.push(renderTable(['Field', 'Required', 'Type', 'Description'], rows));
  } else {
    lines.push('This API does not require a request body.');
  }
  lines.push('');
  lines.push('## Response body');
  lines.push('');
  const success = getSuccessResponse(operation);
  const responseSchema = success?.response?.content?.['application/json']?.schema;
  if (responseSchema) {
    const rows = schemaToRows(spec, responseSchema);
    if (rows.length) {
      lines.push(renderTable(['Field', 'Type', 'Description'], rows.map((r) => [r.field, r.type, r.desc])));
    } else {
      lines.push('The API returns a JSON response body.');
    }
  } else {
    lines.push('This API does not return a response body.');
  }
  lines.push('');
  lines.push('## Response codes');
  lines.push('');
  const codeRows = Object.entries(operation.responses || {}).map(([code, resp]) => [
    code,
    resp.description || '',
  ]);
  lines.push(renderTable(['Status code', 'Description'], codeRows));
  lines.push('');
  lines.push('## Example request');
  lines.push('');
  lines.push('```bash');
  lines.push(buildCurlExample(spec, method, pathTemplate, operation));
  lines.push('```');
  lines.push('');
  lines.push('## Example response');
  lines.push('');
  if (responseSchema) {
    const example = buildExampleFromSchema(spec, responseSchema);
    lines.push('```json');
    lines.push(JSON.stringify(example, null, 2));
    lines.push('```');
  } else {
    lines.push('```json');
    lines.push('{}');
    lines.push('```');
  }
  lines.push('');
  lines.push('## Error handling');
  lines.push('');
  const errors = Object.entries(operation.responses || {})
    .filter(([code]) => code.startsWith('4') || code.startsWith('5'))
    .map(([code, resp]) => `the API returns \`${code}\` (${resp.description?.replace(/\.$/, '') || 'error'})`);
  if (errors.length) {
    lines.push(`If the request fails, ${errors.join('. If the request fails, ')}.`);
  } else {
    lines.push('Refer to the response codes section for error conditions.');
  }
  lines.push('');
  lines.push('## Related topics');
  lines.push('');
  lines.push('- [API overview](../getting-started/api-overview)');
  lines.push('- [Authentication](../getting-started/authentication)');
  lines.push('- [Authorization](../getting-started/authorization)');
  lines.push('- [Error handling](../api-fundamentals/error-handling)');
  lines.push('- [HTTP status codes](../api-fundamentals/http-status-codes)');
  lines.push('');

  return { slug, content: lines.join('\n') };
}

function main() {
  const spec = loadSpec();
  const operations = collectOperations(spec);
  if (!operations.length) {
    console.error('No operations found in OpenAPI spec.');
    process.exit(1);
  }

  fs.mkdirSync(OUTPUT_DIR, { recursive: true });

  const generatedSlugs = [];
  operations.forEach((entry, index) => {
    const sidebarPosition = index + 2;
    const { slug, content } = renderOperationMarkdown(spec, entry, sidebarPosition);
    const filePath = path.join(OUTPUT_DIR, `${slug}.md`);
    fs.writeFileSync(filePath, content, 'utf8');
    generatedSlugs.push(slug);
    console.log(`Generated: docs/rest_api_guide/api-reference/${slug}.md`);
  });

  const existing = fs.readdirSync(OUTPUT_DIR).filter((f) => f.endsWith('.md') && f !== INTRO_FILE);
  for (const file of existing) {
    const slug = file.replace(/\.md$/, '');
    if (!generatedSlugs.includes(slug)) {
      fs.unlinkSync(path.join(OUTPUT_DIR, file));
      console.log(`Removed stale topic: docs/rest_api_guide/api-reference/${file}`);
    }
  }

  console.log('');
  console.log(`Done. Generated ${generatedSlugs.length} API reference topic(s).`);
  console.log('Next steps:');
  console.log('  1. Add new topic path(s) to sidebars.js under API Reference (if needed).');
  console.log('  2. Run: npm run build');
}

main();
