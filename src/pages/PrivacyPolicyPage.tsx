import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../styles/LegalPage.css';

export default function PrivacyPolicyPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="legal-page">
      <section className="legal-page-hero">
        <div className="legal-page-hero-overlay"></div>
        <div className="legal-hero-content">
          <span className="legal-page-tag">Legal</span>
          <h1 className="legal-page-title">Privacy Policy</h1>
          <p className="legal-page-subtitle">Last updated: May 29, 2026</p>
        </div>
      </section>

      <div className="legal-container">
        <div className="legal-toc">
          <h3>Table of Contents</h3>
          <ul>
            <li><a href="#introduction">1. Introduction</a></li>
            <li><a href="#data-we-collect">2. Data We Collect</a></li>
            <li><a href="#how-we-use">3. How We Use Your Data</a></li>
            <li><a href="#data-sharing">4. Data Sharing & Disclosure</a></li>
            <li><a href="#data-security">5. Data Security</a></li>
            <li><a href="#your-rights">6. Your Rights</a></li>
            <li><a href="#cookies">7. Cookies & Tracking</a></li>
            <li><a href="#retention">8. Data Retention</a></li>
            <li><a href="#international">9. International Transfers</a></li>
            <li><a href="#children">10. Children's Privacy</a></li>
            <li><a href="#changes">11. Changes to This Policy</a></li>
            <li><a href="#contact">12. Contact Us</a></li>
          </ul>
        </div>

        <div className="legal-content">
          <section id="introduction">
            <h2>1. Introduction</h2>
            <p>
              Bina Codes (“we,” “our,” or “us”) is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website <Link to="/">https://binacodes.com</Link>, use our services, or communicate with us.
            </p>
            <p>
              We operate from Rahim Yar Khan, Punjab, Pakistan, and serve clients globally. By accessing or using our services, you agree to the terms of this Privacy Policy. If you do not agree, please do not use our services.
            </p>
          </section>

          <section id="data-we-collect">
            <h2>2. Data We Collect</h2>
            <p>We may collect the following types of information:</p>
            <h3>2.1 Personal Information</h3>
            <ul>
              <li>Name, email address, phone number, and company name</li>
              <li>Billing and payment information (processed securely via third-party providers)</li>
              <li>Project requirements, descriptions, and uploaded files</li>
              <li>Communication history (emails, chat logs, support tickets)</li>
            </ul>
            <h3>2.2 Technical Information</h3>
            <ul>
              <li>IP address, browser type, and device information</li>
              <li>Operating system and screen resolution</li>
              <li>Pages visited, time spent, and referral sources</li>
              <li>Cookies and similar tracking technologies</li>
            </ul>
            <h3>2.3 Automatically Collected Data</h3>
            <p>
              We use analytics tools and server logs to automatically collect usage data. This helps us improve performance, diagnose issues, and understand user behavior.
            </p>
          </section>

          <section id="how-we-use">
            <h2>3. How We Use Your Data</h2>
            <p>We use your information for the following purposes:</p>
            <ul>
              <li><strong>Service Delivery:</strong> To provide, maintain, and improve our software development and design services.</li>
              <li><strong>Communication:</strong> To respond to inquiries, send project updates, and provide customer support.</li>
              <li><strong>Billing:</strong> To process payments, send invoices, and manage accounts.</li>
              <li><strong>Marketing:</strong> To send newsletters, promotional offers, and company updates (only with your consent).</li>
              <li><strong>Analytics:</strong> To analyze website traffic, measure campaign performance, and improve user experience.</li>
              <li><strong>Security:</strong> To detect fraud, prevent abuse, and protect our systems and users.</li>
              <li><strong>Legal Compliance:</strong> To comply with applicable laws, regulations, and legal processes.</li>
            </ul>
          </section>

          <section id="data-sharing">
            <h2>4. Data Sharing & Disclosure</h2>
            <p>We do not sell your personal information. We may share data with:</p>
            <ul>
              <li><strong>Service Providers:</strong> Trusted third parties who assist in hosting, payment processing, analytics, and email delivery (e.g., Stripe, Google Analytics, Vercel).</li>
              <li><strong>Legal Authorities:</strong> When required by law, court order, or to protect our rights, property, or safety.</li>
              <li><strong>Business Transfers:</strong> In connection with a merger, acquisition, or sale of assets, with notice to affected users.</li>
              <li><strong>With Your Consent:</strong> When you explicitly authorize us to share information.</li>
            </ul>
          </section>

          <section id="data-security">
            <h2>5. Data Security</h2>
            <p>
              We implement industry-standard security measures to protect your data, including:
            </p>
            <ul>
              <li>SSL/TLS encryption for all data in transit</li>
              <li>Secure cloud infrastructure with access controls</li>
              <li>Regular security audits and vulnerability assessments</li>
              <li>Employee training on data protection best practices</li>
            </ul>
            <p>
              While we strive to protect your information, no method of transmission over the internet is 100% secure. We cannot guarantee absolute security.
            </p>
          </section>

          <section id="your-rights">
            <h2>6. Your Rights</h2>
            <p>Depending on your location, you may have the following rights:</p>
            <ul>
              <li><strong>Access:</strong> Request a copy of the personal data we hold about you.</li>
              <li><strong>Correction:</strong> Request that we correct inaccurate or incomplete data.</li>
              <li><strong>Deletion:</strong> Request deletion of your personal data, subject to legal obligations.</li>
              <li><strong>Restriction:</strong> Request that we limit how we use your data.</li>
              <li><strong>Portability:</strong> Request a machine-readable copy of your data.</li>
              <li><strong>Objection:</strong> Object to processing for direct marketing or legitimate interests.</li>
            </ul>
            <p>
              To exercise these rights, contact us at <a href="mailto:binacodex@gmail.com">binacodex@gmail.com</a>. We will respond within 30 days.
            </p>
          </section>

          <section id="cookies">
            <h2>7. Cookies & Tracking</h2>
            <p>
              We use cookies and similar technologies to enhance your experience, analyze traffic, and personalize content. You can manage cookie preferences through your browser settings.
            </p>
            <p>Types of cookies we use:</p>
            <ul>
              <li><strong>Essential:</strong> Required for the website to function (e.g., session management).</li>
              <li><strong>Analytics:</strong> Help us understand how visitors interact with our site.</li>
              <li><strong>Marketing:</strong> Used to deliver relevant advertisements and measure their effectiveness.</li>
            </ul>
          </section>

          <section id="retention">
            <h2>8. Data Retention</h2>
            <p>
              We retain your personal data only as long as necessary for the purposes outlined in this policy, or as required by law. Typically:
            </p>
            <ul>
              <li>Account data: retained for the duration of your relationship with us plus 2 years</li>
              <li>Project files: retained per contractual agreement or up to 5 years for portfolio/reference purposes (with anonymization where possible)</li>
              <li>Marketing data: retained until you unsubscribe or request deletion</li>
              <li>Server logs: retained for 12 months</li>
            </ul>
          </section>

          <section id="international">
            <h2>9. International Transfers</h2>
            <p>
              We are based in Pakistan and may use service providers located in other countries (including the United States, European Union, and Singapore). When we transfer your data internationally, we ensure appropriate safeguards are in place, such as standard contractual clauses or adequacy decisions.
            </p>
          </section>

          <section id="children">
            <h2>10. Children's Privacy</h2>
            <p>
              Our services are not intended for individuals under the age of 16. We do not knowingly collect personal data from children. If you believe we have collected data from a child, please contact us immediately and we will delete it.
            </p>
          </section>

          <section id="changes">
            <h2>11. Changes to This Policy</h2>
            <p>
              We may update this Privacy Policy from time to time. Changes will be posted on this page with an updated “Last updated” date. For significant changes, we will notify you via email or a prominent notice on our website.
            </p>
          </section>

          <section id="contact">
            <h2>12. Contact Us</h2>
            <p>If you have any questions, concerns, or requests regarding this Privacy Policy, please contact us:</p>
            <ul>
              <li><strong>Email:</strong> <a href="mailto:binacodex@gmail.com">binacodex@gmail.com</a></li>
              <li><strong>Phone:</strong> <a href="tel:+923363855120">+92 336-3855120</a></li>
              <li><strong>Address:</strong> Rahim Yar Khan, Punjab, Pakistan</li>
            </ul>
          </section>
        </div>
      </div>
    </div>
  );
}
