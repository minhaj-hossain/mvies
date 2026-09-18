# 🎬 MovieExplorer

Explore and discover movies & TV shows — powered by the **free TVMaze API** (no key needed).

**API:** https://www.tvmaze.com/api — Base `https://api.tvmaze.com`

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
