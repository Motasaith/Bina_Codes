export interface Service {
  id: string;
  name: string;
  category: string;
  description: string;
  whatsIncluded: string[];
  basePricePKR: number;
}

export interface Category {
  id: string;
  name: string;
  description: string;
  icon: string;
}

export interface Currency {
  code: string;
  symbol: string;
  rate: number; // 1 PKR = X Currency (conversion multiplier)
  format: string;
}

export interface Bundle {
  id: string;
  name: string;
  description: string;
  serviceIds: string[];
  discountPKR: number;
}

export const CURRENCIES: Currency[] = [
  { code: 'PKR', symbol: 'Rs.', rate: 1, format: 'Rs. {value}' },
  { code: 'USD', symbol: '$', rate: 0.0036, format: '${value}' }, // 1 USD = 278 PKR
  { code: 'EUR', symbol: '€', rate: 0.0033, format: '€{value}' }, // 1 EUR = 303 PKR
  { code: 'GBP', symbol: '£', rate: 0.0028, format: '£{value}' }, // 1 GBP = 357 PKR
];

export const CATEGORIES: Category[] = [
  {
    id: 'full-stack',
    name: 'Full-Stack Development',
    description: 'Custom, high-performance web applications built from scratch with robust backends and premium frontends.',
    icon: 'code-bracket'
  },
  {
    id: 'e-commerce',
    name: 'E-Commerce Solutions',
    description: 'Feature-rich online stores designed for high conversions, smooth checkouts, and seamless payment integrations.',
    icon: 'shopping-cart'
  },
  {
    id: 'ai-automation',
    name: 'AI & Automation',
    description: 'Transformative AI integrations, intelligent chatbots, autonomous agents, and time-saving workflow automations.',
    icon: 'cpu'
  },
  {
    id: 'data-ml',
    name: 'Data Science & Analytics',
    description: 'Data pipelines, custom machine learning models, and interactive analytics dashboards to drive business decisions.',
    icon: 'chart-bar'
  },
  {
    id: 'cloud-devops',
    name: 'Cloud & DevOps',
    description: 'Secure, scalable cloud infrastructure setups, containerized deployments, and robust CI/CD automation pipelines.',
    icon: 'cloud-arrow-up'
  },
  {
    id: 'cms-wordpress',
    name: 'CMS & WordPress',
    description: 'Beautiful, fully-customizable WordPress websites, bespoke plugins, speed optimizations, and CMS migrations.',
    icon: 'globe-alt'
  },
  {
    id: 'design-consulting',
    name: 'Design & Consulting',
    description: 'Premium UI/UX designs, comprehensive SEO audits, conversion optimizations, and expert technical consulting.',
    icon: 'academic-cap'
  }
];

export const SERVICES: Service[] = [
  // Full-Stack Development
  {
    id: 'web-mern',
    name: 'Full-Stack MERN Application',
    category: 'full-stack',
    description: 'End-to-end web application development using MongoDB, Express.js, React, and Node.js with secure authentication and real-time features.',
    whatsIncluded: ['Database Architecture & Modeling', 'Secure JWT Authentication', 'RESTful API Backend', 'Interactive React Frontend', 'Responsive UI Design', 'Lenis Smooth Scroll'],
    basePricePKR: 180000
  },
  {
    id: 'web-nextjs',
    name: 'Next.js Frontend Development',
    category: 'full-stack',
    description: 'SEO-optimized, server-side rendered (SSR) or statically generated (SSG) frontend applications using Next.js, React, and TypeScript.',
    whatsIncluded: ['Next.js App/Pages Router setup', 'Server-Side Rendering (SSR)', 'SEO Meta Tag Optimization', 'Responsive Tailwind/Vanilla CSS', 'API Routing & Fetching', 'Core Web Vitals Optimization'],
    basePricePKR: 120000
  },
  {
    id: 'web-express',
    name: 'Node.js & Express Backend API',
    category: 'full-stack',
    description: 'Robust, scale-ready backend API service with database integrations, error handling, rate limiting, and structured logging.',
    whatsIncluded: ['Structured Express/TypeScript project', 'JWT Auth & Middleware', 'Database Integration (SQL or NoSQL)', 'Error Handling & Validation', 'Swagger API Documentation', 'Unit & Integration Tests'],
    basePricePKR: 90000
  },
  {
    id: 'web-fastapi',
    name: 'FastAPI / Python Backend',
    category: 'full-stack',
    description: 'High-performance Python backend API powered by FastAPI, ideal for ML models, background tasks, and fast database transactions.',
    whatsIncluded: ['Pydantic Data Validation', 'Asynchronous Endpoint Handlers', 'SQLAlchemy / Tortoise ORM setup', 'Automated OpenAPI Docs', 'Celery Background Tasks', 'Dockerized Setup'],
    basePricePKR: 100000
  },
  {
    id: 'web-api-integrate',
    name: 'REST & GraphQL API Integration',
    category: 'full-stack',
    description: 'Seamless integration of third-party APIs (Stripe, Twilio, Salesforce, HubSpot) or migration from REST to GraphQL architectures.',
    whatsIncluded: ['Third-party SDK Integration', 'GraphQL Schema & Resolvers', 'Caching & Rate Limit Management', 'Data Syncing & Webhooks', 'Secure Key Storage (Env)', 'Robust Error Fallbacks'],
    basePricePKR: 55000
  },
  {
    id: 'web-spa',
    name: 'Single Page Application (SPA)',
    category: 'full-stack',
    description: 'Superfast Single Page Application built with React or Vue, providing a desktop-app-like experience in the browser.',
    whatsIncluded: ['React Router Client Navigation', 'Global State Management (Zustand/Redux)', 'Rich Micro-animations', 'Asynchronous Data Fetching', 'Local Storage Caching', 'Webpack/Vite Bundler Tuning'],
    basePricePKR: 75000
  },
  {
    id: 'web-pwa',
    name: 'Progressive Web App (PWA)',
    category: 'full-stack',
    description: 'Transform your website into a mobile-installable Progressive Web App that works offline, supports push notifications, and loads instantly.',
    whatsIncluded: ['Service Worker Configuration', 'Offline Caching Strategy', 'PWA Install Prompt UI', 'Web App Manifest Setup', 'Push Notifications Integration', 'Lighthouse PWA Validation'],
    basePricePKR: 80000
  },

  // E-Commerce Solutions
  {
    id: 'shop-custom',
    name: 'Custom MERN E-Commerce Store',
    category: 'e-commerce',
    description: 'Bespoke online store built from scratch with custom product filters, shopping cart, admin dashboard, inventory tracking, and checkout.',
    whatsIncluded: ['Product Catalog & Advanced Filters', 'Shopping Cart & Wishlist', 'Admin Dashboard (Order/Product management)', 'Stripe/PayPal Integration', 'Automated Transactional Emails', 'Sales Analytics Dashboard'],
    basePricePKR: 220000
  },
  {
    id: 'shop-woo',
    name: 'WooCommerce Store Development',
    category: 'e-commerce',
    description: 'Customized WooCommerce/WordPress online store, including plugin configurations, custom checkout processes, and speed optimization.',
    whatsIncluded: ['WooCommerce Core Configuration', 'Theme Selection & Customization', 'Payment & Shipping Rules Setup', 'Bulk Product Import Support', 'Security Hardening', 'Basic SEO Configuration'],
    basePricePKR: 75000
  },
  {
    id: 'shop-shopify',
    name: 'Shopify Setup & Liquid Editing',
    category: 'e-commerce',
    description: 'Setting up Shopify stores, installing apps, configuring shipping/taxes, and modifying Liquid files for custom designs.',
    whatsIncluded: ['Store Creation & Base Configuration', 'App Audit & Integration', 'Liquid Template Custom Tweaks', 'Custom Cart Drawer Setup', 'Conversion-focused Homepage Layout', 'Payment Gateway Connect'],
    basePricePKR: 60000
  },
  {
    id: 'shop-payments',
    name: 'Stripe & Payment Gateway Connect',
    category: 'e-commerce',
    description: 'Secure, SCA-compliant payment integration supporting one-time payments, subscriptions, refunds, and webhook events.',
    whatsIncluded: ['Stripe Element/Checkout API', 'Multi-currency Handling', 'Subscription / Billing Plan Setup', 'Webhook Listening Endpoint', 'Invoice PDF Auto-generation', 'PCI Compliance Consulting'],
    basePricePKR: 45000
  },
  {
    id: 'shop-multivendor',
    name: 'Multi-Vendor Marketplace Development',
    category: 'e-commerce',
    description: 'Complex marketplace platform (like Amazon/Etsy) where multiple vendors can list, sell, and manage products with split payments.',
    whatsIncluded: ['Vendor Registration & Dashboard', 'Commission Structure Setup', 'Split-Payment Setup (Stripe Connect)', 'Product Approval Workflow', 'Vendor Specific Shipping Rules', 'Customer-Vendor Messaging System'],
    basePricePKR: 300000
  },

  // AI & Automation
  {
    id: 'ai-webapp',
    name: 'AI-Powered Web Application',
    category: 'ai-automation',
    description: 'Custom web apps leveraging AI for text generation, image manipulation, audio transcription, or recommendations.',
    whatsIncluded: ['AI API Integrations (OpenAI, Gemini)', 'Dynamic Frontend UI for AI Prompts', 'Streaming Text/Markdown Output', 'Token Usage Cost Optimization', 'Image/Audio Media Processing', 'User Prompt History Logging'],
    basePricePKR: 180000
  },
  {
    id: 'ai-llm',
    name: 'LLM Integration & Prompt Engineering',
    category: 'ai-automation',
    description: 'Integrating state-of-the-art LLMs (Claude, GPT-4, DeepSeek) into your software and optimizing prompts for structured outputs.',
    whatsIncluded: ['LLM Provider Selection & Setup', 'Structured JSON Output Parsers', 'Few-shot & Chain-of-thought Prompts', 'Prompt Versioning & Testing', 'Fallback Models Config', 'Latency Reduction Tweaks'],
    basePricePKR: 90000
  },
  {
    id: 'ai-chatbot',
    name: 'RAG-Based AI Chatbot',
    category: 'ai-automation',
    description: 'Intelligent chatbot trained on your custom documents (PDF, Docx, Notion, Website URLs) using Vector Databases for Retrieval Augmented Generation.',
    whatsIncluded: ['Document Ingestion & Chunking', 'Vector Database Setup (Pinecone/PGVector)', 'Embedding Model Selection', 'Retrieval Chain Implementation', 'Web Chat Widget Embed', 'Admin Chat History Viewer'],
    basePricePKR: 140000
  },
  {
    id: 'ai-agent',
    name: 'Autonomous AI Agent Workflows',
    category: 'ai-automation',
    description: 'AI Agents capable of planning, executing tools, calling external APIs, searching the web, and making decisions based on goals.',
    whatsIncluded: ['Agent Architecture (LangGraph/CrewAI)', 'Tool Definition & API Bindings', 'State Management & Memory', 'Human-in-the-loop Approvals', 'Recursive Loop Safeguards', 'Structured Progress Logs'],
    basePricePKR: 240000
  },
  {
    id: 'ai-scraping',
    name: 'Browser Automation & Scraping',
    category: 'ai-automation',
    description: 'Custom scrapers and automation bots built with Puppeteer, Playwright, or Selenium to bypass CAPTCHAs, extract data, or automate actions.',
    whatsIncluded: ['Headless Browser Automation', 'CAPTCHA Solving Integration', 'JSON/CSV Data Export Pipelines', 'Proxy Rotation Configuration', 'Scheduled Scraping Cronjobs', 'Dynamic Content Loading Handling'],
    basePricePKR: 70000
  },
  {
    id: 'ai-social',
    name: 'Social Media Automation Tools',
    category: 'ai-automation',
    description: 'Automated post generators, schedulers, and interactions for LinkedIn, X (Twitter), Instagram, or Facebook.',
    whatsIncluded: ['Platform API Key Setup', 'Content Generator Prompts', 'Image Overlay Generation (Buffer/Canva API)', 'Post Scheduler Engine', 'Engagement Bot / Reply Generator', 'Analytics Dashboard'],
    basePricePKR: 95000
  },
  {
    id: 'ai-youtube',
    name: 'YouTube Content Automation Pipeline',
    category: 'ai-automation',
    description: 'Automated system that takes articles, scripts them, generates assets (voiceover/images), and uploads them via the YouTube API.',
    whatsIncluded: ['Script Generator LLM Agent', 'Text-to-Speech API (ElevenLabs)', 'Automatic Image/Video Sourcing', 'Metadata and Description Builder', 'YouTube API Upload Integrations', 'Rendering Server Configuration'],
    basePricePKR: 130000
  },
  {
    id: 'ai-n8n',
    name: 'Workflow Automation (n8n, Make, Custom)',
    category: 'ai-automation',
    description: 'Automate business workflows by connecting tools (Gmail, Slack, CRM, Google Sheets, Trello, Discord) together without manual work.',
    whatsIncluded: ['n8n Self-hosted / Cloud setup', 'Custom API Webhook Triggers', 'Data Mapping & Transformation', 'Error Alerts & Notifications', 'Multi-step Logic & Router Config', '1-Month Post-Setup Support'],
    basePricePKR: 65000
  },

  // Data Science & Analytics
  {
    id: 'data-ml-model',
    name: 'ML Model Development & Deployment',
    category: 'data-ml',
    description: 'Training custom predictive models, classifier models, or recommendation systems and deploying them as API endpoints.',
    whatsIncluded: ['Data Cleaning & Preprocessing', 'Model Selection & Training', 'Hyperparameter Tuning', 'API Deployment (Docker/AWS)', 'Model Inference Speedup', 'Accuracy Evaluation Reports'],
    basePricePKR: 200000
  },
  {
    id: 'data-engineering',
    name: 'Data Engineering & Pipeline Design',
    category: 'data-ml',
    description: 'Building robust ETL/ELT pipelines to extract, clean, transform, and load data from various sources into a centralized database or data warehouse.',
    whatsIncluded: ['ETL Scripting (Python/pandas)', 'Database Schema Design', 'Scheduled Crons / Airflow setup', 'Data Quality Validation Checks', 'API Payload Formatting', 'Database Indexing Optimization'],
    basePricePKR: 140000
  },
  {
    id: 'data-dashboards',
    name: 'Interactive Analytics Dashboards',
    category: 'data-ml',
    description: 'Interactive, fast web dashboards built with Streamlit, Shiny, or React + Chart.js to visualize metrics, charts, and forecasts.',
    whatsIncluded: ['Streamlit / React-Chart custom app', 'Real-time Chart Visualizations', 'CSV/Excel Export Features', 'User Filters & Query Forms', 'Database Read Connections', 'Responsive Grid Dashboard Layout'],
    basePricePKR: 85000
  },
  {
    id: 'data-predictive',
    name: 'Predictive Modeling & Forecasting',
    category: 'data-ml',
    description: 'Analyzing historical time-series data to forecast future sales, customer churn, resource demand, or financial trends.',
    whatsIncluded: ['Time-series Analysis (Prophet, ARIMA)', 'Feature Engineering', 'Confidence Intervals Calculation', 'Interactive Forecast Plots', 'Anomaly Detection Logic', 'Excel-compatible Summary Sheet'],
    basePricePKR: 100000
  },
  {
    id: 'data-nlp',
    name: 'NLP & Text Analytics Solutions',
    category: 'data-ml',
    description: 'Processing raw text data for sentiment analysis, keyword extraction, entity recognition, or document classification.',
    whatsIncluded: ['Regex & Tokenization Pipelines', 'Sentiment Scoring Engine', 'Named Entity Recognition (NER)', 'Custom Text Classifiers', 'Word-Cloud & Summary Plots', 'Batch Processing Optimization'],
    basePricePKR: 95000
  },
  {
    id: 'data-scraping-scale',
    name: 'Data Extraction & Scraping at Scale',
    category: 'data-ml',
    description: 'Industrial-grade scraping engines designed to pull millions of data points from complex websites and store them in structured formats.',
    whatsIncluded: ['Distributed Scraping Architecture', 'Data Deduplication Filters', 'S3 / Cloud Storage Exports', 'Anti-blocking Countermeasures', 'Error Retry Queue System', 'Auto-update Scraper Engine'],
    basePricePKR: 110000
  },

  // Cloud & DevOps
  {
    id: 'cloud-aws-gcp',
    name: 'AWS / GCP Cloud Architecture Design',
    category: 'cloud-devops',
    description: 'Designing secure, cost-optimized, and highly-available virtual cloud networks on Amazon Web Services or Google Cloud Platform.',
    whatsIncluded: ['VPC, Subnet & Firewall Design', 'EC2 / Compute Engine setup', 'Auto-scaling & Load Balancers', 'IAM Security Policy Audits', 'RDS/Cloud SQL Deployments', 'Cost Estimation & Budget Alerts'],
    basePricePKR: 130000
  },
  {
    id: 'cloud-cicd',
    name: 'CI/CD Pipeline Setup',
    category: 'cloud-devops',
    description: 'Automating tests, linting, building, and deploying processes on every code commit using GitHub Actions or GitLab CI.',
    whatsIncluded: ['GitHub Actions Workflow YAMLs', 'Lint & Test Automation runners', 'Docker Build & Registry push', 'Automated Dev/Staging Deployments', 'Slack / Discord Webhook Alerts', 'Secure API Key Secret Injectors'],
    basePricePKR: 65000
  },
  {
    id: 'cloud-docker',
    name: 'Docker & Kubernetes Containers',
    category: 'cloud-devops',
    description: 'Containerizing multi-service applications using Docker Compose and setting up orchestration via Kubernetes (EKS/GKE).',
    whatsIncluded: ['Optimized Multi-stage Dockerfiles', 'docker-compose.yml Local setups', 'K8s Deployment & Service YAMLs', 'ConfigMaps & Secrets management', 'Ingress Controller setup', 'Container Resource Limit tweaks'],
    basePricePKR: 110000
  },
  {
    id: 'cloud-serverless',
    name: 'Serverless Application Deployments',
    category: 'cloud-devops',
    description: 'Deploying React/Next.js frontends to Vercel/Netlify, and APIs to serverless functions (AWS Lambda, Google Cloud Run) for zero-maintenance scaling.',
    whatsIncluded: ['Vercel/Netlify Configuration', 'AWS Lambda Function deployments', 'Cloud Run Service setups', 'API Gateway Route Mapping', 'Cold-start Latency Tweaks', 'Serverless Database Connectors'],
    basePricePKR: 60000
  },
  {
    id: 'cloud-db-opt',
    name: 'Database Optimization & Migration',
    category: 'cloud-devops',
    description: 'Migrating legacy databases to modern cloud instances (e.g., SQLite to PostgreSQL) and tuning queries, indexes, and schemas for maximum speed.',
    whatsIncluded: ['Database Backup & Safe Migration', 'Query Plan Profiling & Fixes', 'Index Structure Optimizations', 'Connection Pooling setups', 'Database Replication Configuration', 'Security Access Control Auditing'],
    basePricePKR: 90000
  },
  {
    id: 'cloud-ssl-dns',
    name: 'SSL, DNS & Domain Configuration',
    category: 'cloud-devops',
    description: 'Setting up custom domains, nameservers, MX records for business emails, and generating wildcard SSL certificates.',
    whatsIncluded: ['DNS Registrar Configuration', 'Cloudflare Proxy Security setup', 'Let\'s Encrypt SSL Certificates', 'MX & TXT (SPF/DKIM/DMARC) Setup', 'Subdomain redirection routing', 'HTTPS Enforced Redirects'],
    basePricePKR: 25000
  },
  {
    id: 'cloud-speed-opt',
    name: 'Speed & Web Vitals Optimization',
    category: 'cloud-devops',
    description: 'Audit and code improvements to speed up page loads, increase Google PageSpeed scores, and hit Green Core Web Vitals.',
    whatsIncluded: ['Lighthouse Audit Profiling', 'Image Compression & Next-gen formats', 'Code Splitting & Tree Shaking', 'CDN Setup (Cloudflare/AWS CloudFront)', 'Caching Headers Tweaking', 'Render-blocking JS/CSS elimination'],
    basePricePKR: 50000
  },

  // CMS & WordPress
  {
    id: 'cms-wp-custom',
    name: 'Custom WordPress Website',
    category: 'cms-wordpress',
    description: 'A fully responsive WordPress website featuring clean custom design, pages, blog, contact forms, and security integrations.',
    whatsIncluded: ['Custom WordPress Theme Setup', 'Responsive Landing & Inner Pages', 'Elementor/Gutenberg layouts', 'Contact Form 7 / WPForms Setup', 'SEO plugin (RankMath/Yoast) configuration', 'Basic Speed Optimizations'],
    basePricePKR: 55000
  },
  {
    id: 'cms-wp-theme',
    name: 'WordPress Theme Customization',
    category: 'cms-wordpress',
    description: 'Redesigning or customizing an existing WordPress theme, modifying PHP files, and adding custom CSS for unique layouts.',
    whatsIncluded: ['WordPress Child Theme creation', 'PHP template files editing', 'Custom CSS Styling integration', 'Typography & Color changes', 'Custom Post Types (CPT) setup', 'Custom Fields (ACF) Setup'],
    basePricePKR: 40000
  },
  {
    id: 'cms-builders',
    name: 'Elementor / Divi Layout Builder',
    category: 'cms-wordpress',
    description: 'Building custom pages, landing pages, and theme builders (header/footer/archives) using Elementor Pro, Divi, or Bricks.',
    whatsIncluded: ['Elementor Pro Page Builder layouts', 'Custom Header & Footer builder', 'Dynamic post template designs', 'Mobile-responsive spacing fixes', 'Interactive widgets configuration', 'Form & Popup integrations'],
    basePricePKR: 35000
  },
  {
    id: 'cms-wp-security',
    name: 'WP Speed & Security Hardening',
    category: 'cms-wordpress',
    description: 'Improving WordPress site loading speeds and security configs to block hacker injections and brute-force logins.',
    whatsIncluded: ['Cache Plugin (WP Rocket/LiteSpeed) config', 'Database Cleaning & Autoptimize', 'Brute-force Login Protection', 'Wordfence / Sucuri Security Audit', 'Database Prefix Altering', 'Auto-backup scheduling'],
    basePricePKR: 30000
  },
  {
    id: 'cms-migration',
    name: 'CMS Migration to WordPress',
    category: 'cms-wordpress',
    description: 'Migrating content, pages, images, and posts from Wix, Squarespace, or HTML sites to a clean WordPress installation.',
    whatsIncluded: ['CMS Content Export & Mapping', 'WordPress Site Import Setup', 'URL Structure & Redirects Setup', 'Image Path Relinking', 'Theme Replication Layout Design', 'DNS & Hosting Transfer Support'],
    basePricePKR: 55000
  },
  {
    id: 'cms-wp-plugin',
    name: 'Custom WordPress Plugin Development',
    category: 'cms-wordpress',
    description: 'Coding custom PHP plugins to add bespoke features, custom shortcodes, or admin options panels in WordPress.',
    whatsIncluded: ['Custom PHP Plugin Coding', 'WordPress Hook/Filter Registrations', 'Admin Options Dashboard Page', 'Database Table Creation (optional)', 'Shortcode / Block integrations', 'Secure Input Sanitization'],
    basePricePKR: 70000
  },
  {
    id: 'cms-blog',
    name: 'Blog & Portfolio Site Setup',
    category: 'cms-wordpress',
    description: 'Setting up a professional personal blog, author site, or portfolio showcase to present articles and work beautifully.',
    whatsIncluded: ['Category & Tag Architecture', 'Newsletter Form Widget Connect', 'Social Share integrations', 'Author Box & Profile Bio Layout', 'Portfolio Grid Filter Layout', 'Contact Info & Map footer'],
    basePricePKR: 40000
  },

  // Design & Consulting
  {
    id: 'design-ux',
    name: 'Figma UI/UX Wireframing & Design',
    category: 'design-consulting',
    description: 'Creating high-fidelity web/app designs in Figma, complete with vector layouts, grid alignments, and interactive prototypes.',
    whatsIncluded: ['User Flow & Wireframe Sketches', 'High-Fidelity UI Mockups', 'Interactive Figma Prototypes', 'Design System Components (Tokens)', 'Developer Handoff Redlines', '3 Iteration Review Cycles'],
    basePricePKR: 65000
  },
  {
    id: 'design-responsive',
    name: 'Responsive Design System Design',
    category: 'design-consulting',
    description: 'Defining consistent brand fonts, colors, spacings, button states, and layout grids to use across multiple digital projects.',
    whatsIncluded: ['Typography Hierarchies (Desktop/Mobile)', 'Harmonious Color Palette Tokens', 'Bespoke Button & Card Components', 'Form Input fields Design system', 'Figma Shared Styles Library', 'CSS Variable Code Sheet Export'],
    basePricePKR: 45000
  },
  {
    id: 'design-logo',
    name: 'Brand Identity & Logo Design',
    category: 'design-consulting',
    description: 'Creating vector logos, typography pairings, color rules, and complete brand style guides for startups or redesigns.',
    whatsIncluded: ['3 Custom Logo Design Concepts', 'Vector Formats (SVG, EPS, PDF)', 'Typography Pairing guidelines', 'Color Palette Rules & Usage', 'Social Media Profile Templates', 'Brand Guidelines PDF Booklet'],
    basePricePKR: 40000
  },
  {
    id: 'consult-tech',
    name: 'Technical Consulting & Architecture',
    category: 'design-consulting',
    description: 'Expert consultation on selecting database engines, hosting architectures, frontend stacks, and security protocols for new apps.',
    whatsIncluded: ['2-Hour Zoom Consulting Session', 'Database/Tech Selection Report', 'System Architecture Block Diagram', 'Security Best Practices Checklist', 'Scalability & Cost Projection Report', 'Questions & Answers Follow-up'],
    basePricePKR: 50000
  },
  {
    id: 'consult-roadmap',
    name: 'Product Roadmap & Spec Writing',
    category: 'design-consulting',
    description: 'Translating business ideas into structured technical specification documents, user stories, and features backlogs.',
    whatsIncluded: ['Feature Breakdown Document (PRD)', 'User Stories & Epics outlines', 'Gantt Timeline Schedule proposal', 'API Schema Request Drafts', 'Figma Layout Recommendations', 'Scrum Sprint Planning Setup'],
    basePricePKR: 55000
  },
  {
    id: 'design-seo',
    name: 'Comprehensive SEO Audit & Setup',
    category: 'design-consulting',
    description: 'Auditing page layouts, schemas, titles, descriptions, and keywords to rank higher in search engines (Google, Bing).',
    whatsIncluded: ['Screaming Frog Crawl Audit Report', 'Keyword Gap & Volume Analysis', 'Title/Meta Description Tweaks', 'Google Search Console Connect', 'XML Sitemap & Robots.txt Config', 'Schema Markup JSON-LD Setup'],
    basePricePKR: 45000
  },
  {
    id: 'design-copy',
    name: 'Copywriting & Content Strategy',
    category: 'design-consulting',
    description: 'Writing high-converting, professional, and SEO-optimized copy for web pages, landing sections, and call-to-actions.',
    whatsIncluded: ['Homepage & Hero Copywriting', 'Core Services descriptions text', 'About us / Story Content draft', 'Value Proposition & CTA tuning', 'Tone of Voice Guide definition', 'Keyword Injected Web Page copy'],
    basePricePKR: 35000
  },
  {
    id: 'design-cro',
    name: 'Conversion Rate Optimization (CRO)',
    category: 'design-consulting',
    description: 'Auditing user flows and applying design patterns (smaller menus, floating CTAs, clearer grids) to convert visitors into customers.',
    whatsIncluded: ['UX Hotjar/Heatmap Analysis Review', 'Form Fields Simplification audit', 'Primary/Secondary CTA alignment', 'A/B Testing Strategy blueprint', 'Landing Page Speed impact review', 'Mobile Usability Audit list'],
    basePricePKR: 50000
  },
  {
    id: 'design-icons',
    name: 'Custom Vector Illustrations & Icons',
    category: 'design-consulting',
    description: 'Bespoke, scalable SVG vector drawings and custom-tailored icon sets matching your branding style perfectly.',
    whatsIncluded: ['12 Custom Hand-drawn SVG Icons', '2 Hero Web illustrations', 'Tailored Color Injection', 'Responsive ViewBox definitions', 'Figma Asset Export Library', 'Commercial Usage License'],
    basePricePKR: 30000
  },
  {
    id: 'design-api-docs',
    name: 'API Design & Documentation Spec',
    category: 'design-consulting',
    description: 'Designing developer-friendly REST/GraphQL APIs and generating interactive Postman collections or Swagger files.',
    whatsIncluded: ['REST API URI endpoint path design', 'Request/Response Payload Schema YAML', 'Swagger / OpenAPI 3.0 file', 'Postman Collection Export', 'Authentication Flow diagram', 'Error Status Code Mapping'],
    basePricePKR: 45000
  }
];

export const BUNDLES: Bundle[] = [
  {
    id: 'landing-page-seo',
    name: 'Starter Landing Page Bundle',
    description: 'Perfect for startups looking to launch a fast, beautiful landing page optimized for search engines.',
    serviceIds: ['design-ux', 'web-nextjs', 'design-seo'],
    discountPKR: 40000,
  },
  {
    id: 'ecommerce-launch',
    name: 'E-Commerce Launch Bundle',
    description: 'A complete custom e-commerce setup with payments, speed tuning, and SEO indexing.',
    serviceIds: ['shop-custom', 'shop-payments', 'cloud-speed-opt', 'design-seo'],
    discountPKR: 80000,
  },
  {
    id: 'ai-automation-suite',
    name: 'AI Chatbot Automation Suite',
    description: 'Connect an intelligent RAG chatbot with automated workflows and backend APIs.',
    serviceIds: ['ai-chatbot', 'ai-n8n', 'web-api-integrate'],
    discountPKR: 40000,
  },
  {
    id: 'wordpress-starter',
    name: 'WordPress Starter Bundle',
    description: 'Get a clean custom WordPress site fully optimized for speed and security.',
    serviceIds: ['cms-wp-custom', 'cms-wp-security'],
    discountPKR: 10000,
  }
];

// Quick helper to format price based on selected currency
export function formatPrice(pricePKR: number, currency: Currency): string {
  const converted = Math.round(pricePKR * currency.rate);
  // Add thousands separators
  const formattedVal = converted.toLocaleString();
  return currency.format.replace('{value}', formattedVal);
}
