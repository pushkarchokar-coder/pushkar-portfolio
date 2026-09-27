import { FiArrowUpRight, FiGithub } from 'react-icons/fi'
import { Section } from '../components/Section.jsx'
import { siteConfig } from '../data/siteConfig.js'

const DAY_MS = 24 * 60 * 60 * 1000
const dateKey = date => date.toISOString().slice(0, 10)

function buildCalendar(contributions) {
  const counts = new Map(contributions.map(day => [day.date, day]))
  const today = new Date()
  const end = new Date(Date.UTC(today.getFullYear(), today.getMonth(), today.getDate()))
  end.setUTCDate(end.getUTCDate() + (6 - end.getUTCDay()))
  const start = new Date(end.getTime() - 370 * DAY_MS)
  const days = Array.from({ length: 371 }, (_, index) => {
    const date = new Date(start.getTime() + index * DAY_MS)
    const key = dateKey(date)
    const contribution = counts.get(key)
    return { date: key, count: contribution?.count || 0, level: contribution?.level || 0, future: key > dateKey(today) }
  })
  const months = []
  days.forEach((day, index) => {
    const date = new Date(`${day.date}T00:00:00Z`)
    if (date.getUTCDate() === 1) months.push({ label: new Intl.DateTimeFormat('en', { month: 'short', timeZone: 'UTC' }).format(date), week: Math.floor(index / 7) + 1 })
  })
  const total = days.reduce((sum, day) => sum + (day.future ? 0 : day.count), 0)
  return { days, months, total }
}

function ContributionCalendar({ contributions, loading, unavailable }) {
  const { days, months, total } = buildCalendar(contributions)
  return <div className="contribution-panel glass-panel">
    <div className="contribution-scroll">
      <div className="contribution-months" aria-hidden="true">{months.map((month, index) => <span key={`${month.label}-${index}`} style={{ gridColumn: month.week }}>{month.label}</span>)}</div>
      <div className="contribution-grid" role="list" aria-label="GitHub contributions over the past year">
      {days.map((day, index) => <span
        className={`contribution-day level-${day.future ? 0 : day.level}${day.future ? ' is-future' : ''}`}
        key={day.date}
        role="listitem"
        aria-label={`${day.count} contributions on ${day.date}`}
        title={`${day.count} contribution${day.count === 1 ? '' : 's'} on ${day.date}`}
        style={{ '--day-index': index }}
      />)}
      </div>
    </div>
    <div className="contribution-footer">
      <p role="status">{loading ? 'Loading contribution activity…' : unavailable ? 'Contribution activity is temporarily unavailable.' : `${total} contributions in the last year`}</p>
      <div className="contribution-legend" aria-label="Contribution activity: less to more"><span>Less</span>{[0, 1, 2, 3, 4].map(level => <i className={`level-${level}`} key={level} />)}<span>More</span></div>
    </div>
  </div>
}

export function GitHub({ profile, contributions = [], contributionsError = false, loading }) {
  const profileUrl = `https://github.com/${siteConfig.githubUsername}`
  return <Section id="github" eyebrow="Open source & repositories" title="GitHub">
    <div className="github-calendar-card">
      <div className="github-calendar-header">
        <a className="github-wordmark" href={profileUrl} target="_blank" rel="noreferrer" aria-label={`Visit ${siteConfig.githubUsername} on GitHub`}>github.</a>
        <a className="github-profile-link" href={profileUrl} target="_blank" rel="noreferrer"><FiGithub aria-hidden="true" /><span>{profile?.login || siteConfig.githubUsername}</span><FiArrowUpRight aria-hidden="true" /></a>
      </div>
      <ContributionCalendar contributions={contributions} loading={loading && !contributions.length} unavailable={contributionsError} />
    </div>
  </Section>
}
