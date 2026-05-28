import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import '../styles/Contact.css';

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: 'general',
    message: '',
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const formElements = section.querySelectorAll('.contact-form-element');
    gsap.fromTo(
      formElements,
      { opacity: 0, x: -40 },
      {
        opacity: 1,
        x: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: section,
          start: 'top 60%',
          end: 'top 30%',
          scrub: 1,
        },
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = 'Invalid email';
    if (!formData.message.trim()) newErrors.message = 'Message is required';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({ name: '', email: '', subject: 'general', message: '' });
    }, 5000);
  };

  return (
    <section ref={sectionRef} id="contact" className="contact-section">
      <div className="contact-header">
        <span className="contact-tag">Get in Touch</span>
        <h2 className="contact-title">Start the Conversation</h2>
      </div>

      <div className="contact-grid">
        <div className="contact-form-col">
          {isSubmitted ? (
            <div className="contact-success">
              <div className="contact-success-icon">✓</div>
              <h3>Message Sent!</h3>
              <p>We'll get back to you within 24 hours.</p>
            </div>
          ) : (
            <form className="contact-form" onSubmit={handleSubmit}>
              <div className="contact-form-element">
                <label htmlFor="name">Name</label>
                <input
                  id="name"
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Your name"
                  className={errors.name ? 'input-error' : ''}
                />
                {errors.name && <span className="error-text">{errors.name}</span>}
              </div>

              <div className="contact-form-element">
                <label htmlFor="email">Email</label>
                <input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="your@email.com"
                  className={errors.email ? 'input-error' : ''}
                />
                {errors.email && <span className="error-text">{errors.email}</span>}
              </div>

              <div className="contact-form-element">
                <label htmlFor="subject">Subject</label>
                <select
                  id="subject"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                >
                  <option value="general">General Inquiry</option>
                  <option value="quote">Project Quote</option>
                  <option value="partnership">Partnership</option>
                  <option value="career">Career Opportunity</option>
                </select>
              </div>

              <div className="contact-form-element">
                <label htmlFor="message">Message</label>
                <textarea
                  id="message"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Tell us about your project..."
                  rows={5}
                  className={errors.message ? 'input-error' : ''}
                />
                {errors.message && <span className="error-text">{errors.message}</span>}
              </div>

              <button type="submit" className="contact-submit">
                Send Message →
              </button>
            </form>
          )}

          <div className="contact-details">
            <div className="contact-detail-item">
              <span className="contact-detail-label">Email</span>
              <a href="mailto:binacodex@gmail.com" className="contact-detail-value">binacodex@gmail.com</a>
            </div>
            <div className="contact-detail-item">
              <span className="contact-detail-label">Phone</span>
              <a href="tel:+923363855120" className="contact-detail-value">+92 336-3855120</a>
            </div>
            <div className="contact-detail-item">
              <span className="contact-detail-label">Location</span>
              <span className="contact-detail-value">Rahim Yar Khan, Punjab, Pakistan</span>
            </div>
          </div>
        </div>

        <div className="contact-envelope-col">
          <div className="paper-envelope">
            <div className="envelope-body">
              <div className="envelope-flap"></div>
              <div className="envelope-letter">
                <div className="letter-lines">
                  <div className="letter-line"></div>
                  <div className="letter-line"></div>
                  <div className="letter-line short"></div>
                </div>
              </div>
              <div className="envelope-seal">
                <div className="wax-seal">B</div>
              </div>
            </div>
            <div className="envelope-shadow"></div>
          </div>
        </div>
      </div>
    </section>
  );
}
