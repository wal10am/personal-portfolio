import { useScrollReveal } from '../hooks/useScrollReveal';
import '../styles/testimonials.css';

const TESTIMONIALS = [
  {
    id: 'testimonial-1',
    quote:
      'When our team tech lead was out on vacation or sick leave, you stepped in as the back-up/acting tech lead and covered the role well. You worked with our less experienced devs and helped provide technical leadership and guidance so the team wouldn’t miss a beat.',
    name: 'Justin Baden',
    title: 'Scrum Master',
    company: 'Booz Allen Hamilton',
  },
  {
    id: 'testimonial-2',
    quote:
      'Aaron is the ideal team member — he’s hardworking, a team player, and isn’t afraid to jump in and share his thoughts in team discussions. I worked with Aaron as the team Scrum Master and was consistently impressed by his communication and willingness to go the extra mile to get high-priority work turned around quickly.',
    name: 'Sarah Walsh',
    title: 'Scrum Master',
    company: 'Booz Allen Hamilton',
  },
  {
    id: 'testimonial-3',
    quote:
      'His proficiency was at such a high level that it was recognized by our project’s BA leadership, leading them to ask for his help in preparing for and participating in very important customer demos where he did a fantastic job.',
    name: 'Matthew Fetyko',
    title: 'Colleague, VA Program',
    company: 'Booz Allen Hamilton',
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
            Feedback from scrum masters and teammates on how I actually
            work with a team, in their own words.
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
