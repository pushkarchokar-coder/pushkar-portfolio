import { useEffect, useState } from 'react'
import { FiClock } from 'react-icons/fi'

export function LocalTime() {
  const [now, setNow] = useState(() => new Date())
  useEffect(() => {
    const timer = window.setInterval(() => setNow(new Date()), 1_000)
    return () => window.clearInterval(timer)
  }, [])
  const time = new Intl.DateTimeFormat(undefined, {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: true,
  }).format(now)
  return <span className="identity-clock" aria-label={`Local time ${time}`}>
    <FiClock aria-hidden="true" /><time key={time} dateTime={now.toISOString()}>{time}</time>
  </span>
}
