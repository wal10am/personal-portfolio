import { useScrollReveal } from '../hooks/useScrollReveal';
import '../styles/education.css';

const EDUCATION = [
  {
    id: 'education-1',
    degree: '[PLACEHOLDER: Degree, e.g. B.S. in Computer Science]',
    school: '[PLACEHOLDER: School / University Name]',
    dates: '[PLACEHOLDER: YYYY — YYYY]',
    detail: '[PLACEHOLDER: relevant coursework, honors, or activities]',
  },
  {
    id: 'education-2',
    degree: '[PLACEHOLDER: Certification / credential name]',
    school: '[PLACEHOLDER: Issuing organization]',
    dates: '[PLACEHOLDER: Mon YYYY]',
    detail: '[PLACEHOLDER: brief description of the certification]',
  },
];

function EducationItem({ item, index }) {
  const { ref, visible } = useScrollReveal();

  return (
    <li
      ref={ref}
      className={`education-item${visible ? ' is-visible' : ''}`}
      style={{ '--reveal-delay': `${index * 100}ms` }}
    >
      <div className="education-item-heading">
        <h3 className="education-item-degree">{item.degree}</h3>
        <span className="education-item-dates">{item.dates}</span>
      </div>
      <p className="education-item-school">{item.school}</p>
      <p className="education-item-detail">{item.detail}</p>
    </li>
  );
}

function Education() {
  return (
    <section
      id="education"
      className="section education-section"
      aria-labelledby="education-heading"
    >
      <div className="container">
        <header className="section__header">
          <span className="eyebrow">Background</span>
          <h2 id="education-heading" className="section__title">
            <span className="section__number">06</span> Education
          </h2>
          <p className="section__description">
            [PLACEHOLDER: 1-sentence summary of your education/training
            background.]
          </p>
        </header>

        <ul className="education-list">
          {EDUCATION.map((item, index) => (
            <EducationItem key={item.id} item={item} index={index} />
          ))}
        </ul>
      </div>
    </section>
  );
}

export default Education;
