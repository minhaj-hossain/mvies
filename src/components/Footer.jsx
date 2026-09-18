export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-slate-950">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-4 py-8 sm:flex-row sm:px-6">
        <div className="flex items-center gap-2 font-bold">
          <span className="text-xl" role="img" aria-label="clapperboard">
            🎬
          </span>
          <span>
            Movie<span className="text-amber-400">Explorer</span>
          </span>
        </div>

        <p className="text-center text-sm text-slate-400">
          © 2026 MovieExplorer. All rights reserved. Data by{' '}
          <a
            href="https://www.tvmaze.com/api"
            target="_blank"
            rel="noreferrer"
            className="font-semibold text-amber-400 hover:text-amber-300"
          >
            TVMaze
          </a>{' '}
          (CC BY-SA).
        </p>

        <div className="flex items-center gap-3 text-sm">
          <a
            href="https://github.com/minhaj-hossain/mvies"
            target="_blank"
            rel="noreferrer"
            className="rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-slate-300 transition hover:bg-white/10 hover:text-white"
          >
            ⭐ GitHub
          </a>
          <a
            href="https://www.tvmaze.com/api"
            target="_blank"
            rel="noreferrer"
            className="rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-slate-300 transition hover:bg-white/10 hover:text-white"
          >
            API Docs
          </a>
        </div>
      </div>
    </footer>
  )
}
