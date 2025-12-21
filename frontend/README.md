# Frontend

React + Vite frontend for the End-to-End House Price Prediction project.

## Overview

This app provides a user interface to browse listings and request price predictions from the backend. The source lives in `src/` and the main entry is `src/main.jsx`.

## Prerequisites

- Node.js (recommended v16+)
- npm or yarn

## Setup

Install dependencies and start the dev server:

```bash
cd frontend
npm install
npm run dev
```

To build for production:

```bash
npm run build
npm run preview
```

Check `package.json` for exact script names (`dev`, `build`, `preview`, `start`).

## Environment / Configuration

If the frontend needs to call the backend API, set the backend base URL via an environment variable used by Vite (e.g., `VITE_API_BASE_URL`). Create an `.env` or `.env.local` in `frontend/` like:

```
VITE_API_BASE_URL=http://localhost:5001/api
```

Access it in code as `import.meta.env.VITE_API_BASE_URL`.

## Key files & structure

- `index.html` — HTML entry
- `src/main.jsx` — React entry
- `src/App.jsx` — top-level routes and layout
- `src/components/PricePredictor.jsx` — UI and form to call `/predict`
- `src/pages/Predict.jsx` — page wrapper for prediction

## API Integration

The frontend expects a backend endpoint for predictions (e.g., POST `${VITE_API_BASE_URL}/predict`).

Request example (JSON payload):

```json
{
  "bedrooms": 3,
  "bathrooms": 2,
  "sqft": 1500,
  "location": "Some Neighborhood"
}
```

Response example:

```json
{ "predicted_price": 425000 }
```

Ensure the field names match what the backend expects.

## Linting & Formatting

This project contains ESLint configuration. Run the linter and formatter if present:

```bash
npm run lint
npm run format
```

## Development Tips

- Run the backend and frontend concurrently (e.g., using separate terminals or a process manager).
- Use the browser DevTools and the Network tab to inspect requests to the backend.
- If CORS errors appear, enable CORS on the backend or configure a dev proxy in `vite.config.js`.

## Next Steps / Suggestions

- Add a `.env.example` with `VITE_API_BASE_URL` to document the expected env var.
- Add tests for `PricePredictor` component and API integration.
- Improve error-handling and input validation on the `Predict` page.

---

If you'd like, I can create `.env.example` in `frontend/` or verify the `package.json` scripts now.

## Site overview

The site is a small listing + prediction application composed of a few top-level pages and reusable components:

- Pages: `Home`, `Listings`, `Predict`, `About`, `Contact` (in `src/pages`).
- Key components: `Navbar`, `Hero`, `PricePredictor`, `PropertyCard`, `Testimonials`, `Footer` (in `src/components`).

Typical user flow:
- Browse listings on `Listings` (cards rendered by `PropertyCard`).
- Open `Predict` to enter property features and request a price prediction via the backend.
- Use `About` and `Contact` for informational pages and contact form (if present).

The app uses route-based navigation (see `src/App.jsx`) and component-driven structure for easy extension.

## Theme

This project uses Tailwind CSS for styling (see `tailwind.config.js` and `postcss.config.js`). The theme is implemented with utility-first classes and simple component wrappers.

- Colors & typography: customize values in `tailwind.config.js` to change color palettes, fonts, and spacing scales.
- Dark/light mode: if needed, add Tailwind's `dark` variant and toggle a `class="dark"` on the `html` or `body` element, or use CSS variables for runtime switching.
- Component styles: prefer small, focused components with Tailwind utilities; extract repeated patterns into component-specific classes or `@apply` rules in `src/index.css`/`src/App.css`.

Changing the theme:

1. Modify colors, fonts or screens inside `tailwind.config.js`.
2. Rebuild styles (dev server will usually pick up changes automatically).
3. For runtime theme switching, consider using CSS variables and toggling a root class, then reference variables inside Tailwind via the `theme()` or custom properties.

---

Want me to add a `.env.example`, generate a simple theme switcher component, or verify the `package.json` scripts next?
# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
