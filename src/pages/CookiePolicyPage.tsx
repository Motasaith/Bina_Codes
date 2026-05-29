import { useEffect } from 'react';
import '../styles/LegalPage.css';

export default function CookiePolicyPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="legal-page">
      <section className="legal-page-hero">
        <div className="legal-page-hero-overlay"></div>
        <div className="legal-hero-content">
          <span className="legal-page-tag">Legal</span>
          <h1 className="legal-page-title">Cookie Policy</h1>
          <p className="legal-page-subtitle">Last updated: May 29, 2026</p>
        </div>
      </section>

      <div className="legal-container">
        <div className="legal-toc">
          <h3>Table of Contents</h3>
          <ul>
            <li><a href="#what-are">1. What Are Cookies</a></li>
            <li><a href="#how-we-use">2. How We Use Cookies</a></li>
            <li><a href="#types">3. Types of Cookies We Use</a></li>
            <li><a href="#third-party">4. Third-Party Cookies</a></li>
            <li><a href="#managing">5. Managing Your Preferences</a></li>
            <li><a href="#changes">6. Changes to This Policy</a></li>
            <li><a href="#contact">7. Contact Us</a></li>
          </ul>
        </div>

        <div className="legal-content">
          <section id="what-are">
            <h2>1. What Are Cookies</h2>
            <p>
              Cookies are small text files that are placed on your device when you visit a website. They are widely used to make websites work more efficiently, as well as to provide information to the site owners. Cookies can be “session cookies” (deleted when you close your browser) or “persistent cookies” (remain on your device for a set period or until you delete them).
            </p>
            <p>
              In addition to cookies, we may use other similar technologies such as local storage, session storage, and pixel tags to achieve similar purposes.
            </p>
          </section>

          <section id="how-we-use">
            <h2>2. How We Use Cookies</h2>
            <p>Bina Codes uses cookies for the following purposes:</p>
            <ul>
              <li>To enable core website functionality and navigation</li>
              <li>To remember your preferences and settings</li>
              <li>To analyze how visitors use our website and improve performance</li>
              <li>To deliver relevant marketing content and measure campaign effectiveness</li>
              <li>To detect and prevent fraud and security issues</li>
            </ul>
          </section>

          <section id="types">
            <h2>3. Types of Cookies We Use</h2>
            <h3>3.1 Essential Cookies</h3>
            <p>
              These cookies are necessary for the website to function properly. They enable basic features like page navigation, secure areas, and access to protected content. The website cannot function properly without these cookies.
            </p>
            <table className="legal-table">
              <thead>
                <tr>
                  <th>Cookie Name</th>
                  <th>Purpose</th>
                  <th>Duration</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>bc_session</td>
                  <td>Maintains your session state across page views</td>
                  <td>Session</td>
                </tr>
                <tr>
                  <td>bc_csrf</td>
                  <td>Prevents cross-site request forgery attacks</td>
                  <td>Session</td>
                </tr>
              </tbody>
            </table>

            <h3>3.2 Analytics Cookies</h3>
            <p>
              These cookies help us understand how visitors interact with our website by collecting and reporting information anonymously. We use this data to improve site structure, content, and user experience.
            </p>
            <table className="legal-table">
              <thead>
                <tr>
                  <th>Cookie / Provider</th>
                  <th>Purpose</th>
                  <th>Duration</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>_ga (Google Analytics)</td>
                  <td>Distinguishes unique users and tracks sessions</td>
                  <td>2 years</td>
                </tr>
                <tr>
                  <td>_gid (Google Analytics)</td>
                  <td>Distinguishes users for 24 hours</td>
                  <td>24 hours</td>
                </tr>
                <tr>
                  <td>_gat (Google Analytics)</td>
                  <td>Throttles request rate to analytics servers</td>
                  <td>1 minute</td>
                </tr>
              </tbody>
            </table>

            <h3>3.3 Marketing Cookies</h3>
            <p>
              These cookies are used to track visitors across websites. The intention is to display ads that are relevant and engaging for the individual user.
            </p>
            <table className="legal-table">
              <thead>
                <tr>
                  <th>Cookie / Provider</th>
                  <th>Purpose</th>
                  <th>Duration</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>_fbp (Meta/Facebook)</td>
                  <td>Delivers advertisements when on Facebook or digital platforms</td>
                  <td>3 months</td>
                </tr>
                <tr>
                  <td>_lidc (LinkedIn)</td>
                  <td>Stores consent and routing information from LinkedIn</td>
                  <td>1 day</td>
                </tr>
              </tbody>
            </table>

            <h3>3.4 Preference Cookies</h3>
            <p>
              These cookies remember choices you make (such as language or region) to provide enhanced, more personalized features.
            </p>
          </section>

          <section id="third-party">
            <h2>4. Third-Party Cookies</h2>
            <p>
              We may allow third-party service providers to place cookies on your device for the purposes described above. These providers include:
            </p>
            <ul>
              <li><strong>Google Analytics:</strong> For website traffic analysis. See <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer">Google's Privacy Policy</a>.</li>
              <li><strong>Meta (Facebook):</strong> For advertising and retargeting. See <a href="https://www.facebook.com/policy.php" target="_blank" rel="noopener noreferrer">Meta's Data Policy</a>.</li>
              <li><strong>LinkedIn:</strong> For professional networking and B2B marketing. See <a href="https://www.linkedin.com/legal/privacy-policy" target="_blank" rel="noopener noreferrer">LinkedIn's Privacy Policy</a>.</li>
            </ul>
            <p>
              We do not control these third-party cookies. Please review the respective privacy policies for more information.
            </p>
          </section>

          <section id="managing">
            <h2>5. Managing Your Preferences</h2>
            <p>You can control and manage cookies in the following ways:</p>
            <ul>
              <li><strong>Browser Settings:</strong> Most browsers allow you to refuse or delete cookies. Visit your browser's help menu for instructions.</li>
              <li><strong>Opt-Out Tools:</strong> You can opt out of Google Analytics using the <a href="https://tools.google.com/dlpage/gaoptout" target="_blank" rel="noopener noreferrer">Google Analytics Opt-Out Browser Add-on</a>.</li>
              <li><strong>Industry Initiatives:</strong> Visit <a href="http://www.aboutads.info/choices/" target="_blank" rel="noopener noreferrer">Your Online Choices</a> or <a href="http://www.youronlinechoices.eu/" target="_blank" rel="noopener noreferrer">Your Ad Choices</a> for more control over interest-based advertising.</li>
            </ul>
            <p>
              Please note that disabling certain cookies may affect the functionality and user experience of our website.
            </p>
          </section>

          <section id="changes">
            <h2>6. Changes to This Policy</h2>
            <p>
              We may update this Cookie Policy from time to time to reflect changes in technology, regulation, or our business practices. The updated policy will be posted on this page with a revised “Last updated” date.
            </p>
          </section>

          <section id="contact">
            <h2>7. Contact Us</h2>
            <p>If you have any questions about our use of cookies, please contact us:</p>
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
