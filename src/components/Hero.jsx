import { Link } from 'react-router-dom'

export default function Hero() {
  return (
    <section className="relative overflow-hidden">
      {/* Background: gradient + movie image */}
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?q=80&w=1920&auto=format&fit=crop"
          alt="Cinema seats"
          className="h-full w-full object-cover"
          loading="eager"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950/70 via-slate-950/85 to-slate-950" />
        <div className="absolute inset-0 bg-gradient-to-r from-amber-500/10 via-transparent to-indigo-500/10" />
      </div>

      <div className="relative mx-auto flex max-w-4xl flex-col items-center px-4 py-24 text-center sm:px-6 sm:py-32">
        <p className="mb-4 rounded-full border border-amber-400/30 bg-amber-400/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-amber-300">
          Powered by TVMaze API
        </p>
        <h1 className="text-4xl font-extrabold uppercase tracking-wide sm:text-6xl">
          Discover <span className="text-amber-400">Movies</span>
        </h1>
        <p className="mt-5 max-w-2xl text-base text-slate-300 sm:text-lg">
          Explore and discover your favorite movies and shows from around the
          world. Search titles, browse posters, and dive into ratings, genres
          and stories.
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Link
            to="/movies"
            className="min-h-[44px] inline-flex items-center justify-center rounded-xl bg-amber-400 px-8 py-3 text-base font-bold text-slate-950 shadow-lg shadow-amber-400/20 transition hover:bg-amber-300 active:scale-95"
          >
            Explore Now
          </Link>
          <a
            href="https://www.tvmaze.com/api"
            target="_blank"
            rel="noreferrer"
            className="min-h-[44px] inline-flex items-center justify-center rounded-xl border border-white/20 bg-white/5 px-8 py-3 text-base font-semibold text-white backdrop-blur transition hover:bg-white/10 active:scale-95"
          >
            API Docs
          </a>
        </div>

        {/* Stats strip */}
        <div className="mt-12 grid w-full max-w-2xl grid-cols-3 gap-3 text-center">
          {[
            ['🎭', 'Genres'],
            ['⭐', 'Ratings'],
            ['🔍', 'Search'],
          ].map(([icon, label]) => (
            <div
              key={label}
              className="rounded-2xl border border-white/10 bg-white/5 px-2 py-4 backdrop-blur"
            >
              <div className="text-2xl">{icon}</div>
              <div className="mt-1 text-sm font-semibold text-slate-200">{label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
