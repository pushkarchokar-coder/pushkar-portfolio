import { mkdir, writeFile } from 'node:fs/promises'
import { dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const outputPath = fileURLToPath(new URL('../public/api/wakatime.json', import.meta.url))
const apiKey = process.env.WAKATIME_API_KEY

function summarize(days, field) {
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

async function getSummary(range) {
  const response = await fetch(`https://wakatime.com/api/v1/users/current/summaries?range=${encodeURIComponent(range)}`, {
    headers: { Authorization: `Basic ${Buffer.from(apiKey).toString('base64')}`, Accept: 'application/json' },
    signal: AbortSignal.timeout(15000),
  })
  if (!response.ok) throw new Error(`WakaTime returned HTTP ${response.status}`)
  return response.json()
}

let payload
if (!apiKey) {
  payload = { error: 'Add WAKATIME_API_KEY to the repository Actions secrets to enable coding stats.' }
} else {
  const [today, yesterday, recent] = await Promise.all([
    getSummary('Today'),
    getSummary('Yesterday'),
    getSummary('Last 7 Days'),
  ])
  const todaySummary = today.data?.[0] ?? {}
  const yesterdaySummary = yesterday.data?.[0] ?? {}
  const recentDays = recent.data ?? []
  payload = { data: {
    todaySeconds: todaySummary.grand_total?.total_seconds ?? 0,
    yesterdaySeconds: yesterdaySummary.grand_total?.total_seconds ?? 0,
    languages: summarize(recentDays, 'languages'),
    editors: summarize(recentDays, 'editors'),
    updatedAt: new Date().toISOString(),
  } }
}

await mkdir(dirname(outputPath), { recursive: true })
await writeFile(outputPath, `${JSON.stringify(payload)}\n`, 'utf8')
console.log(apiKey ? 'WakaTime snapshot refreshed.' : 'WakaTime key is not configured; wrote a setup message.')
