import { useState, useRef, useCallback } from 'react';
import Navbar from './Navbar';
import '../styles/Hero.css';

export default function Hero() {
  const [cursorPos, setCursorPos] = useState({ x: -100, y: -100 });
  const [isInHero, setIsInHero] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setCursorPos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  }, []);

  const handleMouseEnter = useCallback(() => setIsInHero(true), []);
  const handleMouseLeave = useCallback(() => {
    setIsInHero(false);
    setCursorPos({ x: -100, y: -100 });
  }, []);

  return (
    <section id="home" className="hero-section">
      <div
        className={`hero-card ${isInHero ? 'hero-card--custom-cursor' : ''}`}
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >

        {/* ---- VIDEO BACKGROUND (fills the entire card) ---- */}
        <div className="hero-video-bg">
          <video
            src="/Hero_Section_Video.mp4"
            autoPlay
            loop
            muted
            playsInline
            disablePictureInPicture
            controls={false}
          />
        </div>

        {/* Warm gradient overlay for text readability */}
        <div className="hero-video-overlay" />

        {/* ---- NAVBAR (inside the card, on top of video) ---- */}
        <Navbar />

        {/* ---- FLOATING GLASS BUBBLES ---- */}
        <div className="hero-bubble hero-bubble--1" />
        <div className="hero-bubble hero-bubble--2" />
        <div className="hero-bubble hero-bubble--3" />
        <div className="hero-bubble hero-bubble--4" />
        <div className="hero-bubble hero-bubble--5" />

        {/* ---- TRAILING BUBBLE that follows cursor ---- */}
        {isInHero && (
          <div
            className="hero-cursor-bubble"
            style={{
              left: `${cursorPos.x}px`,
              top: `${cursorPos.y}px`,
            }}
          />
        )}

        {/* ---- RIGHT SIDE TEXT CONTENT ---- */}
        <div className="hero-content">
          <div className="hero-text-column">
            <div className="hero-chip">
              <span>Ronal Svefiit</span>
              <span className="hero-chip-arrow">→</span>
            </div>

            <h1 className="hero-title">
              <span className="hero-title-line">BINA</span>
              <span className="hero-title-line">CODES</span>
            </h1>

            <p className="hero-desc">
              Leading the next platform enabling every single design,
              creating solutions for your results, and transforming your
              outcomes, delivering solutions and coding, with a
              truly modern experience.
            </p>

            <a href="#services" className="btn-hero-cta">Learn More</a>
          </div>
        </div>

      </div>
    </section>
  );
}
