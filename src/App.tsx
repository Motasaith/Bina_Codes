import { useEffect, useRef, useState } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Manifesto from './components/Manifesto';
import Services from './components/Services';
import Process from './components/Process';
import TechStack from './components/TechStack';
import Testimonials from './components/Testimonials';
import Contact from './components/Contact';
import Footer from './components/Footer';
import LoadingScreen from './components/LoadingScreen';

// Pages
import ServicesPage from './pages/ServicesPage';
import QuotePage from './pages/QuotePage';
import AboutPage from './pages/AboutPage';
import CareersPage from './pages/CareersPage';
import BlogPage from './pages/BlogPage';
import PrivacyPolicyPage from './pages/PrivacyPolicyPage';
import TermsOfServicePage from './pages/TermsOfServicePage';
import CookiePolicyPage from './pages/CookiePolicyPage';

gsap.registerPlugin(ScrollTrigger);

// Helper component to handle scrolling to hash elements and top of page on route change
function ScrollToHash() {
  const { hash, pathname } = useLocation();

  useEffect(() => {
    if (hash) {
      const id = hash.replace('#', '');
      const timer = setTimeout(() => {
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
      return () => clearTimeout(timer);
    } else {
      window.scrollTo(0, 0);
    }
  }, [hash, pathname]);

  useEffect(() => {
    // Recalculate ScrollTrigger positions on route changes
    ScrollTrigger.refresh();
  }, [hash, pathname]);

  return null;
}

export default function App() {
  const progressRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(true);

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
      {isLoading && <LoadingScreen onComplete={() => setIsLoading(false)} />}

      <ScrollToHash />

      {/* Scroll Progress Bar */}
      <div
        ref={progressRef}
        className="no-print"
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

      <div className="no-print">
        <Navbar />
      </div>

      <Routes>
        <Route
          path="/"
          element={
            <main>
              <Hero />
              <Manifesto />
              <Services />
              <Process />
              <TechStack />
              <Testimonials />
              <Contact />
            </main>
          }
        />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/quote" element={<QuotePage />} />
        <Route path="/careers" element={<CareersPage />} />
        <Route path="/blog" element={<BlogPage />} />
        <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
        <Route path="/terms-of-service" element={<TermsOfServicePage />} />
        <Route path="/cookie-policy" element={<CookiePolicyPage />} />
      </Routes>

      <div className="no-print">
        <Footer />
      </div>
    </>
  );
}
