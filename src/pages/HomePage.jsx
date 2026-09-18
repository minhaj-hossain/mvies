import Navbar from '../components/Navbar.jsx'
import Hero from '../components/Hero.jsx'
import Footer from '../components/Footer.jsx'
import MovieCard from '../components/MovieCard.jsx'
import MovieModal from '../components/MovieModal.jsx'
import { fetchAllShows } from '../services/tvmazeApi.js'
import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'

const perks = [
  ['🔍', 'Smart Search', 'Fuzzy title search via GET /search/shows?q=:query.'],
  ['🎬', 'Rich Cards', 'Poster, title, year, rating, genres in a grid.'],
  ['🎞️', 'Deep Details', 'Modal with overview, network, cast + more.'],
]

function TrendingPreview() {
  const [items, setItems] = useState([])
  const [selected, setSelected] = useState(null)
  useEffect(() => {
    let off = false
    fetchAllShows(0).then((d) => { if (!off) setItems(d.slice(0, 4)) }).catch(() => {})
    return () => { off = true }
  }, [])
  if (!items.length) return null
  return (
    <section className="mx-auto max-w-7xl px-4 pb-2 sm:px-6">
      <div className="flex items-end justify-between">
        <h2 className="text-xl font-extrabold sm:text-2xl">🔥 Trending Now</h2>
        <Link to="/movies" className="text-sm font-semibold text-amber-400 hover:text-amber-300">View all →</Link>
      </div>
      <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-4">
        {items.map((s) => (<MovieCard key={s.id} show={s} onSeeDetails={setSelected} />))}
      </div>
      <MovieModal show={selected} onClose={() => setSelected(null)} />
    </section>
  )
}

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        <Hero />
        <TrendingPreview />
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
