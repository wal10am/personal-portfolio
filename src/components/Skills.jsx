import { useScrollReveal } from '../hooks/useScrollReveal';
import '../styles/skills.css';

const SKILL_CATEGORIES = [
  {
    id: 'category-1',
    name: 'Program & Delivery',
    skills: [
      'Agile & Scrum',
      'SAFe (PI Planning, ARTs)',
      'Kanban',
      'Jira',
      'Cross-team dependency & risk management',
    ],
  },
  {
    id: 'category-2',
    name: 'Stakeholder & Communication',
    skills: [
      'Customer & stakeholder demos',
      'Technical documentation & migration guides',
      'Translating tradeoffs for non-technical audiences',
      'Mentoring & onboarding',
    ],
  },
  {
    id: 'category-3',
    name: 'Technical Fluency',
    skills: [
      'Java & Spring Boot',
      'React & REST APIs',
      'AWS (S3, SNS, SQS)',
      'SQL (Oracle, PostgreSQL)',
      'Security fundamentals (OAuth 2.0, JWT)',
    ],
  },
  {
    id: 'category-4',
    name: 'Domain & Compliance',
    skills: [
      'Federal / regulated program delivery',
      'Regulatory requirements translation',
      'Section 508 accessibility',
      'Security & CVE remediation',
    ],
  },
];

function SkillCategory({ category, index }) {
  const { ref, visible } = useScrollReveal();

  return (
    <div
      ref={ref}
      className={`skills-category${visible ? ' is-visible' : ''}`}
      style={{ '--reveal-delay': `${index * 80}ms` }}
    >
      <h3 className="skills-category-title">{category.name}</h3>
      <ul className="skills-chip-list cluster">
        {category.skills.map((skill, i) => (
          <li key={`${category.id}-skill-${i}`} className="skills-chip">
            {skill}
          </li>
        ))}
      </ul>
    </div>
  );
}

function Skills() {
  return (
    <section
      id="skills"
      className="section skills-section"
      aria-labelledby="skills-heading"
    >
      <div className="container">
        <header className="section__header">
          <span className="eyebrow">What I work with</span>
          <h2 id="skills-heading" className="section__title">
            <span className="section__number">02</span> Skills
          </h2>
          <p className="section__description">
            A technical project manager&rsquo;s toolkit: agile delivery
            practices, stakeholder communication, and enough engineering
            depth to run a credible conversation with the team actually
            writing the code.
          </p>
        </header>

        <div className="skills-grid grid grid--4">
          {SKILL_CATEGORIES.map((category, index) => (
            <SkillCategory key={category.id} category={category} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default Skills;
