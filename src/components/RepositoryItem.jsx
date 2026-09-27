import { FiArrowUpRight, FiGitBranch, FiStar } from 'react-icons/fi'

export function RepositoryItem({ repository }) {
  const date = repository.updatedAt ? new Intl.DateTimeFormat(undefined, { dateStyle: 'medium' }).format(new Date(repository.updatedAt)) : '—'
  return <a className="repository-row glass-hover" href={repository.githubUrl} target="_blank" rel="noreferrer">
    <span className="repository-name">{repository.title}</span><span className="repository-description">{repository.description || 'No description provided.'}</span>
    <span className="repository-data"><span>{repository.technologies?.[0] || '—'}</span><span><FiStar aria-hidden="true" />{repository.stars}</span><span><FiGitBranch aria-hidden="true" />{repository.forks}</span><span>{date}</span></span>
    <FiArrowUpRight className="repository-arrow" aria-hidden="true" />
  </a>
}
