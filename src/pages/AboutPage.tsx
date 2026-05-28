import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Manifesto from '../components/Manifesto';
import Team from '../components/Team';
import '../styles/AboutPage.css';

gsap.registerPlugin(ScrollTrigger);

export default function AboutPage() {
  const storyRef = useRef<HTMLElement>(null);
  const storyLeftRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);

  // Ensure the page scrolls to top when navigating here
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Scroll-triggered animations for the story section
  useEffect(() => {
    const story = storyRef.current;
    const left = storyLeftRef.current;
    const stats = statsRef.current;
    if (!story || !left || !stats) return;

    const tag = left.querySelector('.story-tag');
    const title = left.querySelector('.story-title');
    const desc = left.querySelector('.story-desc');
    const statCards = stats.querySelectorAll('.stat-card');

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: story,
        start: 'top 80%',
        end: 'top 30%',
        toggleActions: 'play none none reverse',
      },
    });

    tl.fromTo(
      [tag, title, desc],
      { opacity: 0, y: 40 },
      { opacity: 1, y: 0, duration: 0.8, stagger: 0.15, ease: 'power2.out' }
    );

    tl.fromTo(
      statCards,
      { opacity: 0, y: 50, scale: 0.92 },
      { opacity: 1, y: 0, scale: 1, duration: 0.7, stagger: 0.12, ease: 'back.out(1.4)' },
      '-=0.4'
    );

    return () => {
      tl.kill();
      ScrollTrigger.getAll().forEach((t) => {
        if (t.vars.trigger === story) t.kill();
      });
    };
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
      <section ref={storyRef} className="about-story-section">
        <div className="container">
          <div className="about-story-grid">
            <div ref={storyLeftRef} className="about-story-left">
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
              <div ref={statsRef} className="about-stats-grid">
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
