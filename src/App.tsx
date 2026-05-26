import Hero from './components/Hero';
import Services from './components/Services';
import About from './components/About';
import Contact from './components/Contact';
import Cta from './components/Cta';
import Footer from './components/Footer';

export default function App() {
  return (
    <>
      <main>
        <Hero />
        <Services />
        <div className="combined-sections-bg">
          <div className="combined-sections-bg-image"></div>
          <About />
          <Contact />
        </div>
        <Cta />
      </main>
      <Footer />
    </>
  );
}
