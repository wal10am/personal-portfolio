import { useScrollReveal } from '../hooks/useScrollReveal';
import '../styles/experience.css';

const EXPERIENCE = [
  {
    id: 'role-1',
    title: '[PLACEHOLDER: Job Title]',
    company: '[PLACEHOLDER: Company Name]',
    dates: '[PLACEHOLDER: Mon YYYY — Present]',
    bullets: [
      '[PLACEHOLDER: accomplishment 1 — describe scope/ownership and quantify impact where possible]',
      '[PLACEHOLDER: accomplishment 2]',
      '[PLACEHOLDER: accomplishment 3]',
    ],
  },
  {
    id: 'role-2',
    title: '[PLACEHOLDER: Job Title]',
    company: '[PLACEHOLDER: Company Name]',
    dates: '[PLACEHOLDER: Mon YYYY — Mon YYYY]',
    bullets: [
      '[PLACEHOLDER: accomplishment 1]',
      '[PLACEHOLDER: accomplishment 2]',
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
            [PLACEHOLDER: 1-sentence summary of your career path and focus.]
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
