import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import '../styles/TechStack.css';

const techItems = [
  { name: 'React', icon: '⚛', color: '#61DAFB' },
  { name: 'TypeScript', icon: '◈', color: '#3178C6' },
  { name: 'Node.js', icon: '⬢', color: '#339933' },
  { name: 'Python', icon: '🐍', color: '#3776AB' },
  { name: 'AWS', icon: '☁', color: '#FF9900' },
  { name: 'Docker', icon: '🐳', color: '#2496ED' },
  { name: 'Kubernetes', icon: '☸', color: '#326CE5' },
  { name: 'Terraform', icon: '🏗', color: '#7B42BC' },
  { name: 'TensorFlow', icon: '🧠', color: '#FF6F00' },
  { name: 'PostgreSQL', icon: '🐘', color: '#336791' },
  { name: 'Redis', icon: '🔴', color: '#DC382D' },
  { name: 'GraphQL', icon: '◈', color: '#E10098' },
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
              <span className="tech-card-icon" style={{ color: item.color }}>
                {item.icon}
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
