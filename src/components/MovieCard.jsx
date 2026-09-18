import { getPoster, getRating, getYear } from '../services/tvmazeApi.js'

export default function MovieCard({ show, onSeeDetails }) {
  const poster = getPoster(show, 'medium')
  const rating = getRating(show)
  const year = getYear(show)

  return (
    <article className="group flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-slate-900/60 backdrop-blur transition duration-300 hover:-translate-y-1 hover:border-amber-400/40 hover:shadow-xl hover:shadow-amber-400/10">
      <div className="relative aspect-[2/3] overflow-hidden bg-slate-800">
        <img
          src={poster}
          alt={`${show.name} poster`}
          loading="lazy"
          className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
          onError={(e) => {
            e.currentTarget.src =
              'https://placehold.co/600x900/1e293b/94a3b8?text=No+Image'
          }}
        />
        {rating !== 'N/A' && (
          <span className="absolute left-2 top-2 rounded-full bg-black/70 px-2.5 py-1 text-xs font-bold text-amber-400 backdrop-blur">
            ⭐ {rating}
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col p-4">
        <h3 className="clamp-2 min-h-[3rem] text-base font-bold leading-snug text-white">
          {show.name}
        </h3>
        <p className="mt-1.5 text-sm text-slate-400">
          ⭐ {rating} <span className="mx-1 text-slate-600">•</span> 📅 {year}
        </p>
        {show.genres?.length > 0 && (
          <p className="clamp-2 mt-1 text-xs text-slate-500">
            {show.genres.slice(0, 3).join(' • ')}
          </p>
        )}
        <button
          onClick={() => onSeeDetails(show)}
          aria-label={`View details for ${show.name}`}
          className="min-h-[44px] mt-3 w-full rounded-xl bg-amber-400 px-4 py-2.5 text-sm font-bold text-slate-950 transition hover:bg-amber-300 active:scale-95"
        >
          See Details
        </button>
      </div>
    </article>
  )
}
