import '../styles/Services.css';

interface ServiceItem {
  title: string;
  description: string;
  icon: React.ReactNode;
  statusText: string;
}

export default function Services() {
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
    <section id="services" className="services-section">
      {/* Decorative floating spheres matching the screenshot transition */}
      <div className="services-sphere sphere-1"></div>
      <div className="services-sphere sphere-2"></div>
      <div className="services-sphere sphere-3"></div>
      <div className="services-sphere sphere-4"></div>
      <div className="services-sphere sphere-5"></div>
      <div className="services-sphere sphere-6"></div>
      <div className="services-sphere sphere-7"></div>
      <div className="services-sphere sphere-8"></div>
      <div className="services-sphere sphere-9"></div>
      
      <div className="container">
        <div className="services-header">
          <h2 className="services-title">Bina Servers</h2>
          <p className="services-subtitle">
            The extremely premium technology offering a platform engineered to optimize highly
            reliable, and automated targeting, to maintain entire business operations,
            with uninterrupted operational level focus.
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
    </section>
  );
}
