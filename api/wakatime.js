const API_BASE = 'https://wakatime.com/api/v1'

function json(response, status, body) {
  response.setHeader('Cache-Control', 'public, s-maxage=300, stale-while-revalidate=600')
  return response.status(status).json(body)
}

async function getWaka(path, key) {
  const response = await fetch(`${API_BASE}${path}`, {
    headers: { Authorization: `Basic ${Buffer.from(key).toString('base64')}`, Accept: 'application/json' },
    signal: AbortSignal.timeout(10000),
  })
  if (!response.ok) throw new Error(`WakaTime responded with ${response.status}`)
  return response.json()
}

function aggregateRecentDays(days, field) {
  const totals = new Map()
  for (const day of days) {
    for (const item of day[field] ?? []) {
      totals.set(item.name, (totals.get(item.name) ?? 0) + (item.total_seconds ?? 0))
    }
  }
  const totalSeconds = [...totals.values()].reduce((sum, seconds) => sum + seconds, 0)
  return [...totals.entries()]
    .map(([name, seconds]) => ({ name, seconds, percent: totalSeconds ? seconds / totalSeconds * 100 : 0 }))
    .sort((first, second) => second.seconds - first.seconds)
}

export default async function handler(request, response) {
  if (request.method !== 'GET') return json(response, 405, { error: 'Method not allowed' })
  const key = process.env.WAKATIME_API_KEY
  if (!key) return json(response, 503, { error: 'WakaTime server key is not configured.' })
  try {
    const [today, yesterday, recent] = await Promise.all([
      getWaka('/users/current/summaries?range=Today', key),
      getWaka('/users/current/summaries?range=Yesterday', key),
      getWaka('/users/current/summaries?range=Last%207%20Days', key),
    ])
    const todaySummary = today.data?.[0] ?? {}
    const yesterdaySummary = yesterday.data?.[0] ?? {}
    const recentDays = recent.data ?? []
    return json(response, 200, { data: {
      todaySeconds: todaySummary.grand_total?.total_seconds ?? 0,
      yesterdaySeconds: yesterdaySummary.grand_total?.total_seconds ?? 0,
      languages: aggregateRecentDays(recentDays, 'languages'),
      editors: aggregateRecentDays(recentDays, 'editors'),
      updatedAt: new Date().toISOString(),
    } })
  } catch (error) {
    console.error('WakaTime API request failed:', error instanceof Error ? error.message : 'Unknown error')
    return json(response, 502, { error: 'Unable to load WakaTime coding activity.' })
  }
}
