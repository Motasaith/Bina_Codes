# Bina Codes Website

A premium, highly interactive, and SEO-optimized web application for the software engineering house **Bina Codes**. 
Designed using a warm desert sand and dark chocolate aesthetic, it features a glassmorphic user interface, micro-animations, and an embedded custom video animation looping seamlessly in the hero section.

---

## 🎨 Design Theme & Tokens

The theme balances the rich dark colors of premium hardware servers with the soft warmth of wind-swept sand dunes. 

- **Primary Colors:**
  - Sand base background: `#f7f5f0` / `#ece6dc`
  - Deep dark chocolate: `#4e2f1d` / `#231107`
  - Glowing gold accent: `#f99a3c` / `#ffb462`
- **Glassmorphism:**
  - Translucent backdrops (`backdrop-filter: blur(12px)`) with thin borders.
- **Typography:**
  - Headings: `Outfit` (bold, geometric, futuristic tech feel).
  - Body Copy: `Inter` (neutral, crisp, readable at small scales).

---

## 🚀 Key Features

1. **Embedded Video Hero Illustration**: The `Hero_Section_Video.mp4` asset acts as a built-in interactive animation without playback controls, rendering as a seamless component.
2. **Interactive Glass Magnifier**: An overlay magnifying lens on the hero image that tracks the user's cursor dynamically with easing.
3. **Responsive Glass Navbar**: Adapts from a floating inline header on desktop to a sliding sidebar menu panel on mobile devices.
4. **Service Showcase (Bina Servers)**: A card grid layout with custom vector graphics and server "Pulse Online" indicators.
5. **SEO & Future-Proof Setup**: Fully configured tags, OpenGraph previews, XML sitemaps, robots directives, and structured React + TypeScript coding standards.

---

## 📂 Project Structure

```text
Bina_Codes/
├── public/
│   ├── Hero_Section_Video.mp4  # Video loop for the hero panel
│   ├── robots.txt              # Search engine directives
│   └── sitemap.xml             # XML sitemap mapping
├── src/
│   ├── assets/                 # SVGs and static image resources
│   ├── components/             # Reusable UI component modules
│   │   ├── Navbar.tsx          # Responsive scrolling header navigation
│   │   ├── Hero.tsx            # Hero visual with video loop & cursor magnifier
│   │   ├── Services.tsx        # "Bina Servers" solutions listing grid
│   │   ├── About.tsx           # Company stats and philosophy statements
│   │   ├── Contact.tsx         # Interactive inquiry submission form
│   │   └── Footer.tsx          # System status footer
│   ├── styles/                 # Dedicated component stylesheets
│   │   ├── Navbar.css
│   │   ├── Hero.css
│   │   ├── Services.css
│   │   ├── About.css
│   │   ├── Contact.css
│   │   └── Footer.css
│   ├── App.tsx                 # Core layout assembler
│   ├── index.css               # Global theme variables, reset and utilities
│   └── main.tsx                # Client entry script
├── index.html                  # Core HTML template with SEO configurations
├── vite.config.ts              # Vite configurations
└── tsconfig.json               # TypeScript configurations
```

---

## ⚙️ Development Instructions

### Prerequisites
- Node.js (v20+ recommended)
- npm (v10+ recommended)

### Quick Start
1. **Install Dependencies**:
   ```bash
   npm install
   ```
2. **Run Dev Server**:
   ```bash
   npm run dev
   ```
   Open `http://localhost:5173` in your browser.
3. **Build Static Files**:
   ```bash
   npm run build
   ```
   Static files are compiled into the `/dist` directory, fully prepared for edge network hosting (e.g. Vercel, Netlify, Github Pages, AWS S3).
