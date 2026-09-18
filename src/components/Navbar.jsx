import { Link, NavLink, useLocation } from 'react-router-dom'

export default function Navbar() {
  const location = useLocation()
  const onMoviesPage = location.pathname === '/movies'

  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-slate-950/80 backdrop-blur">
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
        <Link to="/" className="flex items-center gap-2 text-lg font-bold tracking-tight">
          <span className="text-2xl" role="img" aria-label="clapperboard">
            🎬
          </span>
          <span>
            Movie<span className="text-amber-400">Explorer</span>
          </span>
        </Link>

        <div className="flex items-center gap-2 sm:gap-4">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `hidden rounded-lg px-3 py-2 text-sm font-medium transition sm:block ${
                isActive ? 'text-amber-400' : 'text-slate-300 hover:text-white'
              }`
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/movies"
            className={({ isActive }) =>
              `rounded-lg px-3 py-2 text-sm font-medium transition ${
                isActive || onMoviesPage
                  ? 'bg-white/10 text-white'
                  : 'text-slate-300 hover:text-white'
              }`
            }
          >
            Movies
          </NavLink>
          <Link
            to="/movies"
            className="min-h-[44px] inline-flex items-center rounded-xl bg-amber-400 px-4 py-2 text-sm font-bold text-slate-950 transition hover:bg-amber-300 active:scale-95"
          >
            Explore Now
          </Link>
        </div>
      </nav>
    </header>
  )
}
