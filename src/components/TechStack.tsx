import { useEffect, useRef, useState, useCallback } from 'react';
import { gsap } from 'gsap';
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
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [dusted, setDusted] = useState<Set<number>>(new Set());

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

      // Exit: dust crumble on scroll out
      gsap.to(cards, {
        opacity: 0,
        scale: 0.6,
        filter: 'blur(12px) brightness(1.4)',
        duration: 0.5,
        stagger: 0.04,
        ease: 'power2.in',
        scrollTrigger: {
          trigger: section,
          start: 'bottom 20%',
          end: 'bottom top',
          scrub: 1,
        },
      });
    }, section);

    return () => ctx.revert();
  }, []);

  const handleCardClick = useCallback((index: number) => {
    setDusted((prev) => {
      const next = new Set(prev);
      if (next.has(index)) {
        next.delete(index);
      } else {
        next.add(index);
      }
      return next;
    });
    // Auto-restore after 2.5s
    setTimeout(() => {
      setDusted((prev) => {
        const next = new Set(prev);
        next.delete(index);
        return next;
      });
    }, 2500);
  }, []);

  return (
    <section ref={sectionRef} className="techstack-section" id="techstack">
      <div className="techstack-header">
        <span className="techstack-tag">Our Arsenal</span>
        <h2 className="techstack-title">Tech Stack</h2>
        <p className="techstack-subtitle">Click any icon to watch it crumble to dust</p>
      </div>

      <div ref={gridRef} className="techstack-grid">
        {techItems.map((item, index) => {
          const isDusted = dusted.has(index);
          return (
            <div
              key={index}
              className={`tech-card ${isDusted ? 'dusted' : ''}`}
              onMouseEnter={() => setActiveIndex(index)}
              onMouseLeave={() => setActiveIndex(null)}
              onClick={() => handleCardClick(index)}
            >
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
              <div className={`tech-card-tooltip ${activeIndex === index ? 'visible' : ''}`}>
                <span className="tech-tooltip-name">{item.name}</span>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
