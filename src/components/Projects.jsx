import { useTilt } from '../hooks/useTilt';
import '../styles/projects.css';

const PROJECTS = [
  {
    id: 'project-1',
    name: '[PLACEHOLDER: Project 1 name]',
    description:
      '[PLACEHOLDER: 1-2 sentence description of project 1 — what it does, the problem it solves, and your role in building it.]',
    tags: ['[PLACEHOLDER: Tech 1]', '[PLACEHOLDER: Tech 2]', '[PLACEHOLDER: Tech 3]'],
    link: '[PLACEHOLDER: https://project-1-live-or-repo-url.example]',
  },
  {
    id: 'project-2',
    name: '[PLACEHOLDER: Project 2 name]',
    description:
      '[PLACEHOLDER: 1-2 sentence description of project 2 — what it does, the problem it solves, and your role in building it.]',
    tags: ['[PLACEHOLDER: Tech 1]', '[PLACEHOLDER: Tech 2]', '[PLACEHOLDER: Tech 3]'],
    link: '[PLACEHOLDER: https://project-2-live-or-repo-url.example]',
  },
  {
    id: 'project-3',
    name: '[PLACEHOLDER: Project 3 name]',
    description:
      '[PLACEHOLDER: 1-2 sentence description of project 3 — what it does, the problem it solves, and your role in building it.]',
    tags: ['[PLACEHOLDER: Tech 1]', '[PLACEHOLDER: Tech 2]', '[PLACEHOLDER: Tech 3]'],
    link: '[PLACEHOLDER: https://project-3-live-or-repo-url.example]',
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
          src="[PLACEHOLDER: screenshot/mockup image URL for this project]"
          alt="[PLACEHOLDER: descriptive alt text for project screenshot/mockup]"
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
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`View ${project.name} (opens in a new tab)`}
        >
          View project
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
          <span className="eyebrow">What I&rsquo;ve built</span>
          <h2 id="projects-heading" className="section__title">
            <span className="section__number">04</span> Projects
          </h2>
          <p className="section__description">
            [PLACEHOLDER: 1-sentence summary of the kinds of projects shown
            below.]
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
