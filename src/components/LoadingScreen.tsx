import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import '../styles/LoadingScreen.css';

interface LoadingScreenProps {
  onComplete: () => void;
}

// Videos that must be ready before we reveal the site
const CRITICAL_VIDEOS = [
  '/Hero_Section_Video.mp4',
  '/footer.mp4',
];

const MIN_LOADING_TIME_MS = 3500; // Minimum time loading screen stays visible
const PROGRESS_TICK_MS = 120;    // Slower tick for smoother feel

export default function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const sandLayer1Ref = useRef<HTMLDivElement>(null);
  const sandLayer2Ref = useRef<HTMLDivElement>(null);
  const sandLayer3Ref = useRef<HTMLDivElement>(null);
  const dustRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  const [statusText, setStatusText] = useState('Preparing your experience...');
  const startTimeRef = useRef<number>(Date.now());
  const videosReadyRef = useRef<boolean[]>(new Array(CRITICAL_VIDEOS.length).fill(false));
  const hasExitedRef = useRef(false);
  const progressValueRef = useRef(0);

  // Track video loading progress
  useEffect(() => {
    const cleanupFns: (() => void)[] = [];

    CRITICAL_VIDEOS.forEach((src, index) => {
      const video = document.createElement('video');
      video.src = src;
      video.preload = 'auto';
      video.muted = true;
      video.playsInline = true;
      video.style.position = 'absolute';
      video.style.opacity = '0';
      video.style.pointerEvents = 'none';
      video.style.width = '1px';
      video.style.height = '1px';
      document.body.appendChild(video);

      const onCanPlay = () => {
        videosReadyRef.current[index] = true;
        setStatusText('Almost there...');
      };

      const onError = () => {
        videosReadyRef.current[index] = true;
      };

      video.addEventListener('canplaythrough', onCanPlay, { once: true });
      video.addEventListener('error', onError, { once: true });
      video.load();

      cleanupFns.push(() => {
        video.removeEventListener('canplaythrough', onCanPlay);
        video.removeEventListener('error', onError);
        video.pause();
        video.src = '';
        video.load();
        if (video.parentNode) video.parentNode.removeChild(video);
      });
    });

    return () => {
      cleanupFns.forEach((fn) => fn());
    };
  }, []);

  // Simulate loading progress and trigger exit when complete
  useEffect(() => {
    const progressInterval = setInterval(() => {
      progressValueRef.current += Math.random() * 6 + 2;
      const next = Math.min(progressValueRef.current, 100);
      setProgress(next);

      if (next < 30) setStatusText('Loading assets...');
      else if (next < 60) setStatusText('Buffering videos...');
      else if (next < 85) setStatusText('Optimizing for your connection...');
      else if (next < 98) setStatusText('Finalizing...');

      if (next >= 100 && !hasExitedRef.current) {
        clearInterval(progressInterval);
        hasExitedRef.current = true;
        setStatusText('Welcome to Bina Codes');

        const elapsed = Date.now() - startTimeRef.current;
        const remaining = Math.max(0, MIN_LOADING_TIME_MS - elapsed);

        const tl = gsap.timeline({
          delay: 0.4 + remaining / 1000,
          onComplete: () => {
            onComplete();
          },
        });

        tl.to(logoRef.current, {
          opacity: 0,
          scale: 1.1,
          duration: 0.5,
          ease: 'power2.in',
        });

        tl.to(
          [sandLayer3Ref.current, sandLayer2Ref.current, sandLayer1Ref.current],
          {
            opacity: 0,
            x: 100,
            duration: 0.7,
            stagger: 0.12,
            ease: 'power2.in',
          },
          '-=0.3'
        );

        tl.to(
          containerRef.current,
          {
            opacity: 0,
            duration: 0.5,
            ease: 'power2.in',
          },
          '-=0.3'
        );
      }
    }, PROGRESS_TICK_MS);

    return () => clearInterval(progressInterval);
  }, [onComplete]);

  // Entrance animation
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

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
      tl.kill();
    };
  }, []);

  // Fallback: force completion after max time even if videos stall
  useEffect(() => {
    const maxWait = setTimeout(() => {
      if (!hasExitedRef.current) {
        hasExitedRef.current = true;
        setProgress(100);
        setStatusText('Welcome to Bina Codes');

        const tl = gsap.timeline({
          delay: 0.3,
          onComplete: () => {
            onComplete();
          },
        });

        tl.to(logoRef.current, { opacity: 0, scale: 1.1, duration: 0.5, ease: 'power2.in' });
        tl.to(
          [sandLayer3Ref.current, sandLayer2Ref.current, sandLayer1Ref.current],
          { opacity: 0, x: 100, duration: 0.7, stagger: 0.12, ease: 'power2.in' },
          '-=0.3'
        );
        tl.to(containerRef.current, { opacity: 0, duration: 0.5, ease: 'power2.in' }, '-=0.3');
      }
    }, 15000);

    return () => clearTimeout(maxWait);
  }, [onComplete]);

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
        <p className="loading-status">{statusText}</p>

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
