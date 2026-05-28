import { useState, useEffect } from 'react';
import '../styles/Navbar.css';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLinkClick = () => {
    setIsMenuOpen(false);
  };

  return (
    <header className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
      {/* Brand/Logo */}
      <div className="nav-brand" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
        <span className="brand-icon">
          <svg viewBox="0 0 24 24" width="100%" height="100%" fill="currentColor">
            {/* Hexagonal/house shape similar to the logo in the screenshot */}
            <path d="M12 3L4 9v11h16V9l-8-6zm6 15H6V10l6-4.5 6 4.5v8z" opacity="0.4"/>
            <path d="M12 5.5L6 10v7h12v-7l-6-4.5zM12 8a2 2 0 110 4 2 2 0 010-4z"/>
          </svg>
        </span>
        <span className="brand-name">Bina Codes</span>
      </div>

      {/* Desktop Links */}
      <nav className="nav-links">
        <a href="#home" className="nav-link">Home</a>
        <a href="#about" className="nav-link">About</a>
        <a href="#services" className="nav-link">About us</a>
        <a href="#contact" className="nav-link">Contact</a>
      </nav>

      {/* Desktop CTA Button */}
      <div className="nav-auth">
        <a href="#contact" className="btn-get-invoice">Get Quote</a>
      </div>

      {/* Hamburger Button for Mobile */}
      <button 
        className={`mobile-menu-btn ${isMenuOpen ? 'open' : ''}`} 
        onClick={toggleMenu}
        aria-label="Toggle Navigation Menu"
      >
        <span></span>
        <span></span>
        <span></span>
      </button>

      {/* Mobile Menu Panel */}
      <div className={`nav-menu-mobile ${isMenuOpen ? 'open' : ''}`}>
        <nav className="nav-links-mobile">
          <a href="#home" className="nav-link-mobile" onClick={handleLinkClick}>Home</a>
          <a href="#about" className="nav-link-mobile" onClick={handleLinkClick}>About</a>
          <a href="#services" className="nav-link-mobile" onClick={handleLinkClick}>About us</a>
          <a href="#contact" className="nav-link-mobile" onClick={handleLinkClick}>Contact</a>
        </nav>
        
        <div className="nav-auth-mobile">
          <a href="#contact" className="btn-get-invoice-mobile" onClick={handleLinkClick}>Get Quote</a>
        </div>
      </div>
    </header>
  );
}
