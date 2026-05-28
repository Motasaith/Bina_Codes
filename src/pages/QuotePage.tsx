import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { SERVICES, CURRENCIES, BUNDLES, formatPrice } from '../data/services';
import type { Bundle } from '../data/services';
import Invoice from '../components/Invoice';
import '../styles/QuotePage.css';

// Popular quick search suggestion tags
const SUGGESTION_TAGS = [
  'MERN App',
  'AI Chatbot',
  'Figma Design',
  'WordPress Site',
  'SEO Audit',
  'Shopify Store',
  'Workflow Automation',
  'Cloud Setup'
];

// Popular fallback services to display when search query is empty
const POPULAR_SERVICE_IDS = [
  'web-mern',
  'ai-chatbot',
  'cms-wp-custom',
  'design-ux',
  'shop-shopify',
  'design-seo'
];

export default function QuotePage() {
  const [searchParams] = useSearchParams();
  const [step, setStep] = useState(1);
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [selectedCurrency, setSelectedCurrency] = useState(CURRENCIES[0]); // Default to PKR
  const [searchQuery, setSearchQuery] = useState('');

  // Form states
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    description: '',
  });

  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [invoiceNumber, setInvoiceNumber] = useState('');
  const [showPrintableInvoice, setShowPrintableInvoice] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Auto-select service from URL parameter
  useEffect(() => {
    const serviceParam = searchParams.get('service');
    if (serviceParam) {
      if (SERVICES.some((s) => s.id === serviceParam)) {
        setSelectedServices([serviceParam]);
      }
    }

    // Generate unique reference ID
    const randomNum = Math.floor(1000 + Math.random() * 9000);
    const year = new Date().getFullYear().toString().substring(2);
    setInvoiceNumber(`BC-${year}-${randomNum}`);
  }, [searchParams]);

  const handleAddService = (serviceId: string) => {
    if (!selectedServices.includes(serviceId)) {
      setSelectedServices((prev) => [...prev, serviceId]);
    }
  };

  const handleRemoveService = (serviceId: string) => {
    setSelectedServices((prev) => prev.filter((id) => id !== serviceId));
  };

  const handleApplyBundle = (bundle: Bundle) => {
    // Select all services in the bundle
    setSelectedServices(bundle.serviceIds);
  };

  // Calculate current total in PKR
  const totalPKR = selectedServices.reduce((sum, serviceId) => {
    const service = SERVICES.find((s) => s.id === serviceId);
    return sum + (service ? service.basePricePKR : 0);
  }, 0);

  // Check active bundles (all serviceIds are selected)
  const activeBundles = BUNDLES.filter((bundle) =>
    bundle.serviceIds.every((id) => selectedServices.includes(id))
  );

  // Calculate bundle discounts
  const totalDiscountPKR = activeBundles.reduce((sum, bundle) => sum + bundle.discountPKR, 0);
  const grandTotalPKR = Math.max(0, totalPKR - totalDiscountPKR);

  // Filter services based on search query
  const searchResults = SERVICES.filter((service) => {
    if (!searchQuery.trim()) return false;
    const query = searchQuery.toLowerCase();
    
    return (
      service.name.toLowerCase().includes(query) ||
      service.description.toLowerCase().includes(query) ||
      service.category.toLowerCase().includes(query) ||
      service.whatsIncluded.some((item) => item.toLowerCase().includes(query))
    );
  });

  // Get fallback popular services
  const popularServices = SERVICES.filter((s) => POPULAR_SERVICE_IDS.includes(s.id));

  // Validate form in Step 2
  const validateForm = () => {
    const errors: Record<string, string> = {};
    if (!formData.name.trim()) errors.name = 'Full name is required';
    if (!formData.email.trim()) errors.email = 'Email address is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) errors.email = 'Invalid email address';

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleNextStep = () => {
    if (step === 1) {
      if (selectedServices.length === 0) {
        alert('Please select at least one service to see your estimate.');
        return;
      }
      setStep(2);
      window.scrollTo(0, 0);
    }
  };

  const handlePrevStep = () => {
    if (step > 1) {
      setStep(1);
      setIsSubmitted(false);
      setShowPrintableInvoice(false);
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

  const handleSubmitQuote = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      setIsSubmitted(true);
      
      // Compile selected services text for email
      const servicesText = selectedServices
        .map((id, index) => {
          const s = SERVICES.find(srv => srv.id === id);
          return s ? `${index + 1}. ${s.name} (${formatPrice(s.basePricePKR, selectedCurrency)})` : '';
        })
        .join('%0D%0A');

      const bundlesText = activeBundles.length > 0
        ? `Applied Bundles: ${activeBundles.map(b => b.name).join(', ')}%0D%0A`
        : '';

      // Open mailto link
      const emailSubject = `Project Quote Request: ${invoiceNumber}`;
      const emailBody = `Hi Bina Codes Team,%0D%0A%0D%0AI built a custom project scope on your quote builder and would like to connect.%0D%0A%0D%0A--- CLIENT DETAILS ---%0D%0AName: ${formData.name}%0D%0AEmail: ${formData.email}%0D%0ACompany: ${formData.company || 'N/A'}%0D%0A%0D%0A--- ESTIMATE SUMMARY ---%0D%0AReference ID: ${invoiceNumber}%0D%0ASelected Services:%0D%0A${servicesText}%0D%0A%0D%0A${bundlesText}Subtotal: ${formatPrice(totalPKR, selectedCurrency)}%0D%0ABundle Discount: -${formatPrice(totalDiscountPKR, selectedCurrency)}%0D%0AEstimated Grand Total: ${formatPrice(grandTotalPKR, selectedCurrency)}%0D%0A%0D%0AAdditional Notes: ${formData.description || 'None'}%0D%0A%0D%0APlease schedule a kickoff call with me.%0D%0A%0D%0AThanks,%0D%0A${formData.name}`;
      
      window.location.href = `mailto:hello@binacodes.com?subject=${emailSubject}&body=${emailBody}`;
    }
  };

  return (
    <div className="quote-page">
      {/* Step Indicator Header (Hide during print) */}
      <section className="quote-page-hero no-print">
        <div className="quote-page-hero-overlay"></div>
        <div className="quote-page-hero-content">
          <h1 className="quote-page-title">Project Quote Builder</h1>
          <p className="quote-page-subtitle">
            Search services, select packages, and get your estimated project quote instantly without any form filling.
          </p>

          {/* Stepper progress */}
          <div className="quote-stepper">
            <div className={`step-node ${step >= 1 ? 'active' : ''} ${step > 1 ? 'completed' : ''}`}>
              <div className="step-number">{step > 1 ? '✓' : '1'}</div>
              <div className="step-label">Get Instant Quote</div>
            </div>
            <div className="step-line">
              <div className="step-line-progress" style={{ width: step === 2 ? '100%' : '0%' }}></div>
            </div>
            <div className={`step-node ${step >= 2 ? 'active' : ''}`}>
              <div className="step-number">2</div>
              <div className="step-label">Contact & Start Project</div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Form container (Hide during print) */}
      <section className="quote-page-body no-print">
        <div className="quote-form-card">
          {/* STEP 1: FRICTIONLESS SEARCH & INSTANT BUNDLES */}
          {step === 1 && (
            <div className="quote-step-content">
              <div className="quote-step-header">
                <h2>Choose a Pre-made Combo or Build a Custom Package</h2>
                <p>Select a pre-packaged combo below, or search and select individual services to design your own custom package with real-time pricing.</p>
              </div>

              {/* Search Bar Block */}
              <div className="search-services-block">
                <div className="quote-search-wrapper">
                  <svg className="search-icon" viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="11" cy="11" r="8" />
                    <line x1="21" y1="21" x2="16.65" y2="16.65" />
                  </svg>
                  <input
                    type="text"
                    placeholder="Search services (e.g. Next.js, Chatbot, Figma, WordPress)..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="quote-search-input"
                  />
                  {searchQuery && (
                    <button onClick={() => setSearchQuery('')} className="search-clear-btn" aria-label="Clear Search">
                      ✕
                    </button>
                  )}
                </div>

                {/* Suggestion Tags */}
                <div className="suggestion-tags-row">
                  <span className="suggestion-label">Popular searches:</span>
                  <div className="suggestion-tags">
                    {SUGGESTION_TAGS.map((tag) => (
                      <button
                        key={tag}
                        onClick={() => setSearchQuery(tag)}
                        className={`btn-suggestion-tag ${searchQuery === tag ? 'active' : ''}`}
                      >
                        {tag}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Pre-packaged Combos Section */}
              <div className="combos-section">
                <h3 className="column-section-title">Popular Pre-packaged Solutions (Save Extra)</h3>
                <div className="combos-grid">
                  {BUNDLES.map((bundle) => {
                    const isAllSelected = bundle.serviceIds.every(id => selectedServices.includes(id));
                    
                    return (
                      <div key={bundle.id} className={`combo-card-item ${isAllSelected ? 'active' : ''}`}>
                        <div className="combo-card-header">
                          <span className="combo-badge-save">Save {formatPrice(bundle.discountPKR, selectedCurrency)}</span>
                          <h4>{bundle.name}</h4>
                        </div>
                        <p className="combo-card-desc">{bundle.description}</p>
                        
                        <div className="combo-card-included-tags">
                          {bundle.serviceIds.map(id => {
                            const srv = SERVICES.find(s => s.id === id);
                            return srv ? <span key={id} className="combo-item-tag">{srv.name}</span> : null;
                          })}
                        </div>
                        
                        <div className="combo-card-footer">
                          {isAllSelected ? (
                            <button className="btn-apply-combo active" disabled>
                              Package Applied ✓
                            </button>
                          ) : (
                            <button 
                              onClick={() => handleApplyBundle(bundle)} 
                              className="btn-apply-combo"
                            >
                              Apply Package
                            </button>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Flex Grid: Search Results on Left, Selected Services Cart on Right */}
              <div className="quote-step-columns">
                {/* Left Column: Search Results */}
                <div className="quote-search-results-column">
                  <h3 className="column-section-title">
                    {searchQuery.trim() ? `Search Results (${searchResults.length})` : 'Add Services to Custom Package'}
                  </h3>

                  <div className="services-results-list">
                    {/* Show search results if searching */}
                    {searchQuery.trim() && searchResults.map((service) => {
                      const isSelected = selectedServices.includes(service.id);
                      return (
                        <div key={service.id} className={`quote-search-card ${isSelected ? 'selected' : ''}`}>
                          <div className="search-card-header">
                            <span className="search-card-category">{service.category.replace('-', ' ')}</span>
                            <span className="search-card-price">{formatPrice(service.basePricePKR, selectedCurrency)}</span>
                          </div>
                          <h4 className="search-card-name">{service.name}</h4>
                          <p className="search-card-desc">{service.description}</p>
                          <div className="search-card-action">
                            {isSelected ? (
                              <button 
                                onClick={() => handleRemoveService(service.id)} 
                                className="btn-result-action selected"
                              >
                                Selected ✓
                              </button>
                            ) : (
                              <button 
                                onClick={() => handleAddService(service.id)} 
                                className="btn-result-action add"
                              >
                                + Add to Quote
                              </button>
                            )}
                          </div>
                        </div>
                      );
                    })}

                    {/* Show fallback popular services if not searching */}
                    {!searchQuery.trim() && popularServices.map((service) => {
                      const isSelected = selectedServices.includes(service.id);
                      return (
                        <div key={service.id} className={`quote-search-card ${isSelected ? 'selected' : ''}`}>
                          <div className="search-card-header">
                            <span className="search-card-category">{service.category.replace('-', ' ')}</span>
                            <span className="search-card-price">{formatPrice(service.basePricePKR, selectedCurrency)}</span>
                          </div>
                          <h4 className="search-card-name">{service.name}</h4>
                          <p className="search-card-desc">{service.description}</p>
                          <div className="search-card-action">
                            {isSelected ? (
                              <button 
                                onClick={() => handleRemoveService(service.id)} 
                                className="btn-result-action selected"
                              >
                                Selected ✓
                              </button>
                            ) : (
                              <button 
                                onClick={() => handleAddService(service.id)} 
                                className="btn-result-action add"
                              >
                                + Add to Quote
                              </button>
                            )}
                          </div>
                        </div>
                      );
                    })}

                    {/* Empty Search State */}
                    {searchQuery.trim() && searchResults.length === 0 && (
                      <div className="search-results-empty">
                        <p>No matches found for "{searchQuery}".</p>
                        <p className="hint">Try searching for broader keywords like "Web", "AI", or "SEO".</p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Right Column: Selected Services (Instant Quote Summary) */}
                <div className="quote-selection-column">
                  <h3 className="column-section-title">Your Custom Package</h3>
                  
                  <div className="selection-cart-box">
                    <div className="selection-cart-header">
                      <span className="selected-count">{selectedServices.length} Selected</span>
                      <select 
                        value={selectedCurrency.code} 
                        onChange={handleCurrencyChange}
                        className="cart-currency-dropdown"
                      >
                        {CURRENCIES.map(curr => (
                          <option key={curr.code} value={curr.code}>{curr.code}</option>
                        ))}
                      </select>
                    </div>

                    <div className="selection-cart-items">
                      {selectedServices.length > 0 ? (
                        selectedServices.map((serviceId) => {
                          const service = SERVICES.find((s) => s.id === serviceId);
                          if (!service) return null;
                          return (
                            <div key={service.id} className="cart-item-row">
                              <div className="cart-item-info">
                                <span className="cart-item-name">{service.name}</span>
                                <span className="cart-item-price">{formatPrice(service.basePricePKR, selectedCurrency)}</span>
                              </div>
                              <button 
                                onClick={() => handleRemoveService(service.id)} 
                                className="btn-remove-cart-item"
                                aria-label="Remove Service"
                              >
                                ✕
                              </button>
                            </div>
                          );
                        })
                      ) : (
                        <div className="cart-empty-message">
                          <p>Your quote is empty.</p>
                          <p className="hint">Select a combo package above or search services to start.</p>
                        </div>
                      )}
                    </div>

                    <div className="selection-cart-totals">
                      {selectedServices.length > 0 && (
                        <>
                          <div className="cart-totals-row">
                            <span>Subtotal:</span>
                            <span>{formatPrice(totalPKR, selectedCurrency)}</span>
                          </div>
                          {totalDiscountPKR > 0 && (
                            <div className="cart-totals-row discount-row">
                              <span className="green-text">Package Discount:</span>
                              <span className="green-text">-{formatPrice(totalDiscountPKR, selectedCurrency)}</span>
                            </div>
                          )}
                        </>
                      )}
                      
                      <div className="cart-totals-row font-large bold">
                        <span>Grand Total:</span>
                        <span className="gold-text">{formatPrice(grandTotalPKR, selectedCurrency)}</span>
                      </div>
                      
                      <button 
                        onClick={handleNextStep} 
                        disabled={selectedServices.length === 0}
                        className="btn-cart-proceed-checkout"
                      >
                        Proceed to Contact Team →
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* STEP 2: OPTIONAL CONTACT / SUBMISSION */}
          {step === 2 && (
            <div className="quote-step-content">
              <div className="quote-step-header">
                <h2>Submit Your Quote Request</h2>
                <p>Complete this optional step to send your selected project scope directly to the Bina Codes engineering team.</p>
              </div>

              {!isSubmitted ? (
                <div className="quote-submission-layout">
                  {/* Left Side: Contact Form */}
                  <form onSubmit={handleSubmitQuote} className="quote-contact-form">
                    <div className="quote-form-grid">
                      <div className="quote-form-field">
                        <label htmlFor="client-name">Full Name <span className="required">*</span></label>
                        <input
                          id="client-name"
                          type="text"
                          placeholder="Your name"
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
                          placeholder="john@company.com"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          className={formErrors.email ? 'input-error' : ''}
                        />
                        {formErrors.email && <span className="error-msg">{formErrors.email}</span>}
                      </div>

                      <div className="quote-form-field full-width">
                        <label htmlFor="client-company">Company Name (Optional)</label>
                        <input
                          id="client-company"
                          type="text"
                          placeholder="Acme Corporation"
                          value={formData.company}
                          onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                        />
                      </div>

                      <div className="quote-form-field full-width">
                        <label htmlFor="project-desc">Additional Notes & Custom Requirements (Optional)</label>
                        <textarea
                          id="project-desc"
                          rows={4}
                          placeholder="Tell us more details about your timeline, tech preference, design expectations, etc..."
                          value={formData.description}
                          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        ></textarea>
                      </div>
                    </div>

                    <div className="form-submit-actions">
                      <button type="submit" className="btn-submit-quote-request">
                        Email Quote to Bina Codes
                        <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                          <line x1="22" y1="2" x2="11" y2="13" />
                          <polygon points="22 2 15 22 11 13 2 9 22 2" />
                        </svg>
                      </button>
                    </div>
                  </form>

                  {/* Right Side: Scope Breakdown Review */}
                  <div className="quote-cart-review-sidebar">
                    <h3 className="sidebar-title">Scope Review</h3>
                    <div className="sidebar-specs">
                      <div className="spec-row">
                        <span className="spec-lbl">Reference ID:</span>
                        <span className="spec-val">{invoiceNumber}</span>
                      </div>
                      <div className="spec-row">
                        <span className="spec-lbl">Selected items:</span>
                        <span className="spec-val">{selectedServices.length} Package(s)</span>
                      </div>
                      {activeBundles.length > 0 && (
                        <div className="spec-row">
                          <span className="spec-lbl">Applied Package:</span>
                          <span className="spec-val green-text">{activeBundles[0].name}</span>
                        </div>
                      )}
                      
                      <div className="spec-row">
                        <span className="spec-lbl">Subtotal:</span>
                        <span className="spec-val">{formatPrice(totalPKR, selectedCurrency)}</span>
                      </div>

                      {totalDiscountPKR > 0 && (
                        <div className="spec-row">
                          <span className="spec-lbl green-text">Package Discount:</span>
                          <span className="spec-val green-text">-{formatPrice(totalDiscountPKR, selectedCurrency)}</span>
                        </div>
                      )}

                      <div className="spec-row total-row">
                        <span className="spec-lbl">Total Estimate:</span>
                        <span className="spec-val gold-text">{formatPrice(grandTotalPKR, selectedCurrency)}</span>
                      </div>
                    </div>

                    <div className="sidebar-items-scroller">
                      {selectedServices.map(id => {
                        const s = SERVICES.find(srv => srv.id === id);
                        if (!s) return null;
                        return (
                          <div key={s.id} className="sidebar-item-card">
                            <span className="name">{s.name}</span>
                            <span className="price">{formatPrice(s.basePricePKR, selectedCurrency)}</span>
                          </div>
                        );
                      })}
                    </div>

                    <button 
                      onClick={() => setShowPrintableInvoice(!showPrintableInvoice)} 
                      className="btn-sidebar-toggle-sheet"
                    >
                      {showPrintableInvoice ? 'Hide Details Sheet' : 'Show Detailed Invoice Sheet'}
                    </button>
                  </div>
                </div>
              ) : (
                <div className="quote-success-view">
                  <div className="success-icon-badge">✓</div>
                  <h3>Quote Request Compiled!</h3>
                  <p>
                    We've opened your local email client with the pre-formatted quote details (Reference ID: <span className="bold">{invoiceNumber}</span>). 
                    If it didn't open automatically, you can copy the summary details and email them to <span className="bold">hello@binacodes.com</span>.
                  </p>
                  <div className="success-nav-buttons">
                    <button onClick={handlePrevStep} className="btn-modify-quote">
                      ← Back to Builder
                    </button>
                    <a href="/" className="btn-return-home-cta">
                      Return to Homepage
                    </a>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Stepper navigation buttons */}
          <div className="quote-stepper-actions">
            {step > 1 && (
              <button onClick={handlePrevStep} className="btn-stepper-back">
                ← Back to Service Selector
              </button>
            )}
          </div>
        </div>
      </section>

      {/* RENDER PRINTABLE INVOICE SHEET (rendered only if toggled and on Step 2) */}
      {step === 2 && showPrintableInvoice && (
        <div className="printable-invoice-container-wrapper">
          <div className="invoice-preview-bar no-print">
            <h3>Invoice Sheet Preview</h3>
            <button onClick={() => window.print()} className="btn-print-invoice-preview">
              Print / Save PDF
            </button>
          </div>
          <Invoice
            invoiceNumber={invoiceNumber}
            clientData={{
              name: formData.name || 'Valued Client',
              email: formData.email || 'client@company.com',
              company: formData.company,
              projectName: 'Custom Digital Development',
              description: formData.description || 'Custom Scope Build',
              timeline: '1-month',
              techStack: '',
            }}
            selectedServiceIds={selectedServices}
            currency={selectedCurrency}
          />
        </div>
      )}
    </div>
  );
}
