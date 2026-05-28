import { useEffect } from 'react';
import Manifesto from '../components/Manifesto';
import Team from '../components/Team';
import '../styles/AboutPage.css';

export default function AboutPage() {
  // Ensure the page scrolls to top when navigating here
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="about-page">
      {/* Hero Header */}
      <section className="about-page-hero">
        <div className="about-page-hero-overlay"></div>
        <div className="about-page-hero-content">
          <span className="about-page-tag">Who We Are</span>
          <h1 className="about-page-title">About Bina Codes</h1>
          <p className="about-page-subtitle">
            An elite software engineering studio crafting premium custom applications and high-performance digital systems.
          </p>
        </div>
      </section>

      {/* Manifesto Section */}
      <Manifesto />

      {/* Our Story & Stats Section */}
      <section className="about-story-section">
        <div className="container">
          <div className="about-story-grid">
            <div className="about-story-left">
              <span className="story-tag">Our Impact</span>
              <h2 className="story-title">Bridging Global Quality with Local Talent</h2>
              <p className="story-desc">
                Bina Codes is proud to be the premier software house in <strong>Rahim Yar Khan</strong>. 
                We are dedicated to building high-performance web systems and scaling cloud solutions for clients globally, 
                while simultaneously establishing a local tech ecosystem. We train and mentor local youth in modern, 
                high-income software development and design skills, preparing them to compete on the world stage.
              </p>
            </div>
            <div className="about-story-right">
              <div className="about-stats-grid">
                <div className="stat-card">
                  <span className="stat-number">175+</span>
                  <span className="stat-label">Projects Done</span>
                </div>
                <div className="stat-card">
                  <span className="stat-number">125+</span>
                  <span className="stat-label">Happy Clients</span>
                </div>
                <div className="stat-card">
                  <span className="stat-number">5</span>
                  <span className="stat-label">Award Winner</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <Team />
    </div>
  );
}
