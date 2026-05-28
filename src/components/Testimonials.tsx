import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import '../styles/Testimonials.css';

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

const testimonialsData = [
  {
    quote: 'Bina Codes transformed our legacy system into a modern, scalable platform. Their attention to detail and technical expertise exceeded every expectation.',
    name: 'Sarah Chen',
    role: 'CTO',
    company: 'Nexus Finance',
    rating: 5,
  },
  {
    quote: 'Working with Bina felt like having an in-house engineering team. They understood our vision and delivered a product that our users absolutely love.',
    name: 'Marcus Johnson',
    role: 'Product Director',
    company: 'MediConnect',
    rating: 5,
  },
  {
    quote: 'The DevOps automation they built cut our deployment time by 80%. Their cloud architecture expertise is truly world-class.',
    name: 'Elena Rodriguez',
    role: 'VP Engineering',
    company: 'SupplyChain Pro',
    rating: 5,
  },
];

export default function Testimonials() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const cards = cardsRef.current;
    if (!section || !cards) return;

    const cardEls = cards.querySelectorAll('.testimonial-card');
    const mm = gsap.matchMedia();

    // Only run pinned cards deal-out animation on screen sizes larger than mobile (768px)
    mm.add({
      isDesktop: "(min-width: 1200px)",
      isTablet: "(min-width: 769px) and (max-width: 1199px)",
    }, (context) => {
      const { isDesktop } = context.conditions as any;
      // Adjust translation spacing dynamically to fit smaller desktop screens perfectly
      const xOffset = isDesktop ? '118%' : '98%';

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: '+=100%',
          pin: true,
          scrub: 1,
        },
      });

      // Cards start stacked in the center
      gsap.set(cardEls, {
        position: 'absolute',
        top: '50%',
        left: '50%',
        xPercent: -50,
        yPercent: -50,
      });

      // Deal out animation
      tl.to(cardEls[0], {
        x: `-${xOffset}`,
        rotation: -5,
        duration: 1,
        ease: 'power2.out',
      });

      tl.to(
        cardEls[1],
        {
          x: '0%',
          rotation: 0,
          duration: 1,
          ease: 'power2.out',
        },
        0.3
      );

      tl.to(
        cardEls[2],
        {
          x: xOffset,
          rotation: 5,
          duration: 1,
          ease: 'power2.out',
        },
        0.6
      );
    });

    return () => {
      mm.revert();
    };
  }, []);

  return (
    <section ref={sectionRef} className="testimonials-section">
      <div className="testimonials-header">
        <span className="testimonials-tag">Client Stories</span>
        <h2 className="testimonials-title">What They Say</h2>
      </div>

      <div ref={cardsRef} className="testimonials-cards">
        {testimonialsData.map((testimonial, i) => (
          <div key={i} className="testimonial-card">
            <div className="testimonial-quote-mark">"""</div>
            <p className="testimonial-quote">{testimonial.quote}</p>
            <div className="testimonial-rating">
              {Array.from({ length: testimonial.rating }).map((_, j) => (
                <span key={j} className="testimonial-star">★</span>
              ))}
            </div>
            <div className="testimonial-author">
              <div className="testimonial-avatar">
                {testimonial.name.split(' ').map((n) => n[0]).join('')}
              </div>
              <div className="testimonial-info">
                <span className="testimonial-name">{testimonial.name}</span>
                <span className="testimonial-role">
                  {testimonial.role}, {testimonial.company}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
