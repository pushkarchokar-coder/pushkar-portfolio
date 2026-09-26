import { useEffect, useState } from 'react'

function formatNow(date) {
  const parts = new Intl.DateTimeFormat(undefined, {
    weekday: 'long', day: '2-digit', month: 'long', year: 'numeric',
  }).formatToParts(date)
  const get = type => parts.find(part => part.type === type)?.value ?? ''
  const dateLabel = `${get('weekday')} · ${get('day')} ${get('month')} ${get('year')}`
  const timeLabel = new Intl.DateTimeFormat(undefined, { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true }).format(date)
  return `${dateLabel} · ${timeLabel}`.toUpperCase()
}

export function LiveDateTime() {
  const [now, setNow] = useState(() => new Date())
  useEffect(() => {
    const timer = window.setInterval(() => setNow(new Date()), 1000)
    return () => window.clearInterval(timer)
  }, [])
  return <div className="live-date wrap" aria-label={`Local date and time: ${now.toLocaleString()}`}><time dateTime={now.toISOString()}>{formatNow(now)}</time></div>
}
