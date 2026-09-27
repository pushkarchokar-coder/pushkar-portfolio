const ENDPOINT = import.meta.env.VITE_WAKATIME_ENDPOINT || `${import.meta.env.BASE_URL}api/wakatime.json`
let cached
let pending

export async function getWakaTimeSnapshot({ refresh = false } = {}) {
  if (refresh) { cached = undefined; pending = undefined }
  if (cached) return cached
  if (!pending) pending = fetch(`${ENDPOINT}?v=${Date.now()}`).then(async response => {
    const body = await response.json()
    if (!response.ok || body.error) throw new Error(body.error || `WakaTime request failed (${response.status}).`)
    return body.data ?? body
  }).then(data => { cached = data; return data }).catch(error => { pending = undefined; throw error })
  return pending
}
