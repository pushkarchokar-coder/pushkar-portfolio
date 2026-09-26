const ENDPOINT = import.meta.env.VITE_WAKATIME_ENDPOINT || '/api/wakatime'
export const wakatimeProfileUrl = import.meta.env.VITE_WAKATIME_PROFILE_URL || 'https://wakatime.com'
let cachedPayload
let pendingRequest

async function getData({ refresh = false } = {}) {
  if (refresh) { cachedPayload = undefined; pendingRequest = undefined }
  if (cachedPayload) return cachedPayload
  if (!pendingRequest) {
    pendingRequest = fetch(ENDPOINT).then(async response => {
      const payload = await response.json()
      if (!response.ok) throw new Error(payload.error || `WakaTime request failed (${response.status})`)
      return payload.data ?? payload
    }).then(payload => { cachedPayload = payload; return payload }).catch(error => { pendingRequest = undefined; throw error })
  }
  return pendingRequest
}

export const isWakaTimeConfigured = () => true
export const getWakaTimeSnapshot = options => getData(options)
