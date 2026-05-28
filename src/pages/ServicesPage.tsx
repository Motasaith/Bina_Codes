import { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { CATEGORIES, SERVICES, formatPrice, CURRENCIES } from '../data/services';
import '../styles/ServicesPage.css';

export default function ServicesPage() {
  const [searchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedCategories, setExpandedCategories] = useState<Record<string, boolean>>({});

  // Get PKR currency definition for display
  const pkrCurrency = CURRENCIES.find(c => c.code === 'PKR') || CURRENCIES[0];

  // Pre-expand category from URL search parameter
  useEffect(() => {
    const categoryParam = searchParams.get('category');
    if (categoryParam) {
      setExpandedCategories((prev) => ({
        ...prev,
        [categoryParam]: true
      }));

      // Scroll to that category
      setTimeout(() => {
        const el = document.getElementById(`category-section-${categoryParam}`);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 300);
    } else {
      // By default, expand the first category
      if (CATEGORIES.length > 0) {
        setExpandedCategories((prev) => ({
          ...prev,
          [CATEGORIES[0].id]: true
        }));
      }
    }
  }, [searchParams]);

  // Toggle category expansion
  const toggleCategory = (categoryId: string) => {
    setExpandedCategories((prev) => ({
      ...prev,
      [categoryId]: !prev[categoryId]
    }));
  };

  // Expand all categories (useful when searching)
  const expandAll = () => {
    const expanded: Record<string, boolean> = {};
    CATEGORIES.forEach(c => {
      expanded[c.id] = true;
    });
    setExpandedCategories(expanded);
  };

  // Collapse all categories
  const collapseAll = () => {
    setExpandedCategories({});
  };

  // Filter services and categories based on search
  const filteredServices = SERVICES.filter(service => {
    const query = searchQuery.toLowerCase();
    return (
      service.name.toLowerCase().includes(query) ||
      service.description.toLowerCase().includes(query) ||
      service.whatsIncluded.some(item => item.toLowerCase().includes(query))
    );
  });

  // Handle search query change
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    if (query.trim() !== '') {
      // Auto-expand all categories when searching to reveal matches
      expandAll();
    }
  };

  return (
    <div className="services-page">
      {/* Hero Header */}
      <section className="services-page-hero">
        <div className="services-page-hero-overlay"></div>
        <div className="services-page-hero-content">
          <span className="services-page-tag">Expert Capabilities</span>
          <h1 className="services-page-title">Our Services</h1>
          <p className="services-page-subtitle">
            Explore our massive suite of 50+ specialized engineering, AI, and design services.
            Select what you need and build your custom quote.
          </p>
        </div>
      </section>

      {/* Main Content Area */}
      <section className="services-page-container">
        {/* Search & Actions Bar */}
        <div className="services-controls-bar">
          <div className="services-search-wrapper">
            <svg className="search-icon" viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
            <input
              type="text"
              placeholder="Search services (e.g. Next.js, AI, Stripe, Figma)..."
              value={searchQuery}
              onChange={handleSearchChange}
              className="services-search-input"
            />
            {searchQuery && (
              <button onClick={() => setSearchQuery('')} className="search-clear-btn" aria-label="Clear Search">
                ✕
              </button>
            )}
          </div>

          <div className="services-actions-buttons">
            <button onClick={expandAll} className="btn-control-outline">Expand All</button>
            <button onClick={collapseAll} className="btn-control-outline">Collapse All</button>
          </div>
        </div>

        {/* Categories and Services Accordion */}
        <div className="services-accordion-list">
          {CATEGORIES.map((category) => {
            const categoryServices = filteredServices.filter(s => s.category === category.id);
            const isExpanded = !!expandedCategories[category.id];

            // If a search query is active and there are no matching services in this category, hide it
            if (searchQuery && categoryServices.length === 0) {
              return null;
            }

            return (
              <div 
                key={category.id} 
                id={`category-section-${category.id}`}
                className={`category-accordion-item ${isExpanded ? 'expanded' : ''}`}
              >
                {/* Header/Toggle Button */}
                <button 
                  onClick={() => toggleCategory(category.id)} 
                  className="category-accordion-header"
                  aria-expanded={isExpanded}
                >
                  <div className="category-header-title-wrapper">
                    <span className="category-header-count">{categoryServices.length}</span>
                    <div>
                      <h2 className="category-header-title">{category.name}</h2>
                      <p className="category-header-desc">{category.description}</p>
                    </div>
                  </div>
                  <span className="accordion-chevron-icon">
                    <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="6 9 12 15 18 9" />
                    </svg>
                  </span>
                </button>

                {/* Content Panel (Services List) */}
                <div className="category-accordion-content-wrapper">
                  <div className="category-accordion-content">
                    <div className="services-cards-grid">
                      {categoryServices.map((service) => (
                        <div key={service.id} className="service-detail-card">
                          <h3 className="service-detail-title">{service.name}</h3>
                          <p className="service-detail-desc">{service.description}</p>
                          
                          {/* What's Included */}
                          <div className="service-included-box">
                            <h4 className="service-included-title">What's Included:</h4>
                            <ul className="service-included-list">
                              {service.whatsIncluded.map((item, idx) => (
                                <li key={idx} className="service-included-item">
                                  <svg className="gold-check-icon" viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                                    <polyline points="20 6 9 17 4 12" />
                                  </svg>
                                  {item}
                                </li>
                              ))}
                            </ul>
                          </div>

                          {/* Price & CTA */}
                          <div className="service-detail-footer">
                            <div className="service-detail-price">
                              <span className="price-label">Starting from</span>
                              <span className="price-amount">{formatPrice(service.basePricePKR, pkrCurrency)}</span>
                            </div>
                            <Link 
                              to={`/quote?service=${service.id}`} 
                              className="btn-service-add-quote"
                            >
                              Get Quote
                            </Link>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}

          {/* Empty State when search has no results */}
          {filteredServices.length === 0 && (
            <div className="services-empty-state">
              <svg viewBox="0 0 24 24" width="48" height="48" fill="none" stroke="currentColor" strokeWidth="1.5">
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
                <line x1="8" y1="11" x2="14" y2="11" />
              </svg>
              <h3>No services found</h3>
              <p>We couldn't find any services matching "{searchQuery}". Try using different terms or browse the categories.</p>
              <button onClick={() => setSearchQuery('')} className="btn-clear-search-cta">
                Clear Search & View All
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Footer CTA */}
      <section className="services-page-bottom-cta">
        <div className="bottom-cta-card">
          <h2>Ready to Launch Your Project?</h2>
          <p>
            Build your custom project scope in our interactive quote builder. 
            Receive a transparent, instant estimate in PKR, USD, EUR, or GBP.
          </p>
          <Link to="/quote" className="btn-bottom-cta-primary">
            Build Custom Quote
            <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </Link>
        </div>
      </section>
    </div>
  );
}
