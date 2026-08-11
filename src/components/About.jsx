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
              I&rsquo;m a technical project manager with 9 years of software
              engineering experience &mdash; the last several as a tech
              lead coordinating delivery across multiple teams. I care
              about the same thing whether I&rsquo;m writing code or
              running a program: shipping the thing that actually solves
              the problem, on a timeline the team can hit without burning
              out.
            </p>
            <p>
              I started as a junior developer at Booz Allen Hamilton on
              U.S. Department of Veterans Affairs contracts in 2017 and was
              promoted to tech lead within five years. Along the way I led
              a shared-library migration across 5 repositories used by
              every team on the program, coordinated a multi-repo security
              remediation effort, and was regularly pulled into
              stakeholder-facing work &mdash; customer demos, cross-team
              documentation, prioritization calls &mdash; because I could
              translate technical tradeoffs into terms non-technical
              stakeholders could act on. That&rsquo;s the work I want to do
              full-time.
            </p>
            <ul className="about-highlights">
              <li>9 years of software delivery experience &mdash; junior developer to tech lead in 5 years</li>
              <li>Led migration &amp; remediation initiatives across 5+ repositories and teams at once</li>
              <li>Remote-based, open to remote or hybrid roles</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

export default About;
