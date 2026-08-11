import { useParallax } from '../hooks/useParallax';
import '../styles/hero.css';

function Hero() {
  const { x, y } = useParallax(24);

  return (
    <header className="hero">
      <div
        className="hero__glow"
        aria-hidden="true"
        style={{ transform: `translate3d(calc(-50% + ${x}px), ${y}px, 0)` }}
      />
      <div className="container hero__inner">
        <span className="eyebrow">
          [PLACEHOLDER: e.g. Available for new opportunities]
        </span>
        <h1 className="hero__title">
          Hi, I&rsquo;m <span className="text-accent">[PLACEHOLDER: Your Name]</span>
        </h1>
        <p className="hero__subtitle">
          [PLACEHOLDER: Title, e.g. Software Engineer] &mdash; [PLACEHOLDER:
          1-2 sentence tagline about what you build and who you build it
          for.]
        </p>
        <div className="hero__actions">
          <a className="hero__cta hero__cta--primary" href="#projects">
            View my work
          </a>
          <a className="hero__cta hero__cta--secondary" href="#contact">
            Get in touch
          </a>
        </div>
      </div>
      <a
        className="hero__scroll-cue"
        href="#about"
        aria-label="Scroll to About section"
      >
        <span aria-hidden="true" />
      </a>
    </header>
  );
}

export default Hero;
