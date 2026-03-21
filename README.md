# Cityscape Consulting — Frontend Showcase

This repository contains a premium React + Vite + Tailwind CSS frontend prototype for Cityscape Consulting, focused on conversion-ready real estate brand presentation and interactive UX. It is frontend-only and does not include backend integrations.

## Tech Stack

- React + Vite
- Tailwind CSS
- Framer Motion
- Lucide React

## Setup

```bash
npm install
npm run dev
```

Build:

```bash
npm run build
npm run preview
```

## Project Structure

```text
src/
├─ components/
│  └─ ui/
│     ├─ PrimaryButton.jsx
│     ├─ SectionHeader.jsx
│     ├─ RevealCard.jsx
│     └─ AnimatedCounter.jsx
  └─ layout/
     └─ Navbar.jsx
├─ data/
│  └─ siteData.js
├─ sections/
│  ├─ HeroSection.jsx
│  ├─ AboutSection.jsx
│  ├─ ServicesSection.jsx
│  ├─ ProjectsSection.jsx
│  ├─ PartnersSection.jsx
│  ├─ ProcessSection.jsx
│  ├─ ImpactSection.jsx
│  ├─ TestimonialsSection.jsx
│  ├─ ContactSection.jsx
│  ├─ ChatWidget.jsx
│  └─ FooterSection.jsx
└─ App.jsx
```

## Editable content

All marketing content is centralized in:

- `src/data/siteData.js`

You can update:

- Brand name and statements
- Hero copy and badge cards
- About section narrative
- Service cards
- Projects and project filters
- Partner names
- Process steps
- Impact metrics
- Testimonials
- Contact and social links
- Chat prompts
- Partner logos

### Where to add partner logo images

- Create the folder: `public/partner-logos/`
- Add these files (PNG or SVG recommended, around square ratio):
  - `millionaire-tower-logo.png`
  - `walderwood-logo.png`
  - `jankal-group-logo.png`
  - `solaris-logo.png`
  - `nester-logo.png`
  - `hillside-harmony-logo.png`
  - `futurearth-group-logo.png`
  - `fortjala-logo.png`
- If needed, update paths in `src/data/siteData.js` under `partners`.

## Backend integration notes (future)

- `ContactSection` form is currently frontend-only and only prevents default submission.
- To wire a backend later, replace `onSubmit` in `ContactSection.jsx` with a `fetch`/`axios` call.
- `ChatWidget.jsx` currently uses local state to simulate conversation. Replace message append logic with your messaging API/websocket and file upload handlers for production.

## Notes

- Design uses remote images from Unsplash and placeholder data by default.
- Navbar, cards, hover interactions, animated reveals, count-up metrics, filter UI, and floating chat are all implemented with pure frontend behavior.
- Responsive behavior is tuned for mobile, tablet, and desktop layouts.
