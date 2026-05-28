import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { CATEGORIES, SERVICES, CURRENCIES, formatPrice } from '../data/services';
import Invoice from '../components/Invoice';
import '../styles/QuotePage.css';

export default function QuotePage() {
  const [searchParams] = useSearchParams();
  const [step, setStep] = useState(1);
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [selectedCurrency, setSelectedCurrency] = useState(CURRENCIES[0]); // Default to PKR

  // Form states
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    projectName: '',
    description: '',
    timeline: '1-month',
    techStack: '',
  });

  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [isInvoiceGenerated, setIsInvoiceGenerated] = useState(false);
  const [invoiceNumber, setInvoiceNumber] = useState('');
  const [expandedCategories, setExpandedCategories] = useState<Record<string, boolean>>({});

  // Auto-select service from URL parameter
  useEffect(() => {
    const serviceParam = searchParams.get('service');
    if (serviceParam) {
      const serviceObj = SERVICES.find((s) => s.id === serviceParam);
      if (serviceObj) {
        setSelectedServices([serviceParam]);
        // Expand the category of this service
        setExpandedCategories({
          [serviceObj.category]: true,
        });
      }
    } else {
      // Pre-expand first category
      if (CATEGORIES.length > 0) {
        setExpandedCategories({
          [CATEGORIES[0].id]: true,
        });
      }
    }

    // Generate unique invoice number
    const randomNum = Math.floor(1000 + Math.random() * 9000);
    const year = new Date().getFullYear().toString().substring(2);
    setInvoiceNumber(`BC-${year}-${randomNum}`);
  }, [searchParams]);

  // Toggle service selection
  const handleServiceToggle = (serviceId: string) => {
    setSelectedServices((prev) =>
      prev.includes(serviceId)
        ? prev.filter((id) => id !== serviceId)
        : [...prev, serviceId]
    );
  };

  // Toggle category expansion
  const toggleCategory = (categoryId: string) => {
    setExpandedCategories((prev) => ({
      ...prev,
      [categoryId]: !prev[categoryId],
    }));
  };

  // Calculate current total in PKR
  const totalPKR = selectedServices.reduce((sum, serviceId) => {
    const service = SERVICES.find((s) => s.id === serviceId);
    return sum + (service ? service.basePricePKR : 0);
  }, 0);

  // Validate form in Step 2
  const validateForm = () => {
    const errors: Record<string, string> = {};
    if (!formData.name.trim()) errors.name = 'Full name is required';
    if (!formData.email.trim()) errors.email = 'Email address is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) errors.email = 'Invalid email address';
    if (!formData.projectName.trim()) errors.projectName = 'Project name is required';
    if (!formData.description.trim()) errors.description = 'Project description is required';

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleNextStep = () => {
    if (step === 1) {
      if (selectedServices.length === 0) {
        alert('Please select at least one service to proceed.');
        return;
      }
      setStep(2);
      window.scrollTo(0, 0);
    } else if (step === 2) {
      if (validateForm()) {
        setStep(3);
        window.scrollTo(0, 0);
      }
    }
  };

  const handlePrevStep = () => {
    if (step > 1) {
      setStep((prev) => prev - 1);
      setIsInvoiceGenerated(false);
      window.scrollTo(0, 0);
    }
  };

  const handleCurrencyChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const code = e.target.value;
    const currency = CURRENCIES.find((c) => c.code === code);
    if (currency) {
      setSelectedCurrency(currency);
    }
  };

  const handleGenerateInvoice = () => {
    setIsInvoiceGenerated(true);
    // Scroll to invoice section
    setTimeout(() => {
      const el = document.getElementById('printable-invoice-area');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 100);
  };

  return (
    <div className="quote-page">
      {/* Step Indicator Header (Hide during print) */}
      <section className="quote-page-hero no-print">
        <div className="quote-page-hero-overlay"></div>
        <div className="quote-page-hero-content">
          <h1 className="quote-page-title">Project Quote Builder</h1>
          <p className="quote-page-subtitle">
            Configure your custom scope, define details, and generate a printable estimation instantly.
          </p>

          {/* Stepper progress */}
          {!isInvoiceGenerated && (
            <div className="quote-stepper">
              <div className={`step-node ${step >= 1 ? 'active' : ''} ${step > 1 ? 'completed' : ''}`}>
                <div className="step-number">{step > 1 ? '✓' : '1'}</div>
                <div className="step-label">Select Services</div>
              </div>
              <div className="step-line">
                <div className="step-line-progress" style={{ width: step === 2 ? '50%' : step === 3 ? '100%' : '0%' }}></div>
              </div>
              <div className={`step-node ${step >= 2 ? 'active' : ''} ${step > 2 ? 'completed' : ''}`}>
                <div className="step-number">{step > 2 ? '✓' : '2'}</div>
                <div className="step-label">Project Details</div>
              </div>
              <div className="step-line">
                <div className="step-line-progress" style={{ width: step === 3 ? '100%' : '0%' }}></div>
              </div>
              <div className={`step-node ${step >= 3 ? 'active' : ''}`}>
                <div className="step-number">3</div>
                <div className="step-label">Review & Invoice</div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Main Form container (Hide during print) */}
      <section className="quote-page-body no-print">
        {!isInvoiceGenerated ? (
          <div className="quote-form-card">
            {/* STEP 1: SELECT SERVICES */}
            {step === 1 && (
              <div className="quote-step-content">
                <div className="quote-step-header">
                  <h2>Select Services for Your Project</h2>
                  <p>Choose one or more services. You can mix and match across categories.</p>
                </div>

                <div className="quote-services-accordion">
                  {CATEGORIES.map((category) => {
                    const categoryServices = SERVICES.filter((s) => s.category === category.id);
                    const isExpanded = !!expandedCategories[category.id];

                    return (
                      <div key={category.id} className={`quote-category-item ${isExpanded ? 'expanded' : ''}`}>
                        <button onClick={() => toggleCategory(category.id)} className="quote-category-header">
                          <span className="quote-category-title">{category.name}</span>
                          <span className="quote-category-chevron">
                            <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2.5">
                              <polyline points="6 9 12 15 18 9" />
                            </svg>
                          </span>
                        </button>

                        <div className="quote-category-services-list-wrapper">
                          <div className="quote-category-services-list">
                            {categoryServices.map((service) => {
                              const isChecked = selectedServices.includes(service.id);
                              return (
                                <label key={service.id} className={`quote-service-checkbox-card ${isChecked ? 'checked' : ''}`}>
                                  <input
                                    type="checkbox"
                                    checked={isChecked}
                                    onChange={() => handleServiceToggle(service.id)}
                                    className="quote-checkbox-input"
                                  />
                                  <div className="quote-checkbox-custom">
                                    {isChecked && (
                                      <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="3">
                                        <polyline points="20 6 9 17 4 12" />
                                      </svg>
                                    )}
                                  </div>
                                  <div className="quote-service-info">
                                    <div className="quote-service-name-row">
                                      <span className="quote-service-name">{service.name}</span>
                                      <span className="quote-service-price">
                                        {formatPrice(service.basePricePKR, selectedCurrency)}
                                      </span>
                                    </div>
                                    <p className="quote-service-desc">{service.description}</p>
                                  </div>
                                </label>
                              );
                            })}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* STEP 2: PROJECT DETAILS */}
            {step === 2 && (
              <div className="quote-step-content">
                <div className="quote-step-header">
                  <h2>Project & Contact Details</h2>
                  <p>Provide contact information and describe the project specifications to customize your estimate.</p>
                </div>

                <div className="quote-form-grid">
                  <div className="quote-form-field">
                    <label htmlFor="client-name">Full Name <span className="required">*</span></label>
                    <input
                      id="client-name"
                      type="text"
                      placeholder="e.g. John Doe"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className={formErrors.name ? 'input-error' : ''}
                    />
                    {formErrors.name && <span className="error-msg">{formErrors.name}</span>}
                  </div>

                  <div className="quote-form-field">
                    <label htmlFor="client-email">Email Address <span className="required">*</span></label>
                    <input
                      id="client-email"
                      type="email"
                      placeholder="e.g. john@company.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className={formErrors.email ? 'input-error' : ''}
                    />
                    {formErrors.email && <span className="error-msg">{formErrors.email}</span>}
                  </div>

                  <div className="quote-form-field">
                    <label htmlFor="client-company">Company Name (Optional)</label>
                    <input
                      id="client-company"
                      type="text"
                      placeholder="e.g. Acme Corporation"
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    />
                  </div>

                  <div className="quote-form-field">
                    <label htmlFor="project-name">Project Name <span className="required">*</span></label>
                    <input
                      id="project-name"
                      type="text"
                      placeholder="e.g. E-Commerce Rebrand or Custom Mobile App"
                      value={formData.projectName}
                      onChange={(e) => setFormData({ ...formData, projectName: e.target.value })}
                      className={formErrors.projectName ? 'input-error' : ''}
                    />
                    {formErrors.projectName && <span className="error-msg">{formErrors.projectName}</span>}
                  </div>

                  <div className="quote-form-field">
                    <label htmlFor="project-timeline">Desired Timeline</label>
                    <select
                      id="project-timeline"
                      value={formData.timeline}
                      onChange={(e) => setFormData({ ...formData, timeline: e.target.value })}
                    >
                      <option value="2-weeks">Express (2 Weeks)</option>
                      <option value="1-month">Standard (1 Month)</option>
                      <option value="2-months">Medium (2 Months)</option>
                      <option value="3-months">Long-Term (3+ Months)</option>
                    </select>
                  </div>

                  <div className="quote-form-field">
                    <label htmlFor="project-tech">Preferred Tech Stack (Optional)</label>
                    <input
                      id="project-tech"
                      type="text"
                      placeholder="e.g. Next.js, FastAPI, Node.js, WordPress"
                      value={formData.techStack}
                      onChange={(e) => setFormData({ ...formData, techStack: e.target.value })}
                    />
                  </div>

                  <div className="quote-form-field full-width">
                    <label htmlFor="project-desc">Project Description & Requirements <span className="required">*</span></label>
                    <textarea
                      id="project-desc"
                      rows={5}
                      placeholder="Describe the scope, functionalities, user roles, design style and integrations needed..."
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      className={formErrors.description ? 'input-error' : ''}
                    ></textarea>
                    {formErrors.description && <span className="error-msg">{formErrors.description}</span>}
                  </div>
                </div>
              </div>
            )}

            {/* STEP 3: REVIEW & INVOICE GENERATOR */}
            {step === 3 && (
              <div className="quote-step-content">
                <div className="quote-step-header">
                  <h2>Review Custom Scope & Estimate</h2>
                  <p>Check selected services and set your preferred currency before generating the printable sheet.</p>
                </div>

                <div className="quote-review-container">
                  <div className="quote-currency-selector-card">
                    <label htmlFor="currency-select">Choose Preferred Invoice Currency:</label>
                    <select
                      id="currency-select"
                      value={selectedCurrency.code}
                      onChange={handleCurrencyChange}
                      className="currency-select-dropdown"
                    >
                      {CURRENCIES.map((curr) => (
                        <option key={curr.code} value={curr.code}>
                          {curr.code} ({curr.symbol})
                        </option>
                      ))}
                    </select>
                    <p className="currency-conversion-helper">
                      Estimates will be recalculated instantly using fixed conversion multipliers.
                    </p>
                  </div>

                  <div className="quote-review-summary-table-wrapper">
                    <table className="quote-review-summary-table">
                      <thead>
                        <tr>
                          <th>Service Item</th>
                          <th>Category</th>
                          <th className="align-right">Base Amount</th>
                        </tr>
                      </thead>
                      <tbody>
                        {selectedServices.map((serviceId) => {
                          const service = SERVICES.find((s) => s.id === serviceId);
                          if (!service) return null;
                          return (
                            <tr key={service.id}>
                              <td>
                                <span className="summary-service-name">{service.name}</span>
                                <p className="summary-service-desc">{service.description}</p>
                              </td>
                              <td>
                                <span className="summary-category-badge">{service.category}</span>
                              </td>
                              <td className="align-right amount-cell">
                                {formatPrice(service.basePricePKR, selectedCurrency)}
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                      <tfoot>
                        <tr>
                          <td colSpan={2}>Subtotal</td>
                          <td className="align-right">{formatPrice(totalPKR, selectedCurrency)}</td>
                        </tr>
                        <tr className="tfoot-total">
                          <td colSpan={2}>Estimated Grand Total</td>
                          <td className="align-right">{formatPrice(totalPKR, selectedCurrency)}</td>
                        </tr>
                      </tfoot>
                    </table>
                  </div>

                  <div className="generate-invoice-prompt">
                    <button onClick={handleGenerateInvoice} className="btn-generate-invoice-primary">
                      Generate Printable Invoice / Estimate
                      <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                        <polyline points="14 2 14 8 20 8" />
                        <line x1="16" y1="13" x2="8" y2="13" />
                        <line x1="16" y1="17" x2="8" y2="17" />
                        <polyline points="10 9 9 9 8 9" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Stepper Buttons (Hide when invoice is open) */}
            <div className="quote-stepper-actions">
              {step > 1 && (
                <button onClick={handlePrevStep} className="btn-stepper-back">
                  ← Back
                </button>
              )}
              {step < 3 ? (
                <button onClick={handleNextStep} className="btn-stepper-next">
                  Next Step →
                </button>
              ) : null}
            </div>
          </div>
        ) : (
          <div className="invoice-success-hero">
            <div className="success-checkmark">✓</div>
            <h2>Your Invoice / Estimate has been Generated!</h2>
            <p>Scroll down to preview, print or download the document as PDF. You can also modify details if needed.</p>
            <div className="success-action-buttons">
              <button onClick={handlePrevStep} className="btn-modify-quote">
                ← Modify Selection
              </button>
              <button 
                onClick={() => window.print()} 
                className="btn-print-quote"
              >
                Print / Download PDF
                <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <polyline points="6 9 6 2 18 2 18 9" />
                  <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2" />
                  <rect x="6" y="14" width="12" height="8" />
                </svg>
              </button>
            </div>
          </div>
        )}
      </section>

      {/* RENDER INVOICE COMPONENT (Always rendered, but styled via print query/visibility) */}
      {isInvoiceGenerated && (
        <Invoice
          invoiceNumber={invoiceNumber}
          clientData={{
            name: formData.name,
            email: formData.email,
            company: formData.company,
            projectName: formData.projectName,
            description: formData.description,
            timeline: formData.timeline,
            techStack: formData.techStack,
          }}
          selectedServiceIds={selectedServices}
          currency={selectedCurrency}
        />
      )}

      {/* Floating Sticky Footer price counter (only visible in Step 1, hidden when print) */}
      {step === 1 && selectedServices.length > 0 && (
        <div className="quote-floating-price-bar no-print">
          <div className="price-bar-content">
            <div className="price-bar-info">
              <span className="price-bar-count">{selectedServices.length} Service(s) Selected</span>
              <span className="price-bar-total">{formatPrice(totalPKR, selectedCurrency)}</span>
            </div>
            <button onClick={handleNextStep} className="btn-price-bar-proceed">
              Configure Details →
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
