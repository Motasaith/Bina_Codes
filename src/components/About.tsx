import '../styles/About.css';

interface StatItem {
  value: string;
  label: string;
}

interface FeatureItem {
  title: string;
  description: string;
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
      </div>
    </section>
  );
}
