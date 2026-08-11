import { useScrollReveal } from '../hooks/useScrollReveal';
import '../styles/skills.css';

const SKILL_CATEGORIES = [
  {
    id: 'category-1',
    name: '[PLACEHOLDER: category name, e.g. Languages]',
    skills: [
      '[PLACEHOLDER: skill]',
      '[PLACEHOLDER: skill]',
      '[PLACEHOLDER: skill]',
      '[PLACEHOLDER: skill]',
      '[PLACEHOLDER: skill]',
    ],
  },
  {
    id: 'category-2',
    name: '[PLACEHOLDER: category name, e.g. Frameworks & Libraries]',
    skills: [
      '[PLACEHOLDER: skill]',
      '[PLACEHOLDER: skill]',
      '[PLACEHOLDER: skill]',
      '[PLACEHOLDER: skill]',
    ],
  },
  {
    id: 'category-3',
    name: '[PLACEHOLDER: category name, e.g. Tools & Platforms]',
    skills: [
      '[PLACEHOLDER: skill]',
      '[PLACEHOLDER: skill]',
      '[PLACEHOLDER: skill]',
      '[PLACEHOLDER: skill]',
      '[PLACEHOLDER: skill]',
    ],
  },
  {
    id: 'category-4',
    name: '[PLACEHOLDER: category name, e.g. Practices & Concepts]',
    skills: [
      '[PLACEHOLDER: skill]',
      '[PLACEHOLDER: skill]',
      '[PLACEHOLDER: skill]',
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
            [PLACEHOLDER: 1-sentence summary of your overall technical range
            and toolkit.]
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
