export function Section({ id, title, children, className = '' }) {
  return <section className={`content-section ${className}`} id={id} aria-labelledby={`${id}-title`}><h2 id={`${id}-title`}>{title}</h2><div className="section-content">{children}</div></section>
}
