import { FiArrowUpRight } from 'react-icons/fi'
import { Section } from '../components/Section.jsx'
import { articles } from '../data/articles.js'

export function Writing() {
  return <Section id="writing" eyebrow="Notes & ideas" title="Writing">
    {articles.length ? <ul className="article-list">{articles.map(article => <li key={article.url}><a className="article-row glass-hover" href={article.url} target="_blank" rel="noreferrer"><span className="article-title">{article.title}</span><span className="article-meta">{article.category} <i>·</i> {article.date} <i>·</i> {article.readingTime} min read</span><FiArrowUpRight className="article-arrow" aria-hidden="true" /></a></li>)}</ul> : <p className="empty-state">I’m still finding the right words. Check back soon.</p>}
  </Section>
}
