import { useState } from 'react'
import Navbar from '../components/Navbar.jsx'
import Footer from '../components/Footer.jsx'
import SearchBar from '../components/SearchBar.jsx'
import MovieGrid from '../components/MovieGrid.jsx'
import MovieModal from '../components/MovieModal.jsx'
import useShows from '../hooks/useShows.js'

export default function MoviesPage() {
  const s = useShows()
  const [selected, setSelected] = useState(null)
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="mx-auto w-full max-w-7xl flex-1 px-4 py-8 sm:px-6">
        <h1 className="text-2xl font-extrabold sm:text-3xl">Browse <span className="text-amber-400">Movies</span></h1>
        <p className="mt-1 text-sm text-slate-400">Live data from TVMaze API — no key needed.</p>
        <div className="mt-6"><SearchBar value={s.query} onChange={s.setQuery} resultCount={s.shows.length} isSearching={s.isSearching} loading={s.loading} /></div>
        <div className="mt-6"><MovieGrid shows={s.shows} loading={s.loading} error={s.error} onSeeDetails={setSelected} onRetry={s.retry} isSearching={s.isSearching} /></div>
        {!s.loading && !s.error && !s.isSearching && s.hasMore && (
          <div className="mt-8 text-center">
            <button onClick={s.loadMore} disabled={s.loadingMore} className="min-h-[44px] rounded-xl border border-white/15 bg-white/5 px-8 py-3 text-sm font-bold text-white hover:bg-white/10 disabled:opacity-50">
              {s.loadingMore ? 'Loading…' : 'Load More'}
            </button>
          </div>
        )}
      </main>
      <Footer />
      <MovieModal show={selected} onClose={() => setSelected(null)} />
    </div>
  )
}
