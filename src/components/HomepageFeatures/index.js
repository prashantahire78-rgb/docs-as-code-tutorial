import clsx from 'clsx';
import Link from '@docusaurus/Link';
import Heading from '@theme/Heading';
import styles from './styles.module.css';

const FeatureList = [
  {
    title: 'Installation and Configuration',
    link: '/docs/installation_and_configuration_guide/introduction_icg/',
    linkLabel: 'Open Installation Guide',
    description: (
      <>
        Plan deployment, validate prerequisites, configure security, discover
        storage systems, and maintain StorageSphere Enterprise 2.0.
      </>
    ),
  },
  {
    title: 'User Guide',
    link: '/docs/user_guide/introduction_ug/',
    linkLabel: 'Open User Guide',
    description: (
      <>
        Monitor storage health, capacity, performance, alerts, events, reports,
        users, collectors, and audit activity from the web UI.
      </>
    ),
  },
  {
    title: 'REST API Developer Guide',
    link: '/docs/rest_api_guide/introduction_rest/',
    linkLabel: 'Open API Guide',
    description: (
      <>
        Build integrations that use HTTPS, JSON, token-based authentication,
        pagination, filtering, workflows, and standard HTTP status codes.
      </>
    ),
  },
];

function Feature({title, description, link, linkLabel}) {
  return (
    <div className={clsx('col col--4')}>
      <div className={styles.featureCard}>
        <Heading as="h3">{title}</Heading>
        <p>{description}</p>
        <Link className="button button--primary button--sm" to={link}>
          {linkLabel}
        </Link>
      </div>
    </div>
  );
}

export default function HomepageFeatures() {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
