import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import '../styles/LoadingScreen.css';

interface LoadingScreenProps {
  onComplete: () => void;
}

export default function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const sandLayer1Ref = useRef<HTMLDivElement>(null);
  const sandLayer2Ref = useRef<HTMLDivElement>(null);
  const sandLayer3Ref = useRef<HTMLDivElement>(null);
  const dustRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Generate random sand particles
    const generateParticles = (layer: HTMLDivElement, count: number, sizeRange: [number, number], speedRange: [number, number]) => {
      for (let i = 0; i < count; i++) {
        const p = document.createElement('div');
        p.className = 'sand-particle';
        const size = sizeRange[0] + Math.random() * (sizeRange[1] - sizeRange[0]);
        p.style.width = `${size}px`;
        p.style.height = `${size}px`;
        p.style.left = `${Math.random() * 100}%`;
        p.style.top = `${Math.random() * 100}%`;
        p.style.animationDelay = `${Math.random() * 5}s`;
        p.style.animationDuration = `${speedRange[0] + Math.random() * (speedRange[1] - speedRange[0])}s`;
        p.style.opacity = `${0.3 + Math.random() * 0.5}`;
        layer.appendChild(p);
      }
    };

    if (sandLayer1Ref.current) generateParticles(sandLayer1Ref.current, 40, [2, 6], [3, 6]);
    if (sandLayer2Ref.current) generateParticles(sandLayer2Ref.current, 30, [4, 10], [5, 9]);
    if (sandLayer3Ref.current) generateParticles(sandLayer3Ref.current, 20, [8, 16], [7, 12]);

    // Generate dust clouds
    if (dustRef.current) {
      for (let i = 0; i < 8; i++) {
        const cloud = document.createElement('div');
        cloud.className = 'dust-cloud';
        cloud.style.left = `${Math.random() * 100}%`;
        cloud.style.top = `${20 + Math.random() * 60}%`;
        cloud.style.animationDelay = `${Math.random() * 4}s`;
        cloud.style.animationDuration = `${6 + Math.random() * 6}s`;
        dustRef.current.appendChild(cloud);
      }
    }

    // Simulate loading progress
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + Math.random() * 15 + 5;
      });
    }, 200);

    // Entrance animation
    const tl = gsap.timeline();

    tl.fromTo(
      [sandLayer1Ref.current, sandLayer2Ref.current, sandLayer3Ref.current],
      { opacity: 0, x: -50 },
      { opacity: 1, x: 0, duration: 1.2, stagger: 0.2, ease: 'power2.out' }
    );

    tl.fromTo(
      logoRef.current,
      { opacity: 0, scale: 0.8, y: 20 },
      { opacity: 1, scale: 1, y: 0, duration: 0.8, ease: 'back.out(1.7)' },
      '-=0.6'
    );

    tl.fromTo(
      progressRef.current,
      { opacity: 0, width: '0%' },
      { opacity: 1, width: '100%', duration: 0.5, ease: 'power2.out' },
      '-=0.3'
    );

    return () => {
      clearInterval(progressInterval);
      tl.kill();
    };
  }, []);

  // Exit animation when loading completes
  useEffect(() => {
    if (progress >= 100) {
      const tl = gsap.timeline({
        onComplete: () => {
          onComplete();
        },
      });

      tl.to(logoRef.current, {
        opacity: 0,
        scale: 1.1,
        duration: 0.4,
        ease: 'power2.in',
      });

      tl.to(
        [sandLayer3Ref.current, sandLayer2Ref.current, sandLayer1Ref.current],
        {
          opacity: 0,
          x: 100,
          duration: 0.6,
          stagger: 0.1,
          ease: 'power2.in',
        },
        '-=0.2'
      );

      tl.to(
        containerRef.current,
        {
          opacity: 0,
          duration: 0.4,
          ease: 'power2.in',
        },
        '-=0.2'
      );

      return () => {
        tl.kill();
      };
    }
  }, [progress, onComplete]);

  const clampedProgress = Math.min(progress, 100);

  return (
    <div ref={containerRef} className="loading-screen">
      {/* Background gradient */}
      <div className="loading-bg" />

      {/* Sand layers */}
      <div ref={sandLayer1Ref} className="sand-layer sand-layer-1" />
      <div ref={sandLayer2Ref} className="sand-layer sand-layer-2" />
      <div ref={sandLayer3Ref} className="sand-layer sand-layer-3" />

      {/* Dust clouds */}
      <div ref={dustRef} className="dust-container" />

      {/* Wind streaks */}
      <div className="wind-streaks">
        {Array.from({ length: 12 }).map((_, i) => (
          <div
            key={i}
            className="wind-streak"
            style={{
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${1.5 + Math.random() * 2}s`,
              width: `${60 + Math.random() * 120}px`,
              opacity: 0.1 + Math.random() * 0.2,
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div ref={logoRef} className="loading-content">
        <div className="loading-logo">
          <span className="loading-logo-icon">🏜️</span>
          <h1 className="loading-logo-text">Bina Codes</h1>
        </div>
        <p className="loading-tagline">Rising from the sands of South Punjab</p>

        {/* Progress bar */}
        <div className="loading-progress-container">
          <div
            ref={progressRef}
            className="loading-progress-bar"
            style={{ width: `${clampedProgress}%` }}
          />
        </div>
        <span className="loading-percentage">{Math.round(clampedProgress)}%</span>
      </div>
    </div>
  );
}
