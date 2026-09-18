export default function SearchBar({ value, onChange, resultCount, isSearching, loading }) {
  return (
    <div className="w-full">
      <div className="relative">
        <span
          className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-xl text-slate-400"
          role="img"
          aria-label="search"
        >
          🔍
        </span>
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Search for a movie... (e.g. Girls, Batman, Friends)"
          aria-label="Search for a movie"
          className="min-h-[52px] w-full rounded-2xl border border-white/10 bg-white/5 py-3.5 pl-12 pr-12 text-base text-white placeholder:text-slate-500 outline-none backdrop-blur transition focus:border-amber-400/60 focus:bg-white/10 focus:ring-2 focus:ring-amber-400/20"
        />
        {value && (
          <button
            onClick={() => onChange('')}
            aria-label="Clear search"
            className="absolute right-3 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full text-slate-400 transition hover:bg-white/10 hover:text-white"
          >
            ✕
          </button>
        )}
      </div>
      <div className="mt-3 flex items-center justify-between text-sm">
        <p className="text-slate-400">
          {loading ? (
            <span className="inline-flex items-center gap-2">
              <span className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-amber-400 border-t-transparent" />
              Searching TVMaze…
            </span>
          ) : isSearching ? (
            <>
              Found <span className="font-bold text-amber-400">{resultCount}</span>{' '}
              result{resultCount === 1 ? '' : 's'} for “{value}”
            </>
          ) : (
            <>
              Showing <span className="font-bold text-amber-400">{resultCount}</span>{' '}
              popular shows from TVMaze
            </>
          )}
        </p>
        <span className="hidden rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-slate-400 sm:block">
          GET /search/shows?q=:query
        </span>
      </div>
    </div>
  )
}
