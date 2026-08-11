import { useScrollReveal } from '../hooks/useScrollReveal';
import '../styles/about.css';

function About() {
  const { ref, visible } = useScrollReveal();

  return (
    <section
      id="about"
      className="section about-section"
      aria-labelledby="about-heading"
    >
      <div className="container">
        <header className="section__header">
          <span className="eyebrow">Get to know me</span>
          <h2 id="about-heading" className="section__title">
            <span className="section__number">01</span> About
          </h2>
        </header>

        <div
          ref={ref}
          className={`about-content${visible ? ' is-visible' : ''}`}
        >
          <div className="about-portrait">
            <img
              src="[PLACEHOLDER: portrait or avatar image URL]"
              alt="[PLACEHOLDER: descriptive alt text for your portrait photo]"
              loading="lazy"
            />
          </div>
          <div className="about-copy">
            <p>
              [PLACEHOLDER: 2-3 sentence introduction — who you are, what
              you do, and what you care about professionally.]
            </p>
            <p>
              [PLACEHOLDER: 2-3 sentence paragraph about your background,
              how you got into the field, and what drives you.]
            </p>
            <ul className="about-highlights">
              <li>[PLACEHOLDER: a quick fact, e.g. years of experience]</li>
              <li>
                [PLACEHOLDER: a quick fact, e.g. based in / open to remote]
              </li>
              <li>[PLACEHOLDER: a quick fact, e.g. current focus/interest]</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

export default About;
