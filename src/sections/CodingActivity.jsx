import { useEffect, useState } from 'react'
import { FiArrowUpRight, FiCheckCircle, FiRefreshCw } from 'react-icons/fi'
import { Section } from '../components/Section.jsx'
import { getWakaTimeSnapshot } from '../services/wakatimeApi.js'
import { siteConfig } from '../data/siteConfig.js'

const duration = seconds => {
  const minutes = Math.floor((seconds || 0) / 60)
  const hours = Math.floor(minutes / 60)
  return hours ? `${hours}h ${minutes % 60}m` : `${minutes}m`
}

export function CodingActivity() {
  const [state, setState] = useState({ loading: true, error: null, data: null })
  const load = (refresh = false) => getWakaTimeSnapshot({ refresh })
    .then(data => setState({ loading: false, error: null, data }))
    .catch(error => setState({ loading: false, error: error.message, data: null }))

  useEffect(() => {
    let active = true
    getWakaTimeSnapshot().then(data => { if (active) setState({ loading: false, error: null, data }) })
      .catch(error => { if (active) setState({ loading: false, error: error.message, data: null }) })
    return () => { active = false }
  }, [])

  const profileUrl = siteConfig.wakatimeProfileUrl || 'https://wakatime.com'
  const profileName = siteConfig.wakatimeProfileUrl?.replace(/^https?:\/\/(?:www\.)?wakatime\.com\/?@?/, '').replace(/\/$/, '') || 'wakatime.com'
  const data = state.data
  const languages = data?.languages?.slice(0, 5).map(language => language.name).join(', ')
  const editors = data?.editors?.slice(0, 5).map(editor => editor.name).join(', ')

  return <Section id="coding" eyebrow="From my WakaTime account" title="Coding activity">
    <div className="wakatime-card">
      <header className="wakatime-header">
        <a className="wakatime-wordmark" href={profileUrl} target="_blank" rel="noreferrer">wakatime.</a>
        <a className="wakatime-profile-link" href={profileUrl} target="_blank" rel="noreferrer"><FiCheckCircle aria-hidden="true" /><span>{profileName}</span><FiArrowUpRight aria-hidden="true" /></a>
      </header>
      {state.loading ? <div className="wakatime-status" role="status">Loading coding activity…</div>
        : state.error ? <div className="wakatime-status wakatime-error" role="status"><span>{state.error}</span><button type="button" onClick={() => { setState(current => ({ ...current, loading: true })); load(true) }}><FiRefreshCw aria-hidden="true" /> Try again</button></div>
          : <div className="wakatime-details">
            <p><strong>Coding Time:</strong> Today: {duration(data?.todaySeconds)} <span>·</span> Yesterday: {duration(data?.yesterdaySeconds)} <span>·</span> Week: {duration(data?.weekSeconds)}</p>
            <p><strong>Recent Languages:</strong> {languages || 'No languages recorded this week'}</p>
            <p><strong>Current Editors:</strong> {editors || 'No editors recorded this week'}</p>
          </div>}
    </div>
  </Section>
}
