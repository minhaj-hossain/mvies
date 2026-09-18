import MovieCard from './MovieCard.jsx'

function SkeletonCard() {
  return (
    <div className="animate-pulse overflow-hidden rounded-2xl border border-white/10 bg-slate-900/60">
      <div className="aspect-[2/3] bg-slate-800" />
      <div className="space-y-2 p-4">
        <div className="h-4 w-3/4 rounded bg-slate-700" />
        <div className="h-3 w-1/2 rounded bg-slate-800" />
        <div className="h-10 rounded-xl bg-slate-800" />
      </div>
    </div>
  )
}

export default function MovieGrid({
  shows,
  loading,
  error,
  onSeeDetails,
  onRetry,
  isSearching,
}) {
  if (loading) {
    return (
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <SkeletonCard key={i} />
        ))}
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex flex-col items-center rounded-2xl border border-red-500/20 bg-red-500/5 px-6 py-16 text-center">
        <div className="text-5xl">⚠️</div>
        <h3 className="mt-4 text-lg font-bold text-white">Something went wrong</h3>
        <p className="mt-2 max-w-md text-sm text-slate-400">{error}</p>
        <button
          onClick={onRetry}
          className="min-h-[44px] mt-6 rounded-xl bg-amber-400 px-6 py-2.5 text-sm font-bold text-slate-950 transition hover:bg-amber-300 active:scale-95"
        >
          Try Again
        </button>
      </div>
    )
  }

  if (shows.length === 0) {
    return (
      <div className="flex flex-col items-center rounded-2xl border border-white/10 bg-white/5 px-6 py-16 text-center">
        <div className="text-5xl">🎬</div>
        <h3 className="mt-4 text-lg font-bold text-white">No shows found</h3>
        <p className="mt-2 max-w-md text-sm text-slate-400">
          {isSearching
            ? 'Try a different title — TVMaze search is fuzzy, so even partial names work.'
            : 'No shows available right now. Please try again later.'}
        </p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {shows.map((show) => (
        <MovieCard key={show.id} show={show} onSeeDetails={onSeeDetails} />
      ))}
    </div>
  )
}
