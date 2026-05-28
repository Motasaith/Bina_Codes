import { useEffect, useRef } from 'react';
import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import Hero from './components/Hero';
import Manifesto from './components/Manifesto';
import Services from './components/Services';
import Process from './components/Process';
import TechStack from './components/TechStack';
import Testimonials from './components/Testimonials';
import Contact from './components/Contact';
import Footer from './components/Footer';

gsap.registerPlugin(ScrollTrigger);

export default function App() {
  const progressRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const lenis = new Lenis({
      lerp: 0.1,
      smoothWheel: true,
    });

    lenis.on('scroll', ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);

    // Scroll progress bar
    if (progressRef.current) {
      gsap.to(progressRef.current, {
        scaleX: 1,
        ease: 'none',
        scrollTrigger: {
          trigger: document.body,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 0.3,
        },
      });
    }

    return () => {
      lenis.destroy();
      ScrollTrigger.getAll().forEach((t) => t.kill());
      gsap.ticker.remove(lenis.raf as any);
    };
  }, []);

  return (
    <>
      {/* Scroll Progress Bar */}
      <div
        ref={progressRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '3px',
          background: 'linear-gradient(90deg, var(--color-accent-gold), var(--color-accent-gold-hover))',
          transformOrigin: 'left',
          transform: 'scaleX(0)',
          zIndex: 9999,
          pointerEvents: 'none',
        }}
      />

      <main>
        <Hero />
        <Manifesto />
        <Services />
        <Process />
        <TechStack />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
