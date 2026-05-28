import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import '../styles/Process.css';

const processSteps = [
  {
    number: '01',
    title: 'Discover',
    description: 'We immerse ourselves in your business. Deep research, stakeholder interviews, and requirement analysis to uncover the real problem.',
    icon: (
      <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="11" cy="11" r="8" />
        <line x1="21" y1="21" x2="16.65" y2="16.65" />
      </svg>
    ),
  },
  {
    number: '02',
    title: 'Design',
    description: 'Wireframes evolve into pixel-perfect UI. We prototype, test with users, and refine until the experience feels effortless.',
    icon: (
      <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 19l7-7 3 3-7 7-3-3z" />
        <path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z" />
        <path d="M2 2l7.586 7.586" />
        <circle cx="11" cy="11" r="2" />
      </svg>
    ),
  },
  {
    number: '03',
    title: 'Develop',
    description: 'Agile sprints with daily standups. Clean code, comprehensive tests, and continuous integration ensure quality at every commit.',
    icon: (
      <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="16 18 22 12 16 6" />
        <polyline points="8 6 2 12 8 18" />
      </svg>
    ),
  },
  {
    number: '04',
    title: 'Deploy',
    description: 'CI/CD pipelines push to production. Monitoring, logging, and 24/7 support ensure your product runs flawlessly from day one.',
    icon: (
      <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
        <polyline points="22 4 12 14.01 9 11.01" />
      </svg>
    ),
  },
];

export default function Process() {
  const sectionRef = useRef<HTMLElement>(null);
  const lineRef = useRef<SVGPathElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const line = lineRef.current;
    if (!section || !line) return;

    const lineLength = line.getTotalLength();
    gsap.set(line, {
      strokeDasharray: lineLength,
      strokeDashoffset: lineLength,
    });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: 'top 60%',
        end: 'bottom 80%',
        scrub: 1,
      },
    });

    tl.to(line, {
      strokeDashoffset: 0,
      duration: 1,
      ease: 'none',
    });

    const steps = section.querySelectorAll('.process-step');
    steps.forEach((step, i) => {
      const isEven = i % 2 === 0;
      tl.fromTo(
        step,
        {
          opacity: 0,
          x: isEven ? -80 : 80,
        },
        {
          opacity: 1,
          x: 0,
          duration: 0.5,
          ease: 'power2.out',
        },
        i * 0.25 + 0.1
      );
    });

    return () => {
      tl.kill();
    };
  }, []);

  return (
    <section ref={sectionRef} className="process-section">
      <div className="process-header">
        <span className="process-tag">How We Work</span>
        <h2 className="process-title">Our Process</h2>
      </div>

      <div className="process-timeline">
        <svg className="process-line-svg" viewBox="0 0 2 800" preserveAspectRatio="none">
          <path
            ref={lineRef}
            d="M1 0 L1 800"
            stroke="url(#lineGradient)"
            strokeWidth="2"
            fill="none"
            strokeLinecap="round"
          />
          <defs>
            <linearGradient id="lineGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="var(--color-accent-gold)" stopOpacity="0.2" />
              <stop offset="50%" stopColor="var(--color-accent-gold)" stopOpacity="1" />
              <stop offset="100%" stopColor="var(--color-accent-gold)" stopOpacity="0.2" />
            </linearGradient>
          </defs>
        </svg>

        <div className="process-steps">
          {processSteps.map((step, i) => (
            <div
              key={i}
              className={`process-step ${i % 2 === 0 ? 'process-step--left' : 'process-step--right'}`}
            >
              <div className="process-step-node">
                <div className="process-step-icon">{step.icon}</div>
              </div>
              <div className="process-step-content">
                <span className="process-step-number">{step.number}</span>
                <h3 className="process-step-title">{step.title}</h3>
                <p className="process-step-desc">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
