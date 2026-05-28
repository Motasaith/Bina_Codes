import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import '../styles/TechStack.css';

const techItems = [
  { name: 'React', svg: <svg viewBox="0 0 24 24" fill="none" stroke="#61DAFB" strokeWidth="1.5"><circle cx="12" cy="12" r="2" fill="#61DAFB" stroke="#61DAFB"/><ellipse cx="12" cy="12" rx="10" ry="4" stroke="#61DAFB"/><ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(60 12 12)" stroke="#61DAFB"/><ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(120 12 12)" stroke="#61DAFB"/></svg> },
  { name: 'Next.js', svg: <svg viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="10" fill="#000"/><path d="M17 17.5l-5.6-7.8h-1.2v6.4h1.1v-4.5l4.6 6.3h1.1zm-4.7-6.4V14l1.1 1.5v-4.4z" fill="#fff"/></svg> },
  { name: 'Vue.js', svg: <svg viewBox="0 0 24 24" fill="none"><path d="M12 2L2 19h4l6-10 6 10h4L12 2z" fill="#41B883"/><path d="M12 6.5L5.5 17.5h3L12 11.5l3.5 6h3L12 6.5z" fill="#35495E"/></svg> },
  { name: 'Svelte', svg: <svg viewBox="0 0 24 24" fill="none"><path d="M12 2c5.52 0 10 4.48 10 10s-4.48 10-10 10S2 17.52 2 12 6.48 2 12 2zm0 18c4.42 0 8-3.58 8-8s-3.58-8-8-8-8 3.58-8 8 3.58 8 8 8zm-2-12l5 4-5 4V8z" fill="#FF3E00"/></svg> },
  { name: 'TypeScript', svg: <svg viewBox="0 0 24 24" fill="none"><rect x="2" y="2" width="20" height="20" rx="3" fill="#3178C6"/><path d="M6 7h8v2H11v8H9V9H6V7z" fill="#FFF"/><path d="M15 11.5c0-.8.6-1.5 1.5-1.5s1.5.7 1.5 1.5v.5h-1.2v-.5c0-.2-.1-.3-.3-.3s-.3.1-.3.3v.8c0 .2.1.3.3.3h.6c.8 0 1.4.6 1.4 1.4v.5c0 .8-.6 1.5-1.5 1.5s-1.5-.7-1.5-1.5v-.5h1.2v.5c0 .2.1.3.3.3s.3-.1.3-.3v-.8c0-.2-.1-.3-.3-.3h-.6c-.8 0-1.4-.6-1.4-1.4v-.5z" fill="#FFF"/></svg> },
  { name: 'Node.js', svg: <svg viewBox="0 0 24 24" fill="#339933"><path d="M12 2L3 7.2v9.6L12 22l9-5.2V7.2L12 2zm-1 16.5l-4.5-2.6v-5.2l4.5 2.6v5.2zm1-5.6l-4.5-2.6L12 7.7l4.5 2.6-4.5 2.6zm5.5 3l-4.5 2.6v-5.2l4.5-2.6v5.2z"/></svg> },
  { name: 'Python', svg: <svg viewBox="0 0 24 24" fill="none"><path d="M12 2c-3 0-5 1-5 3v3h6v2H5c-3 0-5 1.5-5 4s2 4 5 4h2v-3c0-2 2-3 5-3h6V5c0-2-2-3-5-3z" fill="#3776AB"/><path d="M12 22c3 0 5-1 5-3v-3h-6v-2h8c3 0 5-1.5 5-4s-2-4-5-4h-2v3c0 2-2 3-5 3H6v5c0 2 2 3 5 3z" fill="#FFD43B"/></svg> },
  { name: 'FastAPI', svg: <svg viewBox="0 0 24 24" fill="none"><path d="M12 2L2 13.5h9v8.5L22 10.5h-9L12 2z" fill="#009688"/></svg> },
  { name: 'NestJS', svg: <svg viewBox="0 0 24 24" fill="none"><path d="M12 2L2 7.5v9L12 22l10-5.5v-9L12 2zm8 13.7L12 19.9l-8-4.2V8.8l8-4.2 8 4.2v6.9z" fill="#E0234E"/><path d="M12 6.5l5 2.7v5.6l-5 2.7-5-2.7V9.2l5-2.7z" fill="#E0234E"/></svg> },
  { name: 'GraphQL', svg: <svg viewBox="0 0 24 24" fill="none"><path d="M12 2l10 6v8l-10 6L2 16V8l10-6z" stroke="#E10098" strokeWidth="1.5"/><circle cx="12" cy="12" r="2.5" fill="#E10098"/><circle cx="5" cy="8" r="1.5" fill="#E10098"/><circle cx="19" cy="8" r="1.5" fill="#E10098"/><circle cx="5" cy="16" r="1.5" fill="#E10098"/><circle cx="19" cy="16" r="1.5" fill="#E10098"/><circle cx="12" cy="21" r="1.5" fill="#E10098"/></svg> },
  { name: 'PostgreSQL', svg: <svg viewBox="0 0 24 24" fill="none"><ellipse cx="12" cy="12" rx="8" ry="10" stroke="#336791" strokeWidth="1.5"/><path d="M12 2v20M8 4c-2 3-2 9 0 12M16 4c2 3 2 9 0 12" stroke="#336791" strokeWidth="1.2"/></svg> },
  { name: 'MongoDB', svg: <svg viewBox="0 0 24 24" fill="none"><path d="M12 2c-.6 1.8-2.5 5.5-2.5 9.5 0 3.2 1.3 5.4 2.5 7.5 1.2-2.1 2.5-4.3 2.5-7.5 0-4-1.9-7.7-2.5-9.5zm0 18c-.8 0-1.5.7-1.5 1.5S11.2 23 12 23s1.5-.7 1.5-1.5S12.8 20 12 20z" fill="#47A248"/></svg> },
  { name: 'MySQL', svg: <svg viewBox="0 0 24 24" fill="none"><path d="M12 2c5.52 0 10 3.58 10 8s-4.48 8-10 8-10-3.58-10-8 4.48-8 10-8z" stroke="#00758F" strokeWidth="1.5"/><path d="M12 5.5c3.31 0 6 2.01 6 4.5s-2.69 4.5-6 4.5-6-2.01-6-4.5 2.69-4.5 6-4.5z" fill="#00758F"/></svg> },
  { name: 'Supabase', svg: <svg viewBox="0 0 24 24" fill="none"><path d="M19 11h-6.5l4-7.5L5 13h6.5l-4 7.5L19 11z" fill="#3ECF8E"/></svg> },
  { name: 'Redis', svg: <svg viewBox="0 0 24 24" fill="none"><path d="M20 8c0 2-3.5 4-8 4S4 10 4 8s3.5-4 8-4 8 2 8 4z" fill="#DC382D"/><path d="M20 12c0 2-3.5 4-8 4S4 14 4 12" stroke="#DC382D" strokeWidth="1.5"/><path d="M20 16c0 2-3.5 4-8 4S4 18 4 16" stroke="#DC382D" strokeWidth="1.5"/><path d="M4 8v8M20 8v8" stroke="#DC382D" strokeWidth="1.5"/></svg> },
  { name: 'WordPress', svg: <svg viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="10" stroke="#21759B" strokeWidth="1.5"/><path d="M12.1 9.4c.2-.4.4-.7.4-.9V8.3c0-.3-.1-.5-.4-.5h-2.1c-.3 0-.4.2-.4.5v.2c0 .2.2.4.4.4h.4c.3 0 .4.2.4.5L8.9 16l-1.9-5.7c.3-.1.5-.3.5-.5V9.6c0-.3-.2-.5-.5-.5H5.4c-.3 0-.5.2-.5.5v.2c0 .2.2.3.5.3h.3c.3 0 .4.2.5.5l2.9 8.6 3-8.8zm4.4-.3c0-.6-.2-1-.6-1.3-.4-.3-1-.5-1.7-.5-1.1 0-2 .4-2.8 1.1l.6.6c.5-.4 1-.7 1.6-.7.3 0 .5.1.7.2.2.1.2.3.2.5v.4c-.7.1-1.3.4-1.8.8-.5.4-.7.9-.7 1.5 0 .6.2 1.1.6 1.4.4.3.9.5 1.5.5 1 0 1.7-.5 2-1.4l.2.8h1.4V9.1z" fill="#21759B"/></svg> },
  { name: 'Shopify', svg: <svg viewBox="0 0 24 24" fill="none"><path d="M19 6.5l-6-2.5-6 2.5v11l6 2.5 6-2.5v-11z" stroke="#96BF48" strokeWidth="1.5"/><path d="M12 9.5c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" fill="#96BF48"/></svg> },
  { name: 'AWS', svg: <svg viewBox="0 0 24 24" fill="none"><path d="M6 16c-1-1-2-2.5-2-4.5C4 7 7.5 4 12 4s8 3 8 7.5c0 2-1 3.5-2 4.5" stroke="#FF9900" strokeWidth="2" strokeLinecap="round"/><path d="M8 14c1.5 1 3 1.5 4 1.5s2.5-.5 4-1.5" stroke="#FF9900" strokeWidth="2" strokeLinecap="round"/><path d="M12 15.5V20M9 18l3 3 3-3" stroke="#FF9900" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg> },
  { name: 'Docker', svg: <svg viewBox="0 0 24 24" fill="none"><rect x="2" y="10" width="4" height="4" rx="1" fill="#2496ED"/><rect x="7" y="10" width="4" height="4" rx="1" fill="#2496ED"/><rect x="12" y="10" width="4" height="4" rx="1" fill="#2496ED"/><rect x="7" y="5" width="4" height="4" rx="1" fill="#2496ED"/><rect x="12" y="5" width="4" height="4" rx="1" fill="#2496ED"/><rect x="17" y="10" width="4" height="4" rx="1" fill="#2496ED"/><path d="M2 15h18c1 0 2 1 2 2v1H2v-3z" fill="#2496ED"/></svg> },
  { name: 'Figma', svg: <svg viewBox="0 0 24 24" fill="none"><path d="M8 2h4v4H8V2zm4 4h4v4h-4V6zM8 6h4v4H8V6zm0 4h4v4H8v-4zm0 4h4v4H8v-4zm4 0h4c1.1 0 2-.9 2-2s-.9-2-2-2h-4v4z" fill="#F24E1E"/><path d="M12 14v4a2 2 0 01-2 2 2 2 0 01-2-2 2 2 0 012-2h2z" fill="#0ACF83"/><circle cx="6" cy="18" r="2" fill="#1ABCFE" opacity="0.5"/><path d="M6 10a2 2 0 000 4h2v-4H6z" fill="#1ABCFE"/><path d="M6 4a2 2 0 000 4h2V4H6z" fill="#FF7262"/></svg> },
  { name: 'Stripe', svg: <svg viewBox="0 0 24 24" fill="none"><path d="M20 10.4c0-3-2-4.4-4.8-4.4-2.9 0-4.9 1.4-4.9 4.4 0 4.1 5.6 3.4 5.6 5.2 0 .7-.6 1.1-1.5 1.1-1.5 0-2.7-.6-3.7-1.3L9 17.5c1.3 1 3 1.5 4.8 1.5 3 0 5-1.4 5-4.4 0-4.3-5.6-3.5-5.6-5.3 0-.6.5-1 1.4-1 1.2 0 2.2.4 3 .9l2.4-2.1z" fill="#635BFF"/></svg> },
  { name: 'GitHub', svg: <svg viewBox="0 0 24 24" fill="none"><path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.577.688.479C19.138 20.162 22 16.418 22 12c0-5.523-4.477-10-10-10z" fill="#24292e"/></svg> },
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
