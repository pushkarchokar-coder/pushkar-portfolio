import { FiArrowUpRight } from 'react-icons/fi'

export function BlogItem({ article }) {
  return <a className="blog-item" href={article.url} target="_blank" rel="noreferrer"><span className="blog-title">{article.title}</span><span className="blog-meta"><span>{article.date}</span><span>{article.readingTime}</span><span>{article.category}</span></span><FiArrowUpRight className="link-arrow" aria-hidden="true" /></a>
}
