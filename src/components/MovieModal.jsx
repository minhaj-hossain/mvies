import { useEffect, useState } from 'react'
import { fetchShowById, getNetworkName, getPoster, getRating, getYear, stripHtml } from '../services/tvmazeApi.js'

export default function MovieModal({ show, onClose }) {
  const [details, setDetails] = useState(show)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (!show) return
    setDetails(show)
    let off = false
    setLoading(true)
    fetchShowById(show.id).then((f) => { if (!off && f) setDetails(f) }).catch(() => {}).finally(() => { if (!off) setLoading(false) })
    return () => { off = true }
  }, [show])

  useEffect(() => {
    if (!show) return
    const onKey = (e) => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', onKey)
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => { document.removeEventListener('keydown', onKey); document.body.style.overflow = prev }
  }, [show, onClose])

  if (!show) return null
  const cast = details?._embedded?.cast?.slice(0, 6) || []
  const poster = getPoster(details, 'original')
  const meta = [['📺 Network', getNetworkName(details)], ['📡 Status', details?.status || 'N/A'], ['⏱️ Runtime', details?.runtime ? `${details.runtime} min` : 'N/A'], ['🌐 Language', details?.language || 'N/A']]

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/70 backdrop-blur-sm animate-fade-in sm:items-center sm:p-6" onClick={onClose} role="dialog" aria-modal="true" aria-label={`${details?.name} details`}>
      <div className="modal-scroll relative max-h-[92vh] w-full max-w-3xl overflow-y-auto rounded-t-3xl bg-slate-900 shadow-2xl animate-zoom-in sm:rounded-3xl" onClick={(e) => e.stopPropagation()}>
        <button onClick={onClose} aria-label="Close details" className="absolute right-4 top-4 z-10 flex h-11 w-11 items-center justify-center rounded-full bg-black/60 text-lg text-white transition hover:bg-black/80">✕</button>
        <div className="relative h-56 w-full overflow-hidden sm:h-80">
          <img src={poster} alt={`${details?.name} backdrop`} className="h-full w-full object-cover object-top" />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent" />
          <div className="absolute bottom-4 left-5 right-5 sm:left-8">
            <div className="flex flex-wrap gap-2">{(details?.genres || []).map((g) => (<span key={g} className="rounded-full border border-amber-400/30 bg-black/50 px-3 py-1 text-xs font-semibold text-amber-300">{g}</span>))}</div>
            <h2 className="mt-2 text-2xl font-extrabold text-white sm:text-4xl">{details?.name}</h2>
          </div>
        </div>
        <div className="px-5 py-6 sm:px-8">
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm sm:text-base">
            <span className="font-bold text-amber-400">⭐ Rating: {getRating(details)}</span>
            <span className="text-slate-600">|</span>
            <span className="text-slate-300">📅 Release: {details?.premiered || 'N/A'} ({getYear(details)})</span>
          </div>
          <div className="mt-4 grid grid-cols-2 gap-3 text-sm sm:grid-cols-4">
            {meta.map(([l, v]) => (<div key={l} className="rounded-xl border border-white/10 bg-white/5 px-3 py-2.5"><div className="text-xs text-slate-500">{l}</div><div className="mt-0.5 truncate font-semibold text-slate-200">{v}</div></div>))}
          </div>
          <h3 className="mt-6 text-lg font-bold text-white">Overview</h3>
          <p className="mt-2 text-sm leading-relaxed text-slate-300 sm:text-base">{stripHtml(details?.summary)}</p>
          {loading && <p className="mt-3 text-xs text-slate-500">Loading full details from TVMaze…</p>}
          {cast.length > 0 && (<><h3 className="mt-6 text-lg font-bold text-white">Top Cast</h3><div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-3">{cast.map((c) => (<div key={`${c.person?.id}-${c.character?.id}`} className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 p-2.5"><img src={c.person?.image?.medium || 'https://placehold.co/100x100/1e293b/94a3b8?text=?'} alt={c.person?.name} loading="lazy" className="h-11 w-11 rounded-full object-cover" /><div className="min-w-0"><div className="truncate text-sm font-semibold text-white">{c.person?.name}</div><div className="truncate text-xs text-slate-400">as {c.character?.name}</div></div></div>))}</div></>)}
          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-end">
            {details?.officialSite && (<a href={details.officialSite} target="_blank" rel="noreferrer" className="min-h-[44px] inline-flex items-center justify-center rounded-xl border border-white/15 bg-white/5 px-6 py-2.5 text-sm font-semibold text-white hover:bg-white/10">🌐 Official Site</a>)}
            <button onClick={onClose} className="min-h-[44px] rounded-xl bg-amber-400 px-8 py-2.5 text-sm font-bold text-slate-950 hover:bg-amber-300">❌ Close</button>
          </div>
        </div>
      </div>
    </div>
  )
}
