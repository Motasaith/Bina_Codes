import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import '../styles/Manifesto.css';

const manifestoLines = [
  'We don\'t just write code.',
  'We engineer futures.',
  'Every line is a promise.',
  'Every deployment is a milestone.',
  'We turn complexity into clarity.',
];

export default function Manifesto() {
  const sectionRef = useRef<HTMLElement>(null);
  const linesRef = useRef<HTMLDivElement>(null);
  const particlesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const lines = linesRef.current;
    if (!section || !lines) return;

    const lineEls = lines.querySelectorAll('.manifesto-line');

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: 'top top',
        end: '+=150%',
        pin: true,
        scrub: 0.8,
      },
    });

    lineEls.forEach((line, i) => {
      const isEven = i % 2 === 0;
      tl.fromTo(
        line,
        {
          opacity: 0,
          x: isEven ? -120 : 120,
          scale: 0.9,
        },
        {
          opacity: 1,
          x: 0,
          scale: 1,
          duration: 1,
          ease: 'power2.out',
        },
        i * 0.6
      );
    });

    tl.to(
      lines,
      {
        opacity: 0,
        y: -60,
        duration: 1,
        ease: 'power2.in',
      },
      '+=0.5'
    );

    return () => {
      tl.kill();
    };
  }, []);

  // Generate gold particles
  useEffect(() => {
    const container = particlesRef.current;
    if (!container) return;

    const particleCount = 30;
    for (let i = 0; i < particleCount; i++) {
      const p = document.createElement('div');
      p.className = 'manifesto-particle';
      p.style.left = `${Math.random() * 100}%`;
      p.style.animationDelay = `${Math.random() * 8}s`;
      p.style.animationDuration = `${6 + Math.random() * 6}s`;
      p.style.width = `${2 + Math.random() * 4}px`;
      p.style.height = p.style.width;
      container.appendChild(p);
    }

    return () => {
      container.innerHTML = '';
    };
  }, []);

  return (
    <section ref={sectionRef} className="manifesto-section">
      <div ref={particlesRef} className="manifesto-particles" />
      <div ref={linesRef} className="manifesto-content">
        {manifestoLines.map((line, i) => (
          <div key={i} className="manifesto-line">
            {line}
          </div>
        ))}
      </div>
    </section>
  );
}
