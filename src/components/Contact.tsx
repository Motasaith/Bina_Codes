import React, { useState } from 'react';
import '../styles/Contact.css';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    projectType: 'custom-software',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate submission
    if (formData.name && formData.email && formData.message) {
      setIsSubmitted(true);
      // Reset form
      setFormData({
        name: '',
        email: '',
        projectType: 'custom-software',
        message: ''
      });
      // Clear message after 5 seconds
      setTimeout(() => {
        setIsSubmitted(false);
      }, 5000);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <section id="contact" className="contact-section">
      <div className="container">
        <div className="contact-grid">
          
          {/* Left panel: Info */}
          <div className="contact-info">
            <span className="contact-tagline">Connect</span>
            <h2 className="contact-title">Let’s engineer your next digital solution.</h2>
            <p className="contact-desc">
              Ready to start your project or need advanced consulting on server configurations? 
              Reach out and our principal architect will schedule a briefing.
            </p>
            
            <div className="contact-details">
              <div className="contact-detail-item">
                <div className="contact-icon-box">
                  <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                    <polyline points="22,6 12,13 2,6" />
                  </svg>
                </div>
                <div className="contact-detail-text">
                  <span className="contact-detail-label">Email Us</span>
                  <a href="mailto:operations@binacodes.com" className="contact-detail-value">operations@binacodes.com</a>
                </div>
              </div>

              <div className="contact-detail-item">
                <div className="contact-icon-box">
                  <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                  </svg>
                </div>
                <div className="contact-detail-text">
                  <span className="contact-detail-label">Call Operations</span>
                  <a href="tel:+15559021845" className="contact-detail-value">+1 (555) 902-1845</a>
                </div>
              </div>

              <div className="contact-detail-item">
                <div className="contact-icon-box">
                  <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                </div>
                <div className="contact-detail-text">
                  <span className="contact-detail-label">Office Headquarters</span>
                  <span className="contact-detail-value">Silicon Dune Boulevard, Suite 400</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right panel: Glassmorphism Form Card */}
          <div className="contact-form-card">
            {isSubmitted ? (
              <div className="form-success-msg">
                <h3>Message Received!</h3>
                <p style={{ marginTop: '0.5rem', fontWeight: 400 }}>Thank you for reaching out. A systems architect from our team will contact you shortly.</p>
              </div>
            ) : (
              <form className="contact-form" onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="name" className="form-label">Full Name</label>
                  <input 
                    type="text" 
                    id="name"
                    name="name" 
                    className="form-input" 
                    placeholder="Enter your name" 
                    value={formData.name}
                    onChange={handleInputChange}
                    required 
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="email" className="form-label">Email Address</label>
                  <input 
                    type="email" 
                    id="email"
                    name="email" 
                    className="form-input" 
                    placeholder="operations@example.com" 
                    value={formData.email}
                    onChange={handleInputChange}
                    required 
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="projectType" className="form-label">Project Type</label>
                  <select 
                    id="projectType"
                    name="projectType" 
                    className="form-select"
                    value={formData.projectType}
                    onChange={handleInputChange}
                  >
                    <option value="custom-software">Custom Software Engineering</option>
                    <option value="cloud-servers">Cloud Server Operations</option>
                    <option value="ai-integration">AI Integration & Data Science</option>
                    <option value="interactive-design">Premium Interactive Web Design</option>
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="message" className="form-label">Project Brief / Details</label>
                  <textarea 
                    id="message"
                    name="message" 
                    className="form-textarea" 
                    placeholder="Describe your goals, requirements, or architecture queries..." 
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                  ></textarea>
                </div>

                <button type="submit" className="btn-form-submit">Send Inquiry</button>
              </form>
            )}
          </div>

        </div>
      </div>
    </section>
  );
}
