# 🎬 MovieExplorer

Explore and discover movies & TV shows — powered by the **free TVMaze API** (no key needed).

**API:** https://www.tvmaze.com/api — Base `https://api.tvmaze.com`
**Repo:** https://github.com/minhaj-hossain/mvies
**Live:** _(paste Vercel URL here after deploy)_

## ✨ Features
- Home page (`/`): Navbar, Hero banner (gradient + cinema image), 🔥 Trending preview, Why-section, CTA → Movie Listing, Footer
- Movie Listing page (`/movies`): live debounced search by title, responsive card grid, Load More pagination, skeletons + error retry + empty state
- Movie Details modal: backdrop/poster, title, ⭐ rating, 📅 release date, overview, genres, network/status/runtime/language, top cast; closes via ✕ / Close / backdrop-click / ESC
- Fully responsive: 1 col mobile → 2/3/4 col desktop; touch-friendly 44px buttons; scroll-to-top on route change

## 📱 Responsive Design
| Device | Layout |
|---|---|
| Mobile (<640px) | Single column, stacked hero CTA, bottom-sheet modal |
| Tablet (640–1024px) | 2–3 column grid |
| Desktop (>1024px) | 4 column grid, max-w-7xl, optimized spacing |

## 🔌 API Endpoints Used
| Purpose | Request |
|---|---|
| All shows | `GET https://api.tvmaze.com/shows?page=0` |
| Search | `GET https://api.tvmaze.com/search/shows?q=girls` |
| Details + cast | `GET https://api.tvmaze.com/shows/1?embed=cast` |

Attribution: data by TVMaze, licensed CC BY-SA. Rate limit ≥20 req/10s handled with debounce + 429 retry.

## 🚀 Run Locally
```bash
npm install
npm run dev
npm run build
npm run preview
```

## 🌐 Deploy (Vercel)
1. Push this folder to GitHub (`main` branch, repo root = app root).
2. Vercel → New Project → Import repo → Framework: Vite → Deploy.
3. For SPA routes add `vercel.json` (already included).

## 📁 Structure
```
src/
  App.jsx, main.jsx, index.css
  services/tvmazeApi.js
  hooks/useDebounce.js, useShows.js
  components/Navbar, Hero, Footer, SearchBar, MovieCard, MovieGrid, MovieModal, ScrollToTop
  pages/HomePage, MoviesPage
```

## ✅ Assignment Checklist
- [x] Navbar with logo, links, CTA to Movie Listing
- [x] Hero with bg image/gradient, title, description, CTA
- [x] Footer with name, © 2026, links
- [x] Search bar updating grid dynamically
- [x] Reusable cards: poster, title, year, rating, See Details
- [x] Responsive CSS Grid layout
- [x] Modal with backdrop/poster, title, overview, rating/date, genres + extras
- [x] Closable via ✕ / Close / backdrop / ESC


## ✨ Features
- Home page: Navbar, Hero banner (gradient + cinema image), CTA → Movie Listing, Footer
- Movie Listing page (`/movies`): live search by title, responsive card grid, Load More pagination
- Movie Details modal: backdrop/poster, title, ⭐ rating, 📅 release date, overview, genres, network/status/runtime/language, top cast
- Fully responsive: 1 col mobile → 2/3/4 col desktop; touch-friendly 44px buttons

## 🔌 API Endpoints Used
| Purpose | Request |
|---|---|
| All shows | `GET https://api.tvmaze.com/shows?page=0` |
| Search | `GET https://api.tvmaze.com/search/shows?q=girls` |
| Details + cast | `GET https://api.tvmaze.com/shows/1?embed=cast` |

Attribution: data by TVMaze, licensed CC BY-SA.

## 🚀 Run Locally
```bash
npm install
npm run dev
npm run build
```

## 🌐 Deploy (Vercel)
1. Push this folder to GitHub (`main` branch, repo root = app root).
2. Vercel → New Project → Import repo → Framework: Vite → Deploy.
3. For SPA routes add `vercel.json` (already included).

## 📁 Structure
```
src/
  App.jsx, main.jsx, index.css
  services/tvmazeApi.js
  hooks/useDebounce.js, useShows.js
  components/Navbar, Hero, Footer, SearchBar, MovieCard, MovieGrid, MovieModal
  pages/HomePage, MoviesPage
```
