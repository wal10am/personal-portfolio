import { useScrollReveal } from '../hooks/useScrollReveal';
import '../styles/education.css';

const EDUCATION = [
  {
    id: 'education-1',
    degree: 'B.S. in Computer Science',
    school: 'College of Charleston',
    dates: 'Aug. 2013 — May 2016',
    detail: 'Foundation in software engineering that grounds 9 years of hands-on delivery experience.',
  },
  {
    id: 'education-2',
    degree: '[PLACEHOLDER: PM certification, e.g. PMP or CAPM, if pursued]',
    school: '[PLACEHOLDER: issuing organization]',
    dates: '[PLACEHOLDER: Mon YYYY]',
    detail: '[PLACEHOLDER: brief description, or remove this entry if not pursuing a certification]',
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
            A computer science degree, plus 9 years of on-the-job program
            and delivery experience.
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
