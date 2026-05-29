import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Link } from 'react-router-dom';
import '../styles/CareersPage.css';

gsap.registerPlugin(ScrollTrigger);

const OPEN_POSITIONS = [
  {
    id: 'senior-fullstack',
    title: 'Senior Full-Stack Engineer',
    department: 'Engineering',
    location: 'Remote / Rahim Yar Khan',
    type: 'Full-time',
    description:
      'Lead the architecture and development of scalable web applications using modern stacks like Next.js, NestJS, and PostgreSQL.',
  },
  {
    id: 'ai-engineer',
    title: 'AI / ML Engineer',
    department: 'Engineering',
    location: 'Remote / Rahim Yar Khan',
    type: 'Full-time',
    description:
      'Design and deploy intelligent systems — from LLM-powered chatbots to computer-vision pipelines — for global clients.',
  },
  {
    id: 'ux-designer',
    title: 'Senior UX / UI Designer',
    department: 'Design',
    location: 'Remote / Rahim Yar Khan',
    type: 'Full-time',
    description:
      'Craft world-class user experiences and design systems in Figma, working closely with engineers to ship pixel-perfect products.',
  },
  {
    id: 'devops-engineer',
    title: 'DevOps / Cloud Engineer',
    department: 'Infrastructure',
    location: 'Remote / Rahim Yar Khan',
    type: 'Full-time',
    description:
      'Build robust CI/CD pipelines, manage Kubernetes clusters, and optimize cloud infrastructure on AWS, GCP, and Azure.',
  },
  {
    id: 'sales-lead',
    title: 'Business Development Lead',
    department: 'Sales',
    location: 'Remote / Rahim Yar Khan',
    type: 'Full-time',
    description:
      'Drive growth by identifying new client opportunities, managing partnerships, and expanding Bina Codes\' global footprint.',
  },
  {
    id: 'intern-dev',
    title: 'Software Engineering Intern',
    department: 'Engineering',
    location: 'Rahim Yar Khan',
    type: 'Internship',
    description:
      'A 3-month intensive program for talented local youth. Learn modern web development, Git workflows, and real-world project delivery.',
  },
];

const BENEFITS = [
  {
    icon: (
      <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <path d="M2 12h20" />
        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
      </svg>
    ),
    title: 'Global Exposure',
    desc: 'Work on international projects and collaborate with clients from the US, UK, EU, and Middle East.',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 20h9" />
        <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
      </svg>
    ),
    title: 'Mentorship & Growth',
    desc: 'One-on-one mentorship from senior engineers. Regular learning budgets and conference tickets.',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
        <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
      </svg>
    ),
    title: 'Competitive Compensation',
    desc: 'Market-leading salaries in PKR with performance bonuses, health insurance, and annual increments.',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
    title: 'Inclusive Culture',
    desc: 'A flat hierarchy where every voice matters. We celebrate diversity and foster psychological safety.',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
      </svg>
    ),
    title: 'Cutting-Edge Stack',
    desc: 'Work with the latest technologies — AI/LLMs, WebGL, serverless, edge computing, and more.',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
        <line x1="16" y1="2" x2="16" y2="6" />
        <line x1="8" y1="2" x2="8" y2="6" />
        <line x1="3" y1="10" x2="21" y2="10" />
      </svg>
    ),
    title: 'Flexible Schedule',
    desc: 'Hybrid and remote-friendly policies. Focus on output, not clock-watching.',
  },
];

export default function CareersPage() {
  const heroRef = useRef<HTMLElement>(null);
  const positionsRef = useRef<HTMLElement>(null);
  const benefitsRef = useRef<HTMLElement>(null);
  const ctaRef = useRef<HTMLElement>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero entrance
      if (heroRef.current) {
        const heroContent = heroRef.current.querySelector('.careers-hero-content');
        if (heroContent) {
          gsap.fromTo(
            heroContent.children,
            { opacity: 0, y: 40 },
            { opacity: 1, y: 0, duration: 0.8, stagger: 0.15, ease: 'power2.out' }
          );
        }
      }

      // Positions stagger
      if (positionsRef.current) {
        const cards = positionsRef.current.querySelectorAll('.position-card');
        gsap.fromTo(
          cards,
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            stagger: 0.1,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: positionsRef.current,
              start: 'top 80%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }

      // Benefits stagger
      if (benefitsRef.current) {
        const cards = benefitsRef.current.querySelectorAll('.benefit-card');
        gsap.fromTo(
          cards,
          { opacity: 0, y: 40, scale: 0.95 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.6,
            stagger: 0.1,
            ease: 'back.out(1.4)',
            scrollTrigger: {
              trigger: benefitsRef.current,
              start: 'top 80%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }

      // CTA entrance
      if (ctaRef.current) {
        gsap.fromTo(
          ctaRef.current.querySelector('.careers-cta-content'),
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: ctaRef.current,
              start: 'top 85%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }
    });

    return () => ctx.revert();
  }, []);

  return (
    <div className="careers-page">
      {/* Hero Header */}
      <section ref={heroRef} className="careers-page-hero">
        <div className="careers-page-hero-overlay"></div>
        <div className="careers-hero-content">
          <span className="careers-page-tag">Join the Mission</span>
          <h1 className="careers-page-title">Careers at Bina Codes</h1>
          <p className="careers-page-subtitle">
            Help us build world-class software while uplifting local talent in Rahim Yar Khan.
            We are always looking for passionate engineers, designers, and dreamers.
          </p>
          <a href="#open-positions" className="careers-hero-cta">
            View Open Positions
            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </a>
        </div>
      </section>

      {/* Culture / Mission Statement */}
      <section className="careers-culture-section">
        <div className="container">
          <div className="careers-culture-grid">
            <div className="careers-culture-left">
              <span className="culture-tag">Our Culture</span>
              <h2 className="culture-title">Engineering Excellence, Human First</h2>
              <p className="culture-desc">
                At Bina Codes, we believe the best software is built by empowered people. 
                We combine Silicon Valley-grade engineering standards with a deeply human, 
                mentorship-driven culture rooted in South Punjab.
              </p>
              <p className="culture-desc">
                Whether you are a seasoned architect or a fresh graduate, you will find 
                challenging problems, patient mentors, and a team that genuinely wants you to grow.
              </p>
            </div>
            <div className="careers-culture-right">
              <div className="culture-stat-card">
                <span className="culture-stat-number">90%</span>
                <span className="culture-stat-label">Retention Rate</span>
              </div>
              <div className="culture-stat-card">
                <span className="culture-stat-number">3x</span>
                <span className="culture-stat-label">Avg. Skill Growth / Year</span>
              </div>
              <div className="culture-stat-card">
                <span className="culture-stat-number">100%</span>
                <span className="culture-stat-label">Remote-Friendly Roles</span>
              </div>
              <div className="culture-stat-card">
                <span className="culture-stat-number">6</span>
                <span className="culture-stat-label">Countries Represented</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Open Positions */}
      <section ref={positionsRef} id="open-positions" className="careers-positions-section">
        <div className="container">
          <div className="careers-section-header">
            <span className="careers-section-tag">Open Roles</span>
            <h2 className="careers-section-title">Find Your Next Challenge</h2>
            <p className="careers-section-subtitle">
              All positions are open to remote candidates. Local applicants in Rahim Yar Khan are especially encouraged.
            </p>
          </div>

          <div className="positions-list">
            {OPEN_POSITIONS.map((job) => (
              <div key={job.id} className="position-card">
                <div className="position-card-header">
                  <div className="position-meta-row">
                    <span className="position-department">{job.department}</span>
                    <span className="position-type">{job.type}</span>
                  </div>
                  <h3 className="position-title">{job.title}</h3>
                  <div className="position-location">
                    <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                      <circle cx="12" cy="10" r="3" />
                    </svg>
                    {job.location}
                  </div>
                </div>
                <p className="position-description">{job.description}</p>
                <div className="position-card-footer">
                  <a
                    href={`mailto:binacodex@gmail.com?subject=Application for ${encodeURIComponent(job.title)}`}
                    className="btn-apply-position"
                  >
                    Apply Now
                    <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="5" y1="12" x2="19" y2="12" />
                      <polyline points="12 5 19 12 12 19" />
                    </svg>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section ref={benefitsRef} className="careers-benefits-section">
        <div className="container">
          <div className="careers-section-header">
            <span className="careers-section-tag">Perks</span>
            <h2 className="careers-section-title">Why You Will Love It Here</h2>
          </div>
          <div className="benefits-grid">
            {BENEFITS.map((b, i) => (
              <div key={i} className="benefit-card">
                <div className="benefit-icon">{b.icon}</div>
                <h3 className="benefit-title">{b.title}</h3>
                <p className="benefit-desc">{b.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section ref={ctaRef} className="careers-cta-section">
        <div className="careers-cta-content">
          <h2 className="careers-cta-title">Do not see the right role?</h2>
          <p className="careers-cta-desc">
            We are always interested in meeting exceptional people. Send us your portfolio or CV and tell us what you are passionate about.
          </p>
          <a href="mailto:binacodex@gmail.com?subject=General Application" className="careers-cta-btn">
            Send Open Application
          </a>
          <p className="careers-cta-or">
            or browse our <Link to="/services">services</Link> to see what we build
          </p>
        </div>
      </section>
    </div>
  );
}
