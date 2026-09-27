const API = 'https://wakatime.com/api/v1'
const send = (res, status, value) => { res.setHeader('Cache-Control', 'public, s-maxage=300, stale-while-revalidate=600'); return res.status(status).json(value) }

async function getWaka(path, key) {
  const response = await fetch(`${API}${path}`, { headers: { Authorization: `Basic ${Buffer.from(key).toString('base64')}`, Accept: 'application/json' }, signal: AbortSignal.timeout(12000) })
  const body = await response.json()
  if (!response.ok) throw new Error(`WakaTime returned ${response.status}`)
  return body
}

export default async function handler(request, response) {
  if (request.method !== 'GET') return send(response, 405, { error: 'Method not allowed.' })
  const key = process.env.WAKATIME_API_KEY
  if (!key) return send(response, 503, { error: 'WakaTime activity is not configured yet.' })
  try {
    const [allTime, today, yesterday, week] = await Promise.all([
      getWaka('/users/current/all_time_since_today', key),
      getWaka('/users/current/summaries?range=Today', key),
      getWaka('/users/current/summaries?range=Yesterday', key),
      getWaka('/users/current/summaries?range=Last%207%20Days', key),
    ])
    const days = week.data ?? []
    const languageTimes = new Map()
    const editorTimes = new Map()
    for (const day of days) {
      for (const language of day.languages ?? []) languageTimes.set(language.name, (languageTimes.get(language.name) ?? 0) + (language.total_seconds ?? 0))
      for (const editor of day.editors ?? []) editorTimes.set(editor.name, (editorTimes.get(editor.name) ?? 0) + (editor.total_seconds ?? 0))
    }
    const languageSeconds = [...languageTimes.values()].reduce((sum, value) => sum + value, 0)
    const weekSeconds = days.reduce((sum, day) => sum + (day.grand_total?.total_seconds ?? 0), 0)
    return send(response, 200, { data: {
      totalSeconds: allTime.data?.total_seconds ?? allTime.data?.seconds ?? 0,
      todaySeconds: today.data?.[0]?.grand_total?.total_seconds ?? 0,
      yesterdaySeconds: yesterday.data?.[0]?.grand_total?.total_seconds ?? 0,
      weekSeconds, dailyAverageSeconds: allTime.data?.daily_average ?? weekSeconds / 7,
      languages: [...languageTimes.entries()].map(([name, seconds]) => ({ name, seconds, percent: languageSeconds ? seconds / languageSeconds * 100 : 0 })).sort((a, b) => b.seconds - a.seconds),
      editors: [...editorTimes.entries()].map(([name, seconds]) => ({ name, seconds })).sort((a, b) => b.seconds - a.seconds),
      days: days.map(day => ({ date: day.range?.date || day.range?.start || '', label: day.range?.date ? new Intl.DateTimeFormat('en', { weekday: 'short' }).format(new Date(`${day.range.date}T12:00:00`)) : '', seconds: day.grand_total?.total_seconds ?? 0 })),
      updatedAt: new Date().toISOString(),
    } })
  } catch (error) {
    console.error('WakaTime API request failed:', error instanceof Error ? error.message : 'Unknown error')
    return send(response, 502, { error: 'WakaTime activity could not be loaded. Please try again.' })
  }
}
