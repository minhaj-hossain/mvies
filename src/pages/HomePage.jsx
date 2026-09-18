import Navbar from '../components/Navbar.jsx'
import Hero from '../components/Hero.jsx'
import Footer from '../components/Footer.jsx'
import { Link } from 'react-router-dom'

const perks = [
  ['🔍', 'Smart Search', 'Fuzzy title search via GET /search/shows?q=:query.'],
  ['🎬', 'Rich Cards', 'Poster, title, year, rating, genres in a grid.'],
  ['🎞️', 'Deep Details', 'Modal with overview, network, cast + more.'],
]

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        <Hero />
        <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6">
          <h2 className="text-center text-2xl font-extrabold sm:text-3xl">
            Why <span className="text-amber-400">MovieExplorer</span>?
          </h2>
          <div className="mt-8 grid gap-5 sm:grid-cols-3">
            {perks.map(([icon, title, desc]) => (
              <div key={title} className="rounded-2xl border border-white/10 bg-white/5 p-6 text-center">
                <div className="text-4xl">{icon}</div>
                <h3 className="mt-3 text-lg font-bold">{title}</h3>
                <p className="mt-2 text-sm text-slate-400">{desc}</p>
              </div>
            ))}
          </div>
          <div className="mt-10 text-center">
            <Link to="/movies" className="inline-flex min-h-[44px] items-center rounded-xl bg-amber-400 px-8 py-3 font-bold text-slate-950 hover:bg-amber-300">Browse Movies →</Link>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
