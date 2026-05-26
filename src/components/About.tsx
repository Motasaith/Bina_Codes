import '../styles/About.css';

interface StatItem {
  value: string;
  label: string;
}

interface FeatureItem {
  title: string;
  description: string;
}

interface ServiceItem {
  title: string;
  description: string;
  icon: React.ReactNode;
  statusText: string;
}

export default function About() {
  const statsData: StatItem[] = [
    { value: "150+", label: "Projects Completed" },
    { value: "18+", label: "Expert Developers" },
    { value: "99.9%", label: "Server Uptime" },
    { value: "100%", label: "Satisfied Clients" }
  ];

  const featuresData: FeatureItem[] = [
    {
      title: "Interactive Web Aesthetics",
      description: "We craft interfaces with fluid animations, layout glassmorphism, and responsive visual depth that leave a lasting premium impression."
    },
    {
      title: "High-Performance Architectures",
      description: "Our engineering pipeline enforces rigorous speed testing, database query optimization, and SEO integrations to guarantee visibility and traffic scale."
    },
    {
      title: "Future-Proof Development",
      description: "Writing clean, modular codebase architectures in TypeScript, backed by robust documentation. We prepare your software to scale for any future updates."
    }
  ];

  const servicesData: ServiceItem[] = [
    {
      title: "Custom Software Engineering",
      description: "We design and develop high-performance enterprise systems, custom APIs, and backend architectures that scale smoothly with your growing traffic.",
      statusText: "Optimized Node.js & Go stacks",
      icon: (
        <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="16 18 22 12 16 6" />
          <polyline points="8 6 2 12 8 18" />
        </svg>
      )
    },
    {
      title: "Cloud Infrastructure & Servers",
      description: "Architecting cloud-native server operations, load balancing, and edge caching configurations. Robust hosting solutions that boast 99.99% operational uptime.",
      statusText: "Bina Servers Active",
      icon: (
        <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="2" width="20" height="8" rx="2" ry="2" />
          <rect x="2" y="14" width="20" height="8" rx="2" ry="2" />
          <line x1="6" y1="6" x2="6.01" y2="6" />
          <line x1="6" y1="18" x2="6.01" y2="18" />
        </svg>
      )
    },
    {
      title: "AI Integration & Data Science",
      description: "Empower your software systems with machine learning, NLP, and intelligent recommendation algorithms customized specifically for your operations.",
      statusText: "GPU clusters online",
      icon: (
        <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
          <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
          <line x1="12" y1="22.08" x2="12" y2="12" />
        </svg>
      )
    },
    {
      title: "Premium Interactive Design",
      description: "Award-winning, beautiful user experiences built with high-fidelity micro-interactions, responsive frameworks, and smooth animations that keep visitors engaged.",
      statusText: "Web Vitals score: 100/100",
      icon: (
        <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
          <path d="M12 6v12M6 12h12" />
        </svg>
      )
    },
    {
      title: "Mobile App Development",
      description: "Developing blazing fast, native and cross-platform apps using React Native and Flutter, optimized for fluid UI, custom gestures, and native performance.",
      statusText: "Swift & Kotlin builds verified",
      icon: (
        <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="5" y="2" width="14" height="20" rx="2" ry="2" />
          <line x1="12" y1="18" x2="12.01" y2="18" />
        </svg>
      )
    },
    {
      title: "Cybersecurity & Scaling Audits",
      description: "Securing systems from vector exploits, penetration testing, database auditing, and implementing zero-trust security profiles across all cloud assets.",
      statusText: "Zero alerts - SSL/TLS 1.3 enforced",
      icon: (
        <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
          <path d="M7 11V7a5 5 0 0 1 10 0v4" />
        </svg>
      )
    }
  ];

  return (
    <section id="about" className="about-section">
      <div className="about-bg-blur about-blur-1"></div>
      <div className="about-bg-blur about-blur-2"></div>
      
      <div className="container">
        <div className="about-grid">
          
          {/* Left: Interactive Stat Cards Grid */}
          <div className="about-stats-panel">
            {statsData.map((stat, index) => (
              <div key={index} className="about-stat-card">
                <span className="stat-number">{stat.value}</span>
                <span className="stat-label">{stat.label}</span>
              </div>
            ))}
          </div>

          {/* Right: Text Copy & Features */}
          <div className="about-content">
            <span className="about-tagline">Why Bina Codes</span>
            <h2 className="about-title">We engineer software that drives digital momentum.</h2>
            <p className="about-text">
              Bina Codes is a premium software house that partners with forward-thinking enterprises. 
              We operate at the intersection of stunning visual design and robust cloud engineering, 
              bringing software products to life with exceptional precision.
            </p>
            
            <div className="about-features">
              {featuresData.map((feature, index) => (
                <div key={index} className="about-feature-item">
                  <div className="feature-check">
                    <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </div>
                  <div className="feature-content">
                    <h3 className="feature-title">{feature.title}</h3>
                    <p className="feature-desc">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Relocated capabilities grid */}
        <div className="about-capabilities">
          <div className="about-capabilities-header">
            <span className="about-tagline">Capabilities</span>
            <h2 className="about-capabilities-title">Our Technical Offerings</h2>
            <p className="about-capabilities-subtitle">
              We design, build, and support enterprise-grade systems with absolute precision.
            </p>
          </div>
          
          <div className="services-grid">
            {servicesData.map((service, index) => (
              <div key={index} className="service-card">
                <div className="service-icon-box">
                  {service.icon}
                </div>
                <h3 className="service-card-title">{service.title}</h3>
                <p className="service-card-desc">{service.description}</p>
                <div className="service-status">
                  <span className="status-dot active"></span>
                  <span>{service.statusText}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
