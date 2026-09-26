import { useEffect, useState } from 'react'
import { FiArrowUpRight, FiCode, FiMonitor, FiRefreshCw } from 'react-icons/fi'
import { Section } from '../components/Section.jsx'
import { getWakaTimeSnapshot, wakatimeProfileUrl } from '../services/wakatimeApi.js'

function formatDuration(seconds = 0) {
  const totalMinutes = Math.max(0, Math.floor(seconds / 60))
  const hours = Math.floor(totalMinutes / 60)
  const minutes = totalMinutes % 60
  return hours ? `${hours}h ${minutes}m` : `${minutes}m`
}

function CodingTime({ label, seconds, loading }) {
  return <div className="waka-metric">
    <span>{label}</span>
    {loading ? <i className="skeleton-line" aria-hidden="true" /> : <strong>{formatDuration(seconds)}</strong>}
  </div>
}

function RecentLanguages({ languages, loading }) {
  if (loading) return <div className="waka-language-list" aria-label="Loading recent languages">{[0, 1, 2].map(item => <div className="waka-language-skeleton" key={item}><i className="skeleton-line" /><i className="skeleton-line" /></div>)}</div>
  if (!languages.length) return <p className="waka-empty">No language activity recorded in the last seven days.</p>
  return <ul className="waka-language-list">{languages.slice(0, 5).map(language => <li className="waka-language" key={language.name}>
    <div className="waka-language-label"><span>{language.name}</span><span>{Math.round(language.percent || 0)}%</span></div>
    <div className="waka-track"><span style={{ '--language-width': `${Math.max(0, Math.min(language.percent || 0, 100))}%` }} /></div>
  </li>)}</ul>
}

function RecentEditors({ editors, loading }) {
  if (loading) return <div className="editor-skeleton-list" aria-label="Loading editors">{[0, 1].map(item => <i className="skeleton-line" key={item} />)}</div>
  if (!editors.length) return <p className="waka-empty">No editor activity recorded in the last seven days.</p>
  return <ul className="editor-list">{editors.slice(0, 4).map(editor => <li key={editor.name}><span><FiMonitor aria-hidden="true" />{editor.name}</span><strong>{formatDuration(editor.seconds)}</strong></li>)}</ul>
}

export function WakaTime() {
  const [result, setResult] = useState({ loading: true, refreshing: false, error: false, todaySeconds: 0, yesterdaySeconds: 0, languages: [], editors: [], updatedAt: null })

  useEffect(() => {
    let mounted = true
    getWakaTimeSnapshot()
      .then(data => { if (mounted) setResult({ loading: false, refreshing: false, error: false, ...data }) })
      .catch(() => { if (mounted) setResult(current => ({ ...current, loading: false, refreshing: false, error: true })) })
    return () => { mounted = false }
  }, [])

  async function refresh() {
    setResult(current => ({ ...current, loading: !current.updatedAt, refreshing: true, error: false }))
    try {
      const data = await getWakaTimeSnapshot({ refresh: true })
      setResult({ loading: false, refreshing: false, error: false, ...data })
    } catch {
      setResult(current => ({ ...current, loading: false, refreshing: false, error: true }))
    }
  }

  const { loading, refreshing, error, todaySeconds, yesterdaySeconds, languages, editors, updatedAt } = result

  return <Section id="wakatime" title="Currently Coding" className="wakatime-section">
    <p className="section-lead">A recent snapshot of my coding activity.</p>
    <div className="waka-toolbar">
      {error && <div className="waka-message" role="status"><p>Unable to load coding activity right now.</p></div>}
      <a className="inline-link" href={wakatimeProfileUrl} target="_blank" rel="noreferrer">View WakaTime Profile <FiArrowUpRight aria-hidden="true" /></a>
      <button className="refresh-button" type="button" onClick={refresh} disabled={refreshing} aria-label="Refresh coding activity"><FiRefreshCw aria-hidden="true" className={refreshing ? 'is-refreshing' : ''} /> Refresh</button>
    </div>
    <div className="waka-stats" aria-label="Coding time">
      <CodingTime label="Today" seconds={todaySeconds} loading={loading} />
      <CodingTime label="Yesterday" seconds={yesterdaySeconds} loading={loading} />
    </div>
    {error ? <p className="waka-empty" role="status">Language and editor activity will appear when WakaTime is available.</p> : <div className="waka-data-grid">
      <div className="waka-data-block"><div className="waka-block-heading"><FiCode aria-hidden="true" /><h3>Recent languages · 7 days</h3></div><RecentLanguages languages={languages} loading={loading} /></div>
      <div className="waka-data-block"><div className="waka-block-heading"><FiMonitor aria-hidden="true" /><h3>Editors · 7 days</h3></div><RecentEditors editors={editors} loading={loading} /></div>
    </div>}
    {updatedAt && <p className="updated-at">Updated {new Intl.DateTimeFormat(undefined, { dateStyle: 'medium', timeStyle: 'short' }).format(new Date(updatedAt))}</p>}
  </Section>
}
