import { useScrollReveal } from '../hooks/useScrollReveal';
import '../styles/testimonials.css';

const TESTIMONIALS = [
  {
    id: 'testimonial-1',
    quote:
      '[PLACEHOLDER: 1-3 sentence testimonial quote about working with this person — their skills, impact, or collaboration style.]',
    name: '[PLACEHOLDER: Name]',
    title: '[PLACEHOLDER: Job title]',
    company: '[PLACEHOLDER: Company]',
  },
  {
    id: 'testimonial-2',
    quote:
      '[PLACEHOLDER: 1-3 sentence testimonial quote about working with this person — their skills, impact, or collaboration style.]',
    name: '[PLACEHOLDER: Name]',
    title: '[PLACEHOLDER: Job title]',
    company: '[PLACEHOLDER: Company]',
  },
  {
    id: 'testimonial-3',
    quote:
      '[PLACEHOLDER: 1-3 sentence testimonial quote about working with this person — their skills, impact, or collaboration style.]',
    name: '[PLACEHOLDER: Name]',
    title: '[PLACEHOLDER: Job title]',
    company: '[PLACEHOLDER: Company]',
  },
];

function TestimonialCard({ testimonial, index }) {
  const { ref, visible } = useScrollReveal();

  return (
    <figure
      ref={ref}
      className={`testimonial-card${visible ? ' is-visible' : ''}`}
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      <blockquote className="testimonial-quote">
        <p>&ldquo;{testimonial.quote}&rdquo;</p>
      </blockquote>
      <figcaption className="testimonial-attribution">
        <span className="testimonial-name">{testimonial.name}</span>
        <span className="testimonial-role">
          {testimonial.title} &middot; {testimonial.company}
        </span>
      </figcaption>
    </figure>
  );
}

function Testimonials() {
  return (
    <section
      id="testimonials"
      className="section testimonials-section"
      aria-labelledby="testimonials-heading"
    >
      <div className="container">
        <header className="section__header">
          <span className="eyebrow">What people say</span>
          <h2 id="testimonials-heading" className="section__title">
            <span className="section__number">05</span> Testimonials
          </h2>
          <p className="section__description">
            [PLACEHOLDER: 1-sentence summary introducing the testimonials
            below.]
          </p>
        </header>
        <div className="testimonials-grid">
          {TESTIMONIALS.map((testimonial, index) => (
            <TestimonialCard key={testimonial.id} testimonial={testimonial} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default Testimonials;
