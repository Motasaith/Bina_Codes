import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import '../styles/Portfolio.css';

const projectsData = [
  {
    name: 'Nexus Finance Platform',
    description: 'A comprehensive fintech solution processing $2M+ daily transactions with real-time analytics and AI-powered fraud detection.',
    tags: ['React', 'Node.js', 'PostgreSQL', 'AWS'],
    image: '/section_bg.png',
  },
  {
    name: 'MediConnect Health App',
    description: 'Telemedicine platform connecting 50,000+ patients with healthcare providers through secure video consultations.',
    tags: ['React Native', 'GraphQL', 'Docker', 'Kubernetes'],
    image: '/section_bg.png',
  },
  {
    name: 'SupplyChain Pro',
    description: 'End-to-end logistics management system tracking 100,000+ shipments across 30 countries with IoT integration.',
    tags: ['Next.js', 'Python', 'TensorFlow', 'Redis'],
    image: '/section_bg.png',
  },
  {
    name: 'EduVerse Learning',
    description: 'Interactive e-learning platform with 500+ courses, live coding environments, and AI tutoring assistants.',
    tags: ['Vue.js', 'Django', 'OpenAI', 'MongoDB'],
    image: '/section_bg.png',
  },
];

export default function Portfolio() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const projects = section.querySelectorAll('.portfolio-project');

    projects.forEach((project) => {
      const image = project.querySelector('.portfolio-image');
      const content = project.querySelector('.portfolio-content');

      gsap.fromTo(
        image,
        { yPercent: -20, scale: 1.1 },
        {
          yPercent: 20,
          scale: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: project,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
        }
      );

      gsap.fromTo(
        content,
        { opacity: 0, y: 60 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: project,
            start: 'top 75%',
            end: 'top 25%',
            scrub: 1,
          },
        }
      );
    });

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <section ref={sectionRef} className="portfolio-section">
      <div className="portfolio-header">
        <span className="portfolio-tag">Selected Work</span>
        <h2 className="portfolio-title">Proof of Excellence</h2>
      </div>

      <div className="portfolio-projects">
        {projectsData.map((project, i) => (
          <div key={i} className="portfolio-project">
            <div className="portfolio-image-wrapper">
              <div
                className="portfolio-image"
                style={{ backgroundImage: `url(${project.image})` }}
              />
              <div className="portfolio-image-overlay" />
            </div>
            <div className="portfolio-content">
              <h3 className="portfolio-project-name">{project.name}</h3>
              <p className="portfolio-project-desc">{project.description}</p>
              <div className="portfolio-tags">
                {project.tags.map((tag, j) => (
                  <span key={j} className="portfolio-tag-item">{tag}</span>
                ))}
              </div>
              <a href="#contact" className="portfolio-link underline-draw">
                View Case Study →
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
