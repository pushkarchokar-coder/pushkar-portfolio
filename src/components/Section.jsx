import { useEffect, useRef, useState } from 'react'

export function Section({ id, eyebrow, title, children, className = '' }) {
  const ref = useRef(null)
  const [visible, setVisible] = useState(() => typeof window === 'undefined' || !('IntersectionObserver' in window) || window.matchMedia('(prefers-reduced-motion: reduce)').matches)
  useEffect(() => {
    if (visible) return undefined
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { setVisible(true); observer.disconnect() }
    }, { threshold: 0.08 })
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [visible])
  return <section ref={ref} className={`content-section ${visible ? 'is-visible' : ''} ${className}`} id={id} aria-labelledby={`${id}-title`}>
    <div className="section-heading"><span className="section-eyebrow">{eyebrow}</span><h2 id={`${id}-title`}>{title}</h2></div>
    <div className="section-body">{children}</div>
  </section>
}
