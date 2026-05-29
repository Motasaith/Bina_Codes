import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import '../styles/Footer.css';

export default function Footer() {
  const footerRef = useRef<HTMLElement>(null);
  const wordmarkRef = useRef<HTMLDivElement>(null);
  const columnsRef = useRef<HTMLDivElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);
  const currentYear = new Date().getFullYear();

  useEffect(() => {
    const footer = footerRef.current;
    const wordmark = wordmarkRef.current;
    const columns = columnsRef.current;
    const bottom = bottomRef.current;
    if (!footer || !wordmark || !columns || !bottom) return;

    const ctx = gsap.context(() => {
      // Wordmark letter stagger
      const letters = wordmark.querySelectorAll('.wordmark-letter');
      gsap.fromTo(
        letters,
        { opacity: 0, y: 60, rotateX: -90 },
        {
          opacity: 1,
          y: 0,
          rotateX: 0,
          duration: 0.8,
          stagger: 0.05,
          ease: 'back.out(1.7)',
          scrollTrigger: {
            trigger: footer,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        }
      );

      // Columns stagger up
      const cols = columns.querySelectorAll('.footer-column');
      gsap.fromTo(
        cols,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          stagger: 0.12,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: columns,
            start: 'top 90%',
            toggleActions: 'play none none none',
          },
        }
      );

      // Bottom bar slide in
      gsap.fromTo(
        bottom,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: bottom,
            start: 'top 95%',
            toggleActions: 'play none none none',
          },
        }
      );
    }, footer);

    return () => ctx.revert();
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const wordmarkText = 'Bina Codes';

  return (
    <footer ref={footerRef} className="footer">
      {/* Video background */}
      <div className="footer-video-bg">
        <video
          src="/footer.mp4"
          autoPlay
          loop
          muted
          playsInline
          disablePictureInPicture
          controls={false}
        />
      </div>
      <div className="footer-video-overlay" />

      {/* Floating particles background */}
      <div className="footer-particles">
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={i}
            className="footer-particle"
            style={{
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 8}s`,
              animationDuration: `${6 + Math.random() * 6}s`,
              width: `${2 + Math.random() * 4}px`,
              height: `${2 + Math.random() * 4}px`,
            }}
          />
        ))}
      </div>

      <div className="footer-wordmark" ref={wordmarkRef}>
        <span className="footer-wordmark-text">
          {wordmarkText.split('').map((char, i) => (
            <span
              key={i}
              className={`wordmark-letter ${char === ' ' ? 'space' : ''}`}
              style={{ animationDelay: `${i * 0.08}s` }}
            >
              {char === ' ' ? '\u00A0' : char}
            </span>
          ))}
        </span>
      </div>

      <div className="container">
        <div className="footer-grid" ref={columnsRef}>
          <div className="footer-column">
            <h4 className="footer-column-title">Company</h4>
            <ul className="footer-links">
              <li><Link to="/about" className="footer-link">About & Team</Link></li>
              <li><Link to="/services" className="footer-link">Services</Link></li>
              <li><Link to="/careers" className="footer-link">Careers</Link></li>
              <li><Link to="/blog" className="footer-link">Blog</Link></li>
            </ul>
          </div>

          <div className="footer-column">
            <h4 className="footer-column-title">Services</h4>
            <ul className="footer-links">
              <li><Link to="/services?category=full-stack" className="footer-link">Custom Software</Link></li>
              <li><Link to="/services?category=full-stack" className="footer-link">Web Apps</Link></li>
              <li><Link to="/services?category=full-stack" className="footer-link">Mobile Apps</Link></li>
              <li><Link to="/services?category=cloud-devops" className="footer-link">Cloud & DevOps</Link></li>
            </ul>
          </div>

          <div className="footer-column">
            <h4 className="footer-column-title">Contact</h4>
            <ul className="footer-links">
              <li>
                <a href="mailto:binacodex@gmail.com" className="footer-link">binacodex@gmail.com</a>
              </li>
              <li>
                <a href="tel:+923363855120" className="footer-link">+92 336-3855120</a>
              </li>
              <li>
                <span className="footer-contact-text">Rahim Yar Khan, Punjab, Pakistan</span>
              </li>
            </ul>
          </div>

          <div className="footer-column">
            <h4 className="footer-column-title">Newsletter</h4>
            <p className="footer-newsletter-text">Stay updated with our latest projects and tech insights.</p>
            <form className="footer-newsletter-form" onSubmit={(e) => e.preventDefault()}>
              <input
                type="email"
                placeholder="your@email.com"
                className="footer-newsletter-input"
              />
              <button type="submit" className="footer-newsletter-btn">Subscribe</button>
            </form>
          </div>
        </div>

        <div className="footer-bottom" ref={bottomRef}>
          <div className="footer-socials">
            <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="footer-social-link magnetic" aria-label="GitHub">
              <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
                <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>
              </svg>
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="footer-social-link magnetic" aria-label="LinkedIn">
              <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="footer-social-link magnetic" aria-label="Twitter">
              <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
                <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
              </svg>
            </a>
          </div>

          <span className="footer-copyright">
            © {currentYear} Bina Codes. All rights reserved.
          </span>

          <button onClick={scrollToTop} className="footer-back-to-top" aria-label="Back to top">
            <span className="back-to-top-arrow"></span>
            <span className="back-to-top-ripple"></span>
          </button>
        </div>
      </div>
    </footer>
  );
}
