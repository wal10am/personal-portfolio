import { useScrollReveal } from '../hooks/useScrollReveal';
import '../styles/contact.css';

const CONTACT_LINKS = [
  {
    id: 'email',
    label: 'wal10.aaron@gmail.com',
    href: 'mailto:wal10.aaron@gmail.com',
  },
  {
    id: 'linkedin',
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/aaron-walton/',
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
            I&rsquo;m open to Technical Project Manager and Program Manager
            roles. Happy to talk through how 9 years of hands-on delivery
            experience translates into planning, coordinating, and
            shipping software programs.
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
