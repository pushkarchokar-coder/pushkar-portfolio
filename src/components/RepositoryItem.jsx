import { FiArrowUpRight, FiGitBranch, FiStar } from 'react-icons/fi'

function relativeDate(value) {
  if (!value) return 'Recently updated'
  const days = Math.max(0, Math.floor((Date.now() - new Date(value).getTime()) / 86400000))
  return days === 0 ? 'Updated today' : days === 1 ? 'Updated yesterday' : `Updated ${days}d ago`
}

export function RepositoryItem({ repository }) {
  return <a className="repository-item" href={repository.url} target="_blank" rel="noreferrer"><span className="repository-name">{repository.name}</span><span className="repository-description">{repository.description || 'No description provided.'}</span><span className="repository-meta"><span>{repository.language || '—'}</span><span><FiStar aria-hidden="true" /> {repository.stars}</span><span><FiGitBranch aria-hidden="true" /> {repository.forks}</span><span>{relativeDate(repository.updatedAt)}</span></span><FiArrowUpRight className="link-arrow" aria-hidden="true" /></a>
}
