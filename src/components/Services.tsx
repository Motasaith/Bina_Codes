import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import '../styles/Services.css';

const servicesData = [
  {
    icon: (
      <svg viewBox="0 0 24 24" width="32" height="32" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="3" width="20" height="14" rx="2" />
        <line x1="8" y1="21" x2="16" y2="21" />
        <line x1="12" y1="17" x2="12" y2="21" />
      </svg>
    ),
    title: 'Custom Software',
    description: 'Tailored applications built from the ground up to solve your unique business challenges with precision and scalability.',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" width="32" height="32" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <line x1="2" y1="12" x2="22" y2="12" />
        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
      </svg>
    ),
    title: 'Web Applications',
    description: 'Modern, responsive web apps using React, Next.js, and cutting-edge frontend architecture for peak performance.',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" width="32" height="32" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="5" y="2" width="14" height="20" rx="2" ry="2" />
        <line x1="12" y1="18" x2="12.01" y2="18" />
      </svg>
    ),
    title: 'Mobile Apps',
    description: 'Native and cross-platform mobile experiences with React Native and Flutter that users love to engage with daily.',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" width="32" height="32" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z" />
      </svg>
    ),
    title: 'Cloud & DevOps',
    description: 'AWS, Docker, Kubernetes infrastructure with automated CI/CD pipelines for reliable, scalable deployments.',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" width="32" height="32" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="16 18 22 12 16 6" />
        <polyline points="8 6 2 12 8 18" />
      </svg>
    ),
    title: 'API & Microservices',
    description: 'Robust API gateways and microservice architectures that connect systems seamlessly and scale independently.',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" width="32" height="32" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2a10 10 0 1 0 10 10H12V2z" />
        <path d="M12 2a10 10 0 0 1 10 10" />
        <circle cx="12" cy="12" r="3" />
      </svg>
    ),
    title: 'AI & Machine Learning',
    description: 'Intelligent solutions powered by TensorFlow, PyTorch, and OpenAI integrations that automate and optimize decisions.',
  },
];

export default function Services() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track) return;

    const cards = track.querySelectorAll('.service-card');
    const totalWidth = track.scrollWidth - window.innerWidth;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: 'top top',
        end: () => `+=${totalWidth}`,
        pin: true,
        scrub: 1,
        invalidateOnRefresh: true,
      },
    });

    tl.to(track, {
      x: -totalWidth,
      ease: 'none',
    });

    cards.forEach((card, i) => {
      tl.fromTo(
        card,
        { opacity: 0.3, scale: 0.85 },
        { opacity: 1, scale: 1, duration: 0.5, ease: 'power2.out' },
        i * 0.15
      );
    });

    return () => {
      tl.kill();
    };
  }, []);

  return (
    <section ref={sectionRef} className="services-section">
      <div className="services-header">
        <span className="services-tag">What We Build</span>
        <h2 className="services-title">Services</h2>
      </div>

      <div ref={trackRef} className="services-track">
        {servicesData.map((service, i) => (
          <div key={i} className="service-card tilt-card">
            <div className="service-card-icon">{service.icon}</div>
            <h3 className="service-card-title">{service.title}</h3>
            <p className="service-card-desc">{service.description}</p>
            <a href="#contact" className="service-card-link underline-draw">
              Learn More →
            </a>
          </div>
        ))}
      </div>

      {/* Decorative floating spheres */}
      <div className="services-sphere sphere-1"></div>
      <div className="services-sphere sphere-2"></div>
      <div className="services-sphere sphere-3"></div>
    </section>
  );
}
