import { Section } from '../components/Section.jsx'
import { BlogItem } from '../components/BlogItem.jsx'
import { blogs } from '../data/blogs.js'

export function Blog() {
  return <Section id="blog" title="Writing">
    {blogs.length ? <div className="blog-list">{blogs.map(article => <BlogItem article={article} key={article.title} />)}</div> : <p className="data-note">No articles published yet.</p>}
  </Section>
}
