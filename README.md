# Harong Bakehouse

A fictional contemporary Filipino artisan bakery concept designed as a polished editorial storefront built with React, TypeScript, and Vite.

> Harong Bakehouse is a concept project for portfolio and design exploration. It does not represent a real bakery or ordering experience.

## Overview

Harong Bakehouse is a design-forward, bakery-inspired experience that explores how a small artisan bakehouse might feel online: warm, tactile, inviting, and product-focused. The project centers on a slow-mornings brand narrative, using layered serif typography, warm neutrals, and generous product photography rather than aggressive sales tactics.

This project was built to showcase:

- a premium brand landing page with editorial storytelling
- a full product catalog spanning croissants, breads, cakes and tarts, cookies, and seasonal specials
- cart, variant selection, and checkout interactions
- a Messenger-based order and custom order inquiry flow
- responsive, accessible UI patterns in a multi-page experience
- a front-end portfolio sample without a real ordering backend

## Project goals

- Translate a contemporary Filipino bakehouse brand into a warm, editorial web experience
- Present a rich product catalog with categories, variants, and detailed product storytelling
- Build a smooth shopping flow — browse, search, cart, and inquiry-based checkout — without a payment backend
- Keep the interface accessible, responsive, and rooted in atmosphere and brand tone

## Features

- Multi-page experience for home, shop, product details, brand story, custom orders, FAQ, contact, and privacy policy
- Editorial visual style with warm ivory, oat, and espresso tones and terracotta accents
- Nineteen products across five categories with variants, ingredients, allergens, and preparation notes
- Quick search modal for finding pastries and breads from anywhere in the app
- Slide-out cart drawer with variant selection, quantity controls, and live totals
- Checkout modal that builds a structured order message and opens Facebook Messenger for inquiry
- Custom celebration and bulk order inquiry form integrated into the brand narrative
- Hash-based routing with deep-linkable product and category pages
- Responsive layout with a mobile navigation drawer
- Toast notifications for cart and form feedback

## Tech stack

- [React 19](https://react.dev/)
- [Vite 8](https://vitejs.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS v4](https://tailwindcss.com/)
- [Motion](https://motion.dev/) for animation
- [Lucide React](https://lucide.dev/) for icons
- [Cormorant Garamond](https://fonts.google.com/specimen/Cormorant+Garamond)
- [Playfair Display](https://fonts.google.com/specimen/Playfair+Display)
- [DM Sans](https://fonts.google.com/specimen/DM+Sans)

## Getting started

```bash
npm install
npm run dev
```

The app runs on port `3000` and is exposed to the network via `--host=0.0.0.0`.

## Available scripts

| Script | Description |
| --- | --- |
| `npm run dev` | Start the Vite development server on port 3000 |
| `npm run build` | Build the project for production |
| `npm run preview` | Preview the built app locally |
| `npm run lint` | Run TypeScript type checks with `tsc --noEmit` |

## Project structure

```text
.
├── .env.example
├── .gitignore
├── LICENSE
├── README.md
├── index.html
├── metadata.json
├── package.json
├── package-lock.json
├── tsconfig.json
├── vite.config.ts
├── public/
├── src/
│   ├── App.tsx
│   ├── index.css
│   ├── main.tsx
│   ├── components/
│   │   ├── cart/
│   │   │   ├── CartDrawer.tsx
│   │   │   └── OrderCheckoutModal.tsx
│   │   ├── layout/
│   │   │   ├── Footer.tsx
│   │   │   └── Navbar.tsx
│   │   ├── products/
│   │   │   ├── ProductCard.tsx
│   │   │   └── SearchModal.tsx
│   │   └── ui/
│   │       └── Toast.tsx
│   ├── config/
│   │   ├── brand.ts
│   │   └── messenger.ts
│   ├── context/
│   │   └── CartContext.tsx
│   ├── data/
│   │   ├── faq.ts
│   │   ├── products.ts
│   │   └── testimonials.ts
│   ├── pages/
│   │   ├── Contact.tsx
│   │   ├── CustomOrders.tsx
│   │   ├── FAQ.tsx
│   │   ├── Home.tsx
│   │   ├── OurStory.tsx
│   │   ├── PrivacyPolicy.tsx
│   │   ├── ProductDetails.tsx
│   │   └── Shop.tsx
│   └── types/
│       └── index.ts
└── .env.example
```

## Design direction

The design language is intentionally warm and editorial:

- ivory and oat backgrounds with deep espresso text
- terracotta and olive accents evoking crusts, grains, and fermentation
- large Cormorant Garamond and Playfair Display headings with quiet DM Sans support typography
- generous whitespace, refined micro-typography, and soft overlay transitions
- content-driven product storytelling with unhurried brand voice — "The art of slow mornings."

## Ordering flow

There is no payment backend. Ordering is demonstrated through an inquiry workflow:

1. Add products to the cart from the shop or product pages
2. Review items in the cart drawer and continue to checkout
3. Fill in customer details, fulfillment (pickup or delivery), date, and time
4. The app builds a structured order message and hands it off to Facebook Messenger via the bakery's `m.me` link, with a clipboard copy fallback

## Accessibility notes

- semantic landmarks and a clear reading order
- labeled navigation, cart, and search controls with descriptive `aria-label`s
- modal and drawer dialogs use `role="dialog"` with `aria-modal`
- Escape key closes the mobile menu, cart drawer, and modals
- body scroll locking while overlays are open
- status toasts announced via `role="status"`

## License

[MIT](./LICENSE) © 2026 Jerome Andrei Bumalay

## Notes

This project is best understood as a curated front-end concept and design exercise. It demonstrates how an artisan bakery brand can be translated into a responsive, product-focused web experience while emphasizing editorial craft, warm tone, and an inquiry-first ordering flow.
