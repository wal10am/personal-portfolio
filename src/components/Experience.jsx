import { useScrollReveal } from '../hooks/useScrollReveal';
import '../styles/experience.css';

const EXPERIENCE = [
  {
    id: 'role-1',
    title: 'Tech Lead',
    company: 'Booz Allen Hamilton — U.S. Dept. of Veterans Affairs (Remote)',
    dates: '2022 — Present',
    bullets: [
      'Led a shared-library migration across 5 repositories consumed by every team on the program — negotiated rollout timing against each team’s sprint priorities, staggered adoption with early-adopter teams, and authored a 917-line migration guide plus ran office hours to unblock consuming teams',
      'Coordinated a security remediation effort across 5 repositories after a cloud platform migration exposed committed secrets, sequencing the work with each team and building tooling so remediation didn’t block feature delivery',
      'Owned prioritization across competing stakeholder asks — CVEs, blocking cross-team dependencies, and committed sprint work — communicating tradeoffs and capacity transparently instead of overcommitting',
      'Stepped in as backup tech lead during teammate absences, running sprint planning discussions and pairing with junior developers to keep delivery on track',
    ],
  },
  {
    id: 'role-2',
    title: 'Senior Software Developer',
    company: 'Booz Allen Hamilton — U.S. Dept. of Veterans Affairs (Remote)',
    dates: 'Jan. 2019 — 2022',
    bullets: [
      'Patched 10+ CVEs and drove framework upgrades in the Claim Evidence service, the API layer powering OCR-based document search that helped process a record 3M+ veteran claims in FY2025',
      'Authored validation rules for 15+ standardized medical form types in a domain-specific rules engine — translating dense regulatory and medical specifications into executable requirements, test fixtures, and documentation',
      'Built micro-frontends (React, Single-SPA) from scaffolding through production, delivering REST APIs, data grids, and Section 508 accessibility compliance',
      'Asked by BA leadership to help prepare for and participate in customer demos, based on an ability to translate technical work into terms stakeholders could act on',
    ],
  },
  {
    id: 'role-3',
    title: 'Mid-Level Software Developer',
    company: 'Booz Allen Hamilton — U.S. Dept. of Veterans Affairs (Remote)',
    dates: 'Jun. 2018 — Jan. 2019',
    bullets: [
      'Integrated a new React micro-frontend into the legacy monolith, coordinating the Java controller, permission policies, and cross-frame communication layer',
      'Contributed to retiring a legacy financial-processing system for VA education benefits and owned the testing effort — including customer-facing demos — for GI Bill award letter generation',
    ],
  },
  {
    id: 'role-4',
    title: 'Junior Software Developer',
    company: 'Booz Allen Hamilton — U.S. Dept. of Veterans Affairs (Remote)',
    dates: 'Apr. 2017 — Jun. 2018',
    bullets: [
      'Built save/load/clear functionality for search filters in a portal UI, backed by a new user preferences service',
      'Decommissioned a portion of a deprecated claims diagnostic tool across multiple modules in the monolith',
    ],
  },
];

function ExperienceItem({ role, index, isLast }) {
  const { ref, visible } = useScrollReveal();

  return (
    <li
      ref={ref}
      className={`experience-item${visible ? ' is-visible' : ''}${
        isLast ? ' experience-item--last' : ''
      }`}
      style={{ '--reveal-delay': `${index * 120}ms` }}
    >
      <span className="experience-item-marker" aria-hidden="true" />
      <div className="experience-item-content">
        <div className="experience-item-heading">
          <h3 className="experience-item-title">{role.title}</h3>
          <span className="experience-item-dates">{role.dates}</span>
        </div>
        <p className="experience-item-company">{role.company}</p>
        <ul className="experience-item-bullets">
          {role.bullets.map((bullet, i) => (
            <li key={`${role.id}-bullet-${i}`}>{bullet}</li>
          ))}
        </ul>
      </div>
    </li>
  );
}

function Experience() {
  return (
    <section
      id="experience"
      className="section experience-section"
      aria-labelledby="experience-heading"
    >
      <div className="container">
        <header className="section__header">
          <span className="eyebrow">Where I&rsquo;ve been</span>
          <h2 id="experience-heading" className="section__title">
            <span className="section__number">03</span> Experience
          </h2>
          <p className="section__description">
            Nine years at one program, growing from junior developer to
            tech lead — the throughline is owning delivery, not just code.
          </p>
        </header>

        <ol className="experience-timeline" aria-label="Work experience timeline">
          {EXPERIENCE.map((role, index) => (
            <ExperienceItem
              key={role.id}
              role={role}
              index={index}
              isLast={index === EXPERIENCE.length - 1}
            />
          ))}
        </ol>
      </div>
    </section>
  );
}

export default Experience;
