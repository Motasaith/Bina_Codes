import '../styles/Footer.css';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="container">
        
        <div className="footer-grid">
          
          {/* Brand/Socials Column */}
          <div className="footer-brand-column">
            <div className="footer-brand">
              <span className="footer-brand-icon">
                <svg viewBox="0 0 24 24" width="28" height="28" fill="currentColor">
                  <path d="M12 3L4 9v11h16V9l-8-6zm6 15H6V10l6-4.5 6 4.5v8z" opacity="0.4"/>
                  <path d="M12 5.5L6 10v7h12v-7l-6-4.5zM12 8a2 2 0 110 4 2 2 0 010-4z"/>
                </svg>
              </span>
              <span>Bina Codes</span>
            </div>
            <p className="footer-desc">
              Premium custom software engineering and highly-scalable server architecture for next-generation enterprises.
            </p>
            <div className="footer-socials">
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="footer-social-link" aria-label="GitHub">
                <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
                </svg>
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="footer-social-link" aria-label="LinkedIn">
                <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                  <rect x="2" y="9" width="4" height="12" />
                  <circle cx="4" cy="4" r="2" />
                </svg>
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="footer-social-link" aria-label="Twitter">
                <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links Column */}
          <div>
            <h4 className="footer-column-title">Company</h4>
            <div className="footer-links">
              <a href="#home" className="footer-link">Home</a>
              <a href="#about" className="footer-link">About Us</a>
              <a href="#services" className="footer-link">Services</a>
              <a href="#contact" className="footer-link">Contact</a>
            </div>
          </div>

          {/* Services Column */}
          <div>
            <h4 className="footer-column-title">Solutions</h4>
            <div className="footer-links">
              <a href="#services" className="footer-link">Custom Development</a>
              <a href="#services" className="footer-link">Cloud Infrastructure</a>
              <a href="#services" className="footer-link">AI & Automation</a>
              <a href="#services" className="footer-link">Security Auditing</a>
            </div>
          </div>

          {/* Server Status Column */}
          <div>
            <h4 className="footer-column-title">System Status</h4>
            <div className="footer-links" style={{ gap: '1rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#22c55e', boxShadow: '0 0 8px #22c55e' }}></span>
                <span style={{ fontSize: '0.9rem', color: 'var(--color-text-muted-light)' }}>Principal Cluster: Online</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#22c55e', boxShadow: '0 0 8px #22c55e' }}></span>
                <span style={{ fontSize: '0.9rem', color: 'var(--color-text-muted-light)' }}>Database Replication: Synced</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#22c55e', boxShadow: '0 0 8px #22c55e' }}></span>
                <span style={{ fontSize: '0.9rem', color: 'var(--color-text-muted-light)' }}>CDN Caching: 100% Active</span>
              </div>
            </div>
          </div>

        </div>

        {/* Footer Bottom */}
        <div className="footer-bottom">
          <span className="footer-copyright">
            © {currentYear} Bina Codes. All rights reserved. Designed for elite digital performance.
          </span>
          <div className="footer-bottom-links">
            <a href="#contact" className="footer-bottom-link">Privacy Policy</a>
            <a href="#contact" className="footer-bottom-link">Terms of Service</a>
          </div>
        </div>

      </div>
    </footer>
  );
}
