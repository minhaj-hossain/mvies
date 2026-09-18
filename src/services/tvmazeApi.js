/**
 * TVMaze API service layer.
 * Docs: https://www.tvmaze.com/api
 * Base: https://api.tvmaze.com — free, no auth, CORS-enabled.
 * Rate limit: >= 20 calls / 10s per IP (handle 429 with retry).
 */

const BASE_URL = 'https://api.tvmaze.com'

export const FALLBACK_POSTER =
  'https://placehold.co/600x900/1e293b/94a3b8?text=No+Image'

/** Strip HTML tags from TVMaze `summary` field. */
export function stripHtml(html) {
  if (!html) return 'No overview available.'
  return html
    .replace(/<[^>]*>/g, '')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .trim()
}

export function getYear(show) {
  if (!show?.premiered) return 'N/A'
  return show.premiered.slice(0, 4)
}

export function getRating(show) {
  const avg = show?.rating?.average
  return typeof avg === 'number' ? avg.toFixed(1) : 'N/A'
}

export function getPoster(show, size = 'medium') {
  if (!show?.image) return FALLBACK_POSTER
  return show.image[size] || show.image.medium || FALLBACK_POSTER
}

export function getNetworkName(show) {
  return show?.network?.name || show?.webChannel?.name || 'N/A'
}

async function fetchJson(url, { signal } = {}) {
  const res = await fetch(url, {
    signal,
    headers: { Accept: 'application/json' },
  })

  // Gracefully handle TVMaze rate limiting (429) with one retry.
  if (res.status === 429) {
    await new Promise((r) => setTimeout(r, 1500))
    const retry = await fetch(url, {
      signal,
      headers: { Accept: 'application/json' },
    })
    if (!retry.ok) throw new Error(`TVMaze error: ${retry.status}`)
    return retry.json()
  }

  if (res.status === 404) return null
  if (!res.ok) throw new Error(`TVMaze error: ${res.status}`)
  return res.json()
}

/**
 * Fetch all shows (paginated, ~250 per page).
 * GET /shows?page=:page
 */
export async function fetchAllShows(page = 0, options = {}) {
  const data = await fetchJson(`${BASE_URL}/shows?page=${page}`, options)
  return Array.isArray(data) ? data : []
}

/**
 * Search shows by title.
 * GET /search/shows?q=:query -> [{ score, show }]
 * Returns unwrapped `show[]` ordered by relevancy.
 */
export async function searchShows(query, options = {}) {
  const q = query.trim()
  if (!q) return null // caller falls back to fetchAllShows
  const data = await fetchJson(
    `${BASE_URL}/search/shows?q=${encodeURIComponent(q)}`,
    options,
  )
  if (!Array.isArray(data)) return []
  return data.map((item) => item.show).filter(Boolean)
}

/**
 * Fetch full details for one show, embedding cast.
 * GET /shows/:id?embed=cast
 */
export async function fetchShowById(id, options = {}) {
  return fetchJson(`${BASE_URL}/shows/${id}?embed=cast`, options)
}
