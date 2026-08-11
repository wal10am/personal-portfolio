import { useTilt } from '../hooks/useTilt';
import '../styles/projects.css';

const PROJECTS = [
  {
    id: 'project-1',
    name: 'Shared-Library Platform Migration',
    description:
      'Led a shared-library upgrade across 5 repositories consumed by every team on the program. Negotiated rollout timing against each team’s sprint priorities, staggered adoption with early-adopter teams, and authored a 917-line migration guide plus office hours to unblock consuming teams.',
    tags: ['Cross-team coordination', 'Migration planning', 'Technical documentation'],
    link: '#contact',
    linkLabel: 'Ask me about this',
  },
  {
    id: 'project-2',
    name: 'DBQ Content Validation Rules Engine',
    description:
      'Owned delivery of validation rules for 15+ standardized VA medical form types — translating dense regulatory and medical specifications into executable requirements, test fixtures, and documentation, one form type at a time.',
    tags: ['Requirements translation', 'Regulatory delivery', 'Rules engine'],
    link: '#contact',
    linkLabel: 'Ask me about this',
  },
  {
    id: 'project-3',
    name: 'Contention Management Micro-Frontend',
    description:
      'Took a greenfield React micro-frontend from initial scaffolding to production over 8 months — coordinating backend, UI, accessibility, and security workstreams, and integrating it into the legacy host application other teams depended on.',
    tags: ['Full-stack delivery', 'Accessibility (508)', 'Cross-repo integration'],
    link: '#contact',
    linkLabel: 'Ask me about this',
  },
];

function ProjectCard({ project }) {
  const { ref, style, onMouseMove, onMouseLeave } = useTilt();

  return (
    <article
      className="project-card"
      ref={ref}
      style={style}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
    >
      <div className="project-card-media">
        <img
          src="[PLACEHOLDER: optional diagram/mockup image URL — these ran on an internal federal system, so no real screenshot exists]"
          alt="[PLACEHOLDER: descriptive alt text if you add a diagram/mockup]"
          loading="lazy"
        />
      </div>
      <div className="project-card-body">
        <h3 className="project-card-title">{project.name}</h3>
        <p className="project-card-description">{project.description}</p>
        <ul className="project-card-tags">
          {project.tags.map((tag) => (
            <li key={tag} className="project-card-tag">
              {tag}
            </li>
          ))}
        </ul>
        <a
          className="project-card-link"
          href={project.link}
          aria-label={`${project.linkLabel}: ${project.name}`}
        >
          {project.linkLabel}
          <span aria-hidden="true">&rarr;</span>
        </a>
      </div>
    </article>
  );
}

function Projects() {
  return (
    <section id="projects" className="section projects-section" aria-labelledby="projects-heading">
      <div className="container">
        <header className="section__header">
          <span className="eyebrow">What I&rsquo;ve led</span>
          <h2 id="projects-heading" className="section__title">
            <span className="section__number">04</span> Programs &amp; Initiatives
          </h2>
          <p className="section__description">
            A few of the technical initiatives I&rsquo;ve planned and
            driven end-to-end. They ran inside an internal federal
            platform, so they aren&rsquo;t publicly linked — happy to walk
            through any of them.
          </p>
        </header>
        <div className="projects-grid">
          {PROJECTS.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default Projects;
