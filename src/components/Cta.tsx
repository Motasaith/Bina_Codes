import '../styles/Cta.css';

export default function Cta() {
  return (
    <section className="cta-section">
      <div className="container">
        <div className="cta-content">
          <p className="cta-tagline">Start Your Journey</p>
          <a href="#contact" className="pebble-btn-link">
            <button className="pebble-btn">
              <span className="pebble-btn-text">Build Together</span>
            </button>
          </a>
        </div>
      </div>
    </section>
  );
}
