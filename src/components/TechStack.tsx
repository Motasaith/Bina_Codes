import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import '../styles/TechStack.css';

const techItems = [
  { name: 'React', svg: <svg viewBox="0 0 24 24" fill="none" stroke="#61DAFB" strokeWidth="1.5"><circle cx="12" cy="12" r="2" fill="#61DAFB"/><ellipse cx="12" cy="12" rx="10" ry="4"/><ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(60 12 12)"/><ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(120 12 12)"/></svg> },
  { name: 'TypeScript', svg: <svg viewBox="0 0 24 24" fill="none"><rect x="2" y="2" width="20" height="20" rx="3" fill="#3178C6"/><text x="12" y="17" textAnchor="middle" fill="#fff" fontSize="13" fontWeight="700" fontFamily="sans-serif">TS</text></svg> },
  { name: 'Node.js', svg: <svg viewBox="0 0 24 24" fill="none"><path d="M12 2L3 7v10l9 5 9-5V7l-9-5z" fill="#339933"/><path d="M12 7v10M7 9.5v5M17 9.5v5" stroke="#fff" strokeWidth="1.2" strokeLinecap="round"/></svg> },
  { name: 'Python', svg: <svg viewBox="0 0 24 24" fill="none"><path d="M12 2c-3 0-5 1-5 3v3h6v2H5c-3 0-5 1.5-5 4s2 4 5 4h2v-3c0-2 2-3 5-3h6V5c0-2-2-3-5-3z" fill="#3776AB"/><path d="M12 22c3 0 5-1 5-3v-3h-6v-2h8c3 0 5-1.5 5-4s-2-4-5-4h-2v3c0 2-2 3-5 3H6v5c0 2 2 3 5 3z" fill="#FFD43B"/></svg> },
  { name: 'AWS', svg: <svg viewBox="0 0 24 24" fill="none"><path d="M6 16c-1-1-2-2.5-2-4.5C4 7 7.5 4 12 4s8 3 8 7.5c0 2-1 3.5-2 4.5" stroke="#FF9900" strokeWidth="2" strokeLinecap="round"/><path d="M8 14c1.5 1 3 1.5 4 1.5s2.5-.5 4-1.5" stroke="#FF9900" strokeWidth="2" strokeLinecap="round"/><path d="M12 15.5V20M9 18l3 3 3-3" stroke="#FF9900" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg> },
  { name: 'Docker', svg: <svg viewBox="0 0 24 24" fill="none"><rect x="2" y="10" width="4" height="4" rx="1" fill="#2496ED"/><rect x="7" y="10" width="4" height="4" rx="1" fill="#2496ED"/><rect x="12" y="10" width="4" height="4" rx="1" fill="#2496ED"/><rect x="7" y="5" width="4" height="4" rx="1" fill="#2496ED"/><rect x="12" y="5" width="4" height="4" rx="1" fill="#2496ED"/><rect x="17" y="10" width="4" height="4" rx="1" fill="#2496ED"/><path d="M2 15h18c1 0 2 1 2 2v1H2v-3z" fill="#2496ED"/></svg> },
  { name: 'Kubernetes', svg: <svg viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="9" stroke="#326CE5" strokeWidth="1.5"/><circle cx="12" cy="7" r="1.5" fill="#326CE5"/><circle cx="7.5" cy="14" r="1.5" fill="#326CE5"/><circle cx="16.5" cy="14" r="1.5" fill="#326CE5"/><path d="M12 8.5v4M8.8 13.2l2.6-1.5M15.2 13.2l-2.6-1.5" stroke="#326CE5" strokeWidth="1.2"/></svg> },
  { name: 'Terraform', svg: <svg viewBox="0 0 24 24" fill="none"><rect x="3" y="3" width="7" height="7" rx="1.5" fill="#7B42BC"/><rect x="14" y="3" width="7" height="7" rx="1.5" fill="#7B42BC"/><rect x="3" y="14" width="7" height="7" rx="1.5" fill="#7B42BC"/><rect x="14" y="14" width="7" height="7" rx="1.5" fill="#7B42BC"/></svg> },
  { name: 'TensorFlow', svg: <svg viewBox="0 0 24 24" fill="none"><path d="M12 2L3 7v10l9 5 9-5V7l-9-5z" stroke="#FF6F00" strokeWidth="1.5" fill="none"/><path d="M12 7v10M7 9.5l5 2.5 5-2.5" stroke="#FF6F00" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg> },
  { name: 'PostgreSQL', svg: <svg viewBox="0 0 24 24" fill="none"><ellipse cx="12" cy="12" rx="8" ry="10" stroke="#336791" strokeWidth="1.5"/><path d="M12 2v20M8 4c-2 3-2 9 0 12M16 4c2 3 2 9 0 12" stroke="#336791" strokeWidth="1.2"/></svg> },
  { name: 'Redis', svg: <svg viewBox="0 0 24 24" fill="none"><path d="M20 8c0 2-3.5 4-8 4S4 10 4 8s3.5-4 8-4 8 2 8 4z" fill="#DC382D"/><path d="M20 12c0 2-3.5 4-8 4S4 14 4 12" stroke="#DC382D" strokeWidth="1.5"/><path d="M20 16c0 2-3.5 4-8 4S4 18 4 16" stroke="#DC382D" strokeWidth="1.5"/><path d="M4 8v8M20 8v8" stroke="#DC382D" strokeWidth="1.5"/></svg> },
  { name: 'GraphQL', svg: <svg viewBox="0 0 24 24" fill="none"><path d="M12 2l10 6v8l-10 6L2 16V8l10-6z" stroke="#E10098" strokeWidth="1.5"/><circle cx="12" cy="12" r="2.5" fill="#E10098"/><circle cx="5" cy="8" r="1.5" fill="#E10098"/><circle cx="19" cy="8" r="1.5" fill="#E10098"/><circle cx="5" cy="16" r="1.5" fill="#E10098"/><circle cx="19" cy="16" r="1.5" fill="#E10098"/><circle cx="12" cy="21" r="1.5" fill="#E10098"/></svg> },
];

export default function TechStack() {
  const sectionRef = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const grid = gridRef.current;
    if (!section || !grid) return;

    const cards = grid.querySelectorAll('.tech-card');

    const ctx = gsap.context(() => {
      // Entrance: cards fade in and rise like sand settling
      gsap.fromTo(
        cards,
        { opacity: 0, y: 60, scale: 0.85, filter: 'blur(8px)' },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          filter: 'blur(0px)',
          duration: 0.7,
          stagger: 0.06,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 70%',
            toggleActions: 'play none none none',
          },
        }
      );

      // Scroll-driven dust crumble
      ScrollTrigger.create({
        trigger: section,
        start: 'top 50%',
        end: 'bottom top',
        scrub: 1,
        onUpdate: (self) => {
          cards.forEach((card, i) => {
            const threshold = i * 0.07;
            if (self.progress > threshold) {
              card.classList.add('dusted');
            } else {
              card.classList.remove('dusted');
            }
          });
        },
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="techstack-section" id="techstack">
      <div className="techstack-header">
        <span className="techstack-tag">Our Arsenal</span>
        <h2 className="techstack-title">Tech Stack</h2>
        <p className="techstack-subtitle">Scroll past to watch them crumble to dust</p>
      </div>

      <div ref={gridRef} className="techstack-grid">
        {techItems.map((item, index) => (
          <div key={index} className="tech-card">
            {/* Dust particles burst */}
            <div className="dust-particles">
              {Array.from({ length: 12 }).map((_, i) => (
                <span
                  key={i}
                  className="dust-particle"
                  style={{
                    '--dx': `${(Math.random() - 0.5) * 80}px`,
                    '--dy': `${(Math.random() - 0.5) * 80 - 30}px`,
                    '--delay': `${Math.random() * 0.15}s`,
                    '--size': `${2 + Math.random() * 3}px`,
                  } as React.CSSProperties}
                />
              ))}
            </div>

            <div className="tech-card-inner">
              <span className="tech-card-icon">
                {item.svg}
              </span>
            </div>

            {/* Tooltip */}
            <div className="tech-card-tooltip">
              <span className="tech-tooltip-name">{item.name}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
