import { SERVICES, formatPrice } from '../data/services';
import type { Currency } from '../data/services';
import '../styles/Invoice.css';

interface InvoiceProps {
  invoiceNumber: string;
  clientData: {
    name: string;
    email: string;
    company?: string;
    projectName: string;
    description: string;
    timeline: string;
    techStack?: string;
  };
  selectedServiceIds: string[];
  currency: Currency;
}

export default function Invoice({
  invoiceNumber,
  clientData,
  selectedServiceIds,
  currency,
}: InvoiceProps) {
  const today = new Date();
  const dateStr = today.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });

  // Due date is 7 days from today
  const dueDate = new Date();
  dueDate.setDate(today.getDate() + 7);
  const dueDateStr = dueDate.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });

  // Filter selected services
  const selectedServices = SERVICES.filter((s) => selectedServiceIds.includes(s.id));

  // Calculate total
  const totalPKR = selectedServices.reduce((sum, s) => sum + s.basePricePKR, 0);

  // Format timeline label
  const getTimelineLabel = (timelineValue: string) => {
    switch (timelineValue) {
      case '2-weeks': return 'Express (2 Weeks)';
      case '1-month': return 'Standard (1 Month)';
      case '2-months': return 'Medium (2 Months)';
      case '3-months': return 'Long-Term (3+ Months)';
      default: return timelineValue;
    }
  };

  return (
    <div id="printable-invoice-area" className="invoice-container">
      {/* Brand Header */}
      <div className="invoice-header">
        <div className="invoice-header-left">
          <div className="invoice-brand">
            <span className="invoice-brand-icon">
              <svg viewBox="0 0 24 24" width="28" height="28" fill="currentColor">
                <path d="M12 3L4 9v11h16V9l-8-6zm6 15H6V10l6-4.5 6 4.5v8z" opacity="0.4"/>
                <path d="M12 5.5L6 10v7h12v-7l-6-4.5zM12 8a2 2 0 110 4 2 2 0 010-4z"/>
              </svg>
            </span>
            <span className="invoice-brand-name">Bina Codes</span>
          </div>
          <p className="invoice-brand-tagline">Engineering Digital Futures</p>
          <div className="invoice-company-details">
            <p>Bina Codes Studio</p>
            <p>DHA Phase 6, Lahore, Pakistan</p>
            <p>hello@binacodes.com | www.binacodes.com</p>
            <p>+92 300 1234567</p>
          </div>
        </div>

        <div className="invoice-header-right">
          <div className="invoice-label">ESTIMATE / QUOTE</div>
          <div className="invoice-meta-grid">
            <div className="meta-label">Quote Number:</div>
            <div className="meta-value bold">{invoiceNumber}</div>
            
            <div className="meta-label">Date Issued:</div>
            <div className="meta-value">{dateStr}</div>
            
            <div className="meta-label">Valid Until:</div>
            <div className="meta-value">{dueDateStr}</div>
            
            <div className="meta-label">Status:</div>
            <div className="meta-value"><span className="status-badge-pending">PENDING</span></div>
          </div>
        </div>
      </div>

      {/* Bill To & Project Info */}
      <div className="invoice-details-section">
        <div className="details-col">
          <h3 className="details-section-title">Billed To</h3>
          <div className="details-content">
            <p className="bold client-name-large">{clientData.name}</p>
            {clientData.company && <p className="client-company-txt">{clientData.company}</p>}
            <p>{clientData.email}</p>
            <p>Client ID: BC-CL-{clientData.name.substring(0, 3).toUpperCase()}-{Math.floor(10 + Math.random() * 90)}</p>
          </div>
        </div>

        <div className="details-col">
          <h3 className="details-section-title">Project Summary</h3>
          <div className="details-content">
            <p><span className="label-dim">Project:</span> <span className="bold text-primary-color">{clientData.projectName}</span></p>
            <p><span className="label-dim">Timeline:</span> {getTimelineLabel(clientData.timeline)}</p>
            {clientData.techStack && (
              <p><span className="label-dim">Preferred Stack:</span> <span className="tech-stack-tag">{clientData.techStack}</span></p>
            )}
          </div>
        </div>
      </div>

      {/* Project Description Block */}
      <div className="invoice-description-block">
        <h4 className="description-block-title">Scope & Specifications</h4>
        <p className="description-block-text">{clientData.description}</p>
      </div>

      {/* Services Table */}
      <div className="invoice-table-wrapper">
        <table className="invoice-table">
          <thead>
            <tr>
              <th className="col-idx">#</th>
              <th className="col-service">Service & Description</th>
              <th className="col-whats-included">Key Deliverables</th>
              <th className="col-amount align-right">Amount</th>
            </tr>
          </thead>
          <tbody>
            {selectedServices.map((service, idx) => (
              <tr key={service.id}>
                <td className="col-idx">{idx + 1}</td>
                <td className="col-service">
                  <span className="service-table-name">{service.name}</span>
                  <p className="service-table-desc">{service.description}</p>
                </td>
                <td className="col-whats-included">
                  <ul className="service-table-list">
                    {service.whatsIncluded.slice(0, 3).map((item, i) => (
                      <li key={i}>{item}</li>
                    ))}
                    {service.whatsIncluded.length > 3 && <li className="list-more">+ {service.whatsIncluded.length - 3} more items</li>}
                  </ul>
                </td>
                <td className="col-amount align-right amount-cell bold">
                  {formatPrice(service.basePricePKR, currency)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Totals Section */}
      <div className="invoice-totals-wrapper">
        {/* Left Side: Terms or Seal */}
        <div className="invoice-totals-left">
          <div className="terms-notes">
            <h4>Terms & Conditions</h4>
            <p>1. This is a project estimate. Pricing valid for 30 days from issued date.</p>
            <p>2. Work will commence upon signing of formal contract and 50% deposit payment.</p>
            <p>3. Payments are processed securely via Stripe or bank transfer.</p>
          </div>

          {/* Premium CSS-based Wax Seal */}
          <div className="invoice-wax-seal-wrapper">
            <div className="wax-seal">
              <div className="wax-seal-inner">
                <svg viewBox="0 0 24 24" width="100%" height="100%" fill="currentColor">
                  <path d="M12 3L4 9v11h16V9l-8-6zm6 15H6V10l6-4.5 6 4.5v8z" opacity="0.4"/>
                  <path d="M12 5.5L6 10v7h12v-7l-6-4.5zM12 8a2 2 0 110 4 2 2 0 010-4z"/>
                </svg>
              </div>
            </div>
            <div className="wax-seal-label">
              <p className="seal-approved">BINA CODES</p>
              <p className="seal-verified">OFFICIAL ESTIMATE</p>
            </div>
          </div>
        </div>

        {/* Right Side: Totals Breakdowns */}
        <div className="invoice-totals-right">
          <div className="totals-row">
            <span>Subtotal:</span>
            <span>{formatPrice(totalPKR, currency)}</span>
          </div>
          <div className="totals-row">
            <span>Tax (GST 0%):</span>
            <span>{formatPrice(0, currency)}</span>
          </div>
          <div className="totals-row grand-total-row">
            <span>Grand Total:</span>
            <span>{formatPrice(totalPKR, currency)}</span>
          </div>
        </div>
      </div>

      {/* Footer Notes */}
      <div className="invoice-footer">
        <p className="thanks-msg">Thank you for considering Bina Codes. We are excited to collaborate with you!</p>
        <p className="footer-copyright">© {new Date().getFullYear()} Bina Codes. All rights reserved.</p>
      </div>
    </div>
  );
}
