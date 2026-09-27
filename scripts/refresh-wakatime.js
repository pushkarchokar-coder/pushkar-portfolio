import { mkdir, writeFile } from 'node:fs/promises'
import { dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const outputPath = fileURLToPath(new URL('../public/api/wakatime.json', import.meta.url))
const apiKey = process.env.WAKATIME_API_KEY

async function getWaka(path) {
  const response = await fetch(`https://wakatime.com/api/v1${path}`, {
    headers: { Authorization: `Basic ${Buffer.from(apiKey).toString('base64')}`, Accept: 'application/json' },
    signal: AbortSignal.timeout(15000),
  })
  const payload = await response.json()
  if (!response.ok) throw new Error(`WakaTime returned HTTP ${response.status}`)
  return payload
}

let payload
if (!apiKey) {
  payload = { error: 'WakaTime activity is not configured yet.' }
} else {
  const [allTime, today, yesterday, week] = await Promise.all([
    getWaka('/users/current/all_time_since_today'),
    getWaka('/users/current/summaries?range=Today'),
    getWaka('/users/current/summaries?range=Yesterday'),
    getWaka('/users/current/summaries?range=Last%207%20Days'),
  ])
  const days = week.data ?? []
  const languages = new Map()
  const editors = new Map()
  for (const day of days) {
    for (const language of day.languages ?? []) languages.set(language.name, (languages.get(language.name) ?? 0) + (language.total_seconds ?? 0))
    for (const editor of day.editors ?? []) editors.set(editor.name, (editors.get(editor.name) ?? 0) + (editor.total_seconds ?? 0))
  }
  const languagesTotal = [...languages.values()].reduce((sum, value) => sum + value, 0)
  const weekSeconds = days.reduce((sum, day) => sum + (day.grand_total?.total_seconds ?? 0), 0)
  payload = { data: {
    totalSeconds: allTime.data?.total_seconds ?? allTime.data?.seconds ?? 0,
    todaySeconds: today.data?.[0]?.grand_total?.total_seconds ?? 0,
    yesterdaySeconds: yesterday.data?.[0]?.grand_total?.total_seconds ?? 0,
    weekSeconds,
    dailyAverageSeconds: allTime.data?.daily_average ?? weekSeconds / 7,
    languages: [...languages.entries()].map(([name, seconds]) => ({ name, seconds, percent: languagesTotal ? seconds / languagesTotal * 100 : 0 })).sort((a, b) => b.seconds - a.seconds),
    editors: [...editors.entries()].map(([name, seconds]) => ({ name, seconds })).sort((a, b) => b.seconds - a.seconds),
    days: days.map(day => ({ date: day.range?.date || day.range?.start || '', label: day.range?.date ? new Intl.DateTimeFormat('en', { weekday: 'short' }).format(new Date(`${day.range.date}T12:00:00`)) : '', seconds: day.grand_total?.total_seconds ?? 0 })),
    updatedAt: new Date().toISOString(),
  } }
}

await mkdir(dirname(outputPath), { recursive: true })
await writeFile(outputPath, `${JSON.stringify(payload)}\n`, 'utf8')
console.log(apiKey ? 'WakaTime snapshot refreshed.' : 'WakaTime key is not configured; wrote an honest setup state.')
