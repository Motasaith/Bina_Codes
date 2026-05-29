import { useEffect } from 'react';
import '../styles/LegalPage.css';

export default function TermsOfServicePage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="legal-page">
      <section className="legal-page-hero">
        <div className="legal-page-hero-overlay"></div>
        <div className="legal-hero-content">
          <span className="legal-page-tag">Legal</span>
          <h1 className="legal-page-title">Terms of Service</h1>
          <p className="legal-page-subtitle">Last updated: May 29, 2026</p>
        </div>
      </section>

      <div className="legal-container">
        <div className="legal-toc">
          <h3>Table of Contents</h3>
          <ul>
            <li><a href="#acceptance">1. Acceptance of Terms</a></li>
            <li><a href="#services">2. Description of Services</a></li>
            <li><a href="#accounts">3. User Accounts</a></li>
            <li><a href="#quotes">4. Quotes & Payments</a></li>
            <li><a href="#intellectual">5. Intellectual Property</a></li>
            <li><a href="#confidentiality">6. Confidentiality</a></li>
            <li><a href="#liability">7. Limitation of Liability</a></li>
            <li><a href="#warranty">8. Warranty Disclaimer</a></li>
            <li><a href="#termination">9. Termination</a></li>
            <li><a href="#governing">10. Governing Law & Disputes</a></li>
            <li><a href="#changes">11. Changes to Terms</a></li>
            <li><a href="#contact">12. Contact Information</a></li>
          </ul>
        </div>

        <div className="legal-content">
          <section id="acceptance">
            <h2>1. Acceptance of Terms</h2>
            <p>
              By accessing or using the services of Bina Codes (“Company,” “we,” “us,” or “our”), you agree to be bound by these Terms of Service (“Terms”). If you do not agree to these Terms, you may not use our services.
            </p>
            <p>
              These Terms constitute a legally binding agreement between you and Bina Codes, a software engineering company operating from Rahim Yar Khan, Punjab, Pakistan. We reserve the right to update or modify these Terms at any time without prior notice. Your continued use of our services after any changes indicates your acceptance of the revised Terms.
            </p>
          </section>

          <section id="services">
            <h2>2. Description of Services</h2>
            <p>Bina Codes provides the following services:</p>
            <ul>
              <li>Custom software development (web, mobile, and desktop applications)</li>
              <li>UI/UX design and prototyping</li>
              <li>Cloud infrastructure setup and DevOps consulting</li>
              <li>AI/ML system integration and chatbot development</li>
              <li>Website development (WordPress, Shopify, custom CMS)</li>
              <li>SEO, digital marketing, and automation services</li>
              <li>Maintenance, support, and ongoing retainer agreements</li>
            </ul>
            <p>
              All services are provided on a project basis or through ongoing retainer agreements as specified in individual Statements of Work (SOW) or contracts.
            </p>
          </section>

          <section id="accounts">
            <h2>3. User Accounts</h2>
            <p>To access certain features, you may need to create an account. You agree to:</p>
            <ul>
              <li>Provide accurate, current, and complete information during registration</li>
              <li>Maintain the security of your account credentials</li>
              <li>Notify us immediately of any unauthorized access or security breach</li>
              <li>Be responsible for all activities that occur under your account</li>
            </ul>
            <p>We reserve the right to suspend or terminate accounts that violate these Terms or engage in fraudulent, abusive, or illegal activity.</p>
          </section>

          <section id="quotes">
            <h2>4. Quotes & Payments</h2>
            <h3>4.1 Quotes</h3>
            <p>
              All quotes generated through our website or provided in writing are valid for 30 days unless otherwise stated. Quotes are estimates based on the scope described at the time of quotation. Any changes to scope may result in revised pricing.
            </p>
            <h3>4.2 Payment Terms</h3>
            <ul>
              <li>A deposit of 50% is required before project commencement unless otherwise agreed in writing.</li>
              <li>Remaining balance is due upon project completion or according to the milestone schedule in the SOW.</li>
              <li>Retainer clients are billed monthly in advance.</li>
              <li>Late payments may incur a service charge of 1.5% per month on the outstanding balance.</li>
            </ul>
            <h3>4.3 Refunds</h3>
            <p>
              Deposits are non-refundable once work has commenced. If we are unable to deliver the agreed scope due to our own fault, we will provide a proportional refund of the undelivered portion. Refund requests must be submitted in writing within 14 days of the issue.
            </p>
          </section>

          <section id="intellectual">
            <h2>5. Intellectual Property</h2>
            <h3>5.1 Client Materials</h3>
            <p>
              You retain all rights to any content, branding, logos, or materials you provide to us for use in your project. You grant us a limited license to use these materials solely for the purpose of delivering the agreed services.
            </p>
            <h3>5.2 Deliverables</h3>
            <p>
              Upon full payment, ownership of the final deliverables (source code, designs, documentation) is transferred to you, except for:
            </p>
            <ul>
              <li>Third-party libraries, frameworks, or plugins (governed by their respective licenses)</li>
              <li>Our proprietary tools, internal utilities, or reusable components (we retain ownership but grant you a perpetual license to use them within the project)</li>
              <li>Pre-existing intellectual property we bring to the engagement</li>
            </ul>
            <h3>5.3 Portfolio Rights</h3>
            <p>
              Unless explicitly prohibited in writing, we reserve the right to display completed work in our portfolio, case studies, and marketing materials. We will respect any confidentiality or non-disclosure agreements.
            </p>
          </section>

          <section id="confidentiality">
            <h2>6. Confidentiality</h2>
            <p>
              We treat all client information, business data, and project details as confidential. Our team is bound by confidentiality obligations. We will not disclose your proprietary information to third parties except as necessary to deliver the services (e.g., to hosting providers or payment processors) or as required by law.
            </p>
            <p>
              If you require enhanced confidentiality protection, we can execute a separate Non-Disclosure Agreement (NDA) upon request.
            </p>
          </section>

          <section id="liability">
            <h2>7. Limitation of Liability</h2>
            <p>
              To the maximum extent permitted by applicable law, Bina Codes and its directors, employees, partners, and affiliates shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including but not limited to loss of profits, data, goodwill, or other intangible losses, resulting from:
            </p>
            <ul>
              <li>Your use of or inability to use our services</li>
              <li>Any unauthorized access to or alteration of your data</li>
              <li>Statements or conduct of any third party on our platform</li>
              <li>Any bugs, viruses, or harmful code transmitted through our services</li>
            </ul>
            <p>
              Our total liability for any claim arising out of or relating to these Terms or our services shall not exceed the total amount you paid to us in the 12 months preceding the claim.
            </p>
          </section>

          <section id="warranty">
            <h2>8. Warranty Disclaimer</h2>
            <p>
              Our services are provided on an “as is” and “as available” basis without warranties of any kind, either express or implied, including but not limited to warranties of merchantability, fitness for a particular purpose, or non-infringement.
            </p>
            <p>
              We do not warrant that our services will be uninterrupted, timely, secure, or error-free. We provide a warranty period of 30 days after delivery for bug fixes related to the agreed scope. This does not cover issues caused by third-party services, client modifications, or changes in requirements.
            </p>
          </section>

          <section id="termination">
            <h2>9. Termination</h2>
            <p>Either party may terminate the engagement:</p>
            <ul>
              <li><strong>By Client:</strong> With 14 days written notice. You remain liable for all work completed up to the termination date.</li>
              <li><strong>By Us:</strong> If you breach these Terms, fail to make payments, or engage in conduct that harms our business or reputation. We will provide 7 days notice where feasible.</li>
            </ul>
            <p>Upon termination, we will deliver all completed work and any materials you have paid for. All outstanding fees become immediately due.</p>
          </section>

          <section id="governing">
            <h2>10. Governing Law & Disputes</h2>
            <p>
              These Terms shall be governed by and construed in accordance with the laws of the Islamic Republic of Pakistan. Any dispute arising out of or in connection with these Terms shall first be attempted to be resolved through good-faith negotiation.
            </p>
            <p>
              If negotiation fails, disputes shall be resolved through arbitration in Rahim Yar Khan, Pakistan, under the Arbitration Act, 1940. The arbitration shall be conducted in English. The decision of the arbitrator shall be final and binding.
            </p>
            <p>
              Nothing in this section shall prevent either party from seeking injunctive or other equitable relief in a court of competent jurisdiction.
            </p>
          </section>

          <section id="changes">
            <h2>11. Changes to Terms</h2>
            <p>
              We may revise these Terms at any time by updating this page. The updated Terms will be effective immediately upon posting. We encourage you to review this page periodically. Your continued use of our services after changes constitutes acceptance of the revised Terms.
            </p>
          </section>

          <section id="contact">
            <h2>12. Contact Information</h2>
            <p>If you have any questions about these Terms, please contact us:</p>
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
