# Implementation Plan - Bina Codes Website

We will create a premium, SEO-optimized, highly interactive website for the software house **Bina Codes** using the sand-dune/warm-chocolate theme from the screenshot. The website will showcase their custom development capabilities and integrate the provided `Hero_Section_Video.mp4` as a seamless, looping, built-in animation in the hero section.

---

## User Review Required

> [!IMPORTANT]
> **Video Integration Details**: We will place `Hero_Section_Video.mp4` into the public directory and play it inside the main interactive card on the left side of the hero section. It will be configured to autoplay, loop, and be muted with no controls (`pointer-events: none`), making it feel like a custom 3D web animation.
>
> **Design Theme**: The website will implement a premium palette:
> - Base background: Warm sand/dune beige (`#f4f1ea` to `#dfd3c3`)
> - Hero card background: Sleek dark chocolate/dune gradient (`#4e2f1d` to `#2b1408`)
> - Accent colors: Glowing orange/gold (`#f99a3c`, `#ffb86b`)
> - Typography: `Outfit` and `Inter` from Google Fonts

---

## Open Questions

> [!NOTE]
> 1. Do you have a preferred target domain or company details (e.g., location, official contact email) that we should include in the SEO meta tags and sitemap, or should we use standard placeholders for now?
> 2. Would you like the custom magnifying lens in the hero section to be interactive (e.g. follow your mouse slightly when hovering over the video)?

---

## Proposed Changes

We will bootstrap the project using **Vite + React + TypeScript** with **Vanilla CSS** to satisfy the guidelines.

### Root Folder

#### [NEW] [.gitignore](file:///d:/Bina_Codes/Bina_Codes/.gitignore)
Standard ignore file for node_modules, build outputs (`dist`), local environment files (`.env*`), and editor caches.

#### [NEW] [README.md](file:///d:/Bina_Codes/Bina_Codes/README.md)
Comprehensive documentation covering project installation, folder structure, scripts, customization guidelines, and design tokens for future development.

#### [NEW] [index.html](file:///d:/Bina_Codes/Bina_Codes/index.html)
Optimized entry point containing title, meta descriptions (SEO), Google Fonts import, viewport configuration, and favicon link.

#### [NEW] [vite.config.ts](file:///d:/Bina_Codes/Bina_Codes/vite.config.ts)
Vite configuration with support for TypeScript and static asset handling.

#### [NEW] [tsconfig.json](file:///d:/Bina_Codes/Bina_Codes/tsconfig.json)
TypeScript configuration files for app compiler standards.

---

### Component & Source Files

#### [MODIFY] [Hero_Section_Video.mp4](file:///d:/Bina_Codes/Bina_Codes/Hero_Section_Video.mp4)
Move this file into the `public/` folder so it serves as a static asset at `/Hero_Section_Video.mp4`.

#### [NEW] [variables.css](file:///d:/Bina_Codes/Bina_Codes/src/styles/variables.css)
Design tokens for colors (sand, brown, gold, gradients), typography, and transition times.

#### [NEW] [global.css](file:///d:/Bina_Codes/Bina_Codes/src/styles/global.css)
Reset and base styling (scroll behavior, custom scrollbars, typography scales).

#### [NEW] [Navbar.tsx](file:///d:/Bina_Codes/Bina_Codes/src/components/Navbar.tsx) & [Navbar.css](file:///d:/Bina_Codes/Bina_Codes/src/styles/Navbar.css)
Integrated glassmorphic navbar matching the screenshot (Home, About, About us, Contact, Log In, and Sign Up button).

#### [NEW] [Hero.tsx](file:///d:/Bina_Codes/Bina_Codes/src/components/Hero.tsx) & [Hero.css](file:///d:/Bina_Codes/Bina_Codes/src/styles/Hero.css)
The hero section containing the title "Build Together", a subtitle description, a call to action button ("Learn More"), the "Ronal Svefiit ->" chip, page indicator dots, and the visual container.
The visual container will hold:
- The looping animation video (`Hero_Section_Video.mp4`) running as a built-in animation.
- A glassmorphic magnifying lens overlay that reacts subtly to mouse hover.
- Soft floating bubbles/spheres matching the sand design.

#### [NEW] [Services.tsx](file:///d:/Bina_Codes/Bina_Codes/src/components/Services.tsx) & [Services.css](file:///d:/Bina_Codes/Bina_Codes/src/styles/Services.css)
The "Bina Servers" / services showcase below the hero. Will feature a premium 3D grid layout showing core services (e.g., cloud computing, web development, custom software).

#### [NEW] [About.tsx](file:///d:/Bina_Codes/Bina_Codes/src/components/About.tsx) & [About.css](file:///d:/Bina_Codes/Bina_Codes/src/styles/About.css)
Section describing the software house, its team, and methodology.

#### [NEW] [Contact.tsx](file:///d:/Bina_Codes/Bina_Codes/src/components/Contact.tsx) & [Contact.css](file:///d:/Bina_Codes/Bina_Codes/src/styles/Contact.css)
An interactive contact form styled with the theme.

#### [NEW] [Footer.tsx](file:///d:/Bina_Codes/Bina_Codes/src/components/Footer.tsx) & [Footer.css](file:///d:/Bina_Codes/Bina_Codes/src/styles/Footer.css)
Footer with social links and navigation.

#### [NEW] [App.tsx](file:///d:/Bina_Codes/Bina_Codes/src/App.tsx)
Layout wrapper importing and organizing all sections.

---

## Verification Plan

### Automated Tests & Checks
- Run `npm run build` to verify there are no compilation or TypeScript errors.
- Run `npx eslint` to verify code quality.

### Manual Verification
- Launch the local dev environment with `npm run dev`.
- Verify the video loops continuously, has no controls, is muted, and autoplays successfully on both mobile and desktop views.
- Test responsiveness of the navigation bar, hero layout, and service grid across screen sizes.
- Verify glassmorphic blur and micro-animations (buttons, cards, hovering magnifying glass) are smooth and visually excellent.
