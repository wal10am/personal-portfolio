import { useEffect, useState } from 'react';
import { useScrollSpy } from '../hooks/useScrollSpy';
import '../styles/nav.css';

const NAV_LINKS = [
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'experience', label: 'Experience' },
  { id: 'projects', label: 'Projects' },
  { id: 'testimonials', label: 'Testimonials' },
  { id: 'education', label: 'Education' },
  { id: 'contact', label: 'Contact' },
];

const SECTION_IDS = NAV_LINKS.map((link) => link.id);

function Nav() {
  const [isOpen, setIsOpen] = useState(false);
  const activeSection = useScrollSpy(SECTION_IDS);

  useEffect(() => {
    document.body.classList.toggle('nav-scroll-lock', isOpen);
    return () => document.body.classList.remove('nav-scroll-lock');
  }, [isOpen]);

  // Close the mobile menu automatically if the viewport grows past the
  // mobile breakpoint while it's open (e.g. rotating a tablet).
  useEffect(() => {
    if (!isOpen) return undefined;
    const handleResize = () => {
      if (window.innerWidth >= 768) setIsOpen(false);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isOpen]);

  const closeMenu = () => setIsOpen(false);
  const toggleMenu = () => setIsOpen((open) => !open);

  return (
    <header className={`nav${isOpen ? ' nav--menu-open' : ''}`}>
      <div className="nav__inner container">
        <a className="nav__brand" href="#top" onClick={closeMenu}>
          <span className="nav__brand-mark" aria-hidden="true">
            {'</>'}
          </span>
          [PLACEHOLDER: name/logo]
        </a>

        <button
          type="button"
          className={`nav__toggle${isOpen ? ' nav__toggle--open' : ''}`}
          aria-label={isOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={isOpen}
          aria-controls="primary-navigation"
          onClick={toggleMenu}
        >
          <span className="nav__toggle-bar" />
          <span className="nav__toggle-bar" />
          <span className="nav__toggle-bar" />
        </button>

        <nav aria-label="Main navigation">
          <ul
            id="primary-navigation"
            className={`nav__links${isOpen ? ' nav__links--open' : ''}`}
          >
            {NAV_LINKS.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <li key={link.id}>
                  <a
                    className={`nav__link${isActive ? ' nav__link--active' : ''}`}
                    href={`#${link.id}`}
                    aria-current={isActive ? 'true' : undefined}
                    onClick={closeMenu}
                  >
                    {link.label}
                  </a>
                </li>
              );
            })}
            <li>
              <a className="nav__cta" href="#contact" onClick={closeMenu}>
                Get in touch
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Nav;
