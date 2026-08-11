import { useScrollReveal } from '../hooks/useScrollReveal';
import '../styles/contact.css';

const CONTACT_LINKS = [
  {
    id: 'email',
    label: '[PLACEHOLDER: you@example.com]',
    href: 'mailto:[PLACEHOLDER: you@example.com]',
  },
  {
    id: 'github',
    label: 'GitHub',
    href: '[PLACEHOLDER: https://github.com/your-username]',
  },
  {
    id: 'linkedin',
    label: 'LinkedIn',
    href: '[PLACEHOLDER: https://linkedin.com/in/your-profile]',
  },
];

function Contact() {
  const { ref, visible } = useScrollReveal();

  return (
    <section
      id="contact"
      className="section contact-section"
      aria-labelledby="contact-heading"
    >
      <div className="container">
        <header className="section__header">
          <span className="eyebrow">Let&rsquo;s talk</span>
          <h2 id="contact-heading" className="section__title">
            <span className="section__number">07</span> Contact
          </h2>
          <p className="section__description">
            [PLACEHOLDER: 1-2 sentence invitation to reach out — what
            you&rsquo;re open to, e.g. new roles, freelance work, or
            collaboration.]
          </p>
        </header>

        <div
          ref={ref}
          className={`contact-panel${visible ? ' is-visible' : ''}`}
        >
          <ul className="contact-links">
            {CONTACT_LINKS.map((link) => (
              <li key={link.id}>
                <a
                  className="contact-link"
                  href={link.href}
                  target={link.id === 'email' ? undefined : '_blank'}
                  rel={link.id === 'email' ? undefined : 'noopener noreferrer'}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

export default Contact;
