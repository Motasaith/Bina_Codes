import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Link } from 'react-router-dom';
import '../styles/BlogPage.css';

gsap.registerPlugin(ScrollTrigger);

const CATEGORIES = ['All', 'Engineering', 'AI & ML', 'Design', 'Business', 'Careers'];

const BLOG_POSTS = [
  {
    id: 'post-1',
    title: 'How We Scaled a MERN App to 100K Concurrent Users',
    excerpt:
      'A deep dive into the architecture decisions, caching strategies, and database optimizations that allowed one of our e-commerce clients to handle massive traffic spikes without breaking a sweat.',
    category: 'Engineering',
    date: 'May 15, 2026',
    readTime: '8 min read',
    featured: true,
    tags: ['MERN', 'Scaling', 'Redis', 'MongoDB'],
  },
  {
    id: 'post-2',
    title: 'Building LLM-Powered Chatbots: Lessons from Production',
    excerpt:
      'We have deployed AI assistants for clients across healthcare, legal, and e-commerce. Here is what we learned about prompt engineering, RAG pipelines, and cost optimization.',
    category: 'AI & ML',
    date: 'May 8, 2026',
    readTime: '12 min read',
    featured: false,
    tags: ['LLM', 'OpenAI', 'RAG', 'Python'],
  },
  {
    id: 'post-3',
    title: 'The Bina Codes Design System: From Figma to Code',
    excerpt:
      'How we built a unified design system that bridges the gap between designers and developers, reducing handoff friction by 70%.',
    category: 'Design',
    date: 'April 28, 2026',
    readTime: '6 min read',
    featured: false,
    tags: ['Figma', 'Design Systems', 'React', 'CSS'],
  },
  {
    id: 'post-4',
    title: 'Why We Chose Rahim Yar Khan for Our Headquarters',
    excerpt:
      'Talent is evenly distributed; opportunity is not. Here is the story of why we bet on South Punjab and how it is paying off for our team and clients.',
    category: 'Business',
    date: 'April 15, 2026',
    readTime: '5 min read',
    featured: false,
    tags: ['Remote Work', 'Pakistan', 'Culture'],
  },
  {
    id: 'post-5',
    title: 'From Intern to Lead: A Career Path at Bina Codes',
    excerpt:
      'Meet Ahmed — he joined us as an intern 3 years ago and now leads our AI engineering division. This is how structured mentorship creates exponential growth.',
    category: 'Careers',
    date: 'April 2, 2026',
    readTime: '7 min read',
    featured: false,
    tags: ['Career Growth', 'Mentorship', 'Internship'],
  },
  {
    id: 'post-6',
    title: 'WebGL & Three.js: Creating Immersive 3D Experiences',
    excerpt:
      'A technical walkthrough of how we built a real-time 3D product configurator for a luxury furniture brand using React Three Fiber and custom shaders.',
    category: 'Engineering',
    date: 'March 20, 2026',
    readTime: '10 min read',
    featured: false,
    tags: ['WebGL', 'Three.js', 'React', 'Shaders'],
  },
];

export default function BlogPage() {
  const [activeCategory, setActiveCategory] = useState('All');
  const heroRef = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  const filteredPosts =
    activeCategory === 'All'
      ? BLOG_POSTS
      : BLOG_POSTS.filter((p) => p.category === activeCategory);

  const featuredPost = BLOG_POSTS.find((p) => p.featured);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (heroRef.current) {
        const content = heroRef.current.querySelector('.blog-hero-content');
        if (content) {
          gsap.fromTo(
            content.children,
            { opacity: 0, y: 40 },
            { opacity: 1, y: 0, duration: 0.8, stagger: 0.15, ease: 'power2.out' }
          );
        }
      }

      if (gridRef.current) {
        const cards = gridRef.current.querySelectorAll('.blog-card');
        gsap.fromTo(
          cards,
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            stagger: 0.1,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: gridRef.current,
              start: 'top 85%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }
    });

    return () => ctx.revert();
  }, [activeCategory]);

  return (
    <div className="blog-page">
      {/* Hero Header */}
      <section ref={heroRef} className="blog-page-hero">
        <div className="blog-page-hero-overlay"></div>
        <div className="blog-hero-content">
          <span className="blog-page-tag">Insights & Stories</span>
          <h1 className="blog-page-title">The Bina Codes Blog</h1>
          <p className="blog-page-subtitle">
            Engineering deep-dives, design case studies, AI experiments, and stories from the team building software in South Punjab.
          </p>
        </div>
      </section>

      {/* Featured Post */}
      {featuredPost && (
        <section className="blog-featured-section">
          <div className="container">
            <span className="featured-label">Featured Story</span>
            <div className="blog-featured-card">
              <div className="blog-featured-content">
                <div className="blog-featured-meta">
                  <span className="blog-featured-category">{featuredPost.category}</span>
                  <span className="blog-featured-date">{featuredPost.date}</span>
                  <span className="blog-featured-readtime">{featuredPost.readTime}</span>
                </div>
                <h2 className="blog-featured-title">{featuredPost.title}</h2>
                <p className="blog-featured-excerpt">{featuredPost.excerpt}</p>
                <div className="blog-featured-tags">
                  {featuredPost.tags.map((tag) => (
                    <span key={tag} className="blog-tag">{tag}</span>
                  ))}
                </div>
                <button className="btn-read-more" disabled>
                  Read Article
                  <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="5" y1="12" x2="19" y2="12" />
                    <polyline points="12 5 19 12 12 19" />
                  </svg>
                </button>
              </div>
              <div className="blog-featured-visual">
                <div className="featured-visual-placeholder">
                  <svg viewBox="0 0 24 24" width="48" height="48" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
                    <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Category Filter */}
      <section className="blog-filter-section">
        <div className="container">
          <div className="blog-filter-bar">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                className={`blog-filter-btn ${activeCategory === cat ? 'active' : ''}`}
                onClick={() => setActiveCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Grid */}
      <section className="blog-grid-section">
        <div className="container">
          <div ref={gridRef} className="blog-grid">
            {filteredPosts
              .filter((p) => !p.featured)
              .map((post) => (
                <div key={post.id} className="blog-card">
                  <div className="blog-card-visual">
                    <div className="blog-card-placeholder">
                      <svg viewBox="0 0 24 24" width="32" height="32" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
                        <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
                      </svg>
                    </div>
                  </div>
                  <div className="blog-card-content">
                    <div className="blog-card-meta">
                      <span className="blog-card-category">{post.category}</span>
                      <span className="blog-card-date">{post.date}</span>
                      <span className="blog-card-readtime">{post.readTime}</span>
                    </div>
                    <h3 className="blog-card-title">{post.title}</h3>
                    <p className="blog-card-excerpt">{post.excerpt}</p>
                    <div className="blog-card-tags">
                      {post.tags.map((tag) => (
                        <span key={tag} className="blog-tag-small">{tag}</span>
                      ))}
                    </div>
                    <button className="blog-card-read-btn" disabled>
                      Read More
                      <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="5" y1="12" x2="19" y2="12" />
                        <polyline points="12 5 19 12 12 19" />
                      </svg>
                    </button>
                  </div>
                </div>
              ))}
          </div>

          {filteredPosts.filter((p) => !p.featured).length === 0 && (
            <div className="blog-empty-state">
              <p>No articles found in this category yet. Check back soon!</p>
            </div>
          )}
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="blog-newsletter-section">
        <div className="container">
          <div className="blog-newsletter-card">
            <h2 className="blog-newsletter-title">Never miss a story</h2>
            <p className="blog-newsletter-desc">
              Get our latest engineering articles, AI experiments, and company updates delivered straight to your inbox.
            </p>
            <form className="blog-newsletter-form" onSubmit={(e) => e.preventDefault()}>
              <input
                type="email"
                placeholder="your@email.com"
                className="blog-newsletter-input"
              />
              <button type="submit" className="blog-newsletter-btn">Subscribe</button>
            </form>
            <p className="blog-newsletter-note">
              No spam. Unsubscribe anytime. Read our <Link to="/">privacy policy</Link>.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
