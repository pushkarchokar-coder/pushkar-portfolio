import { useEffect, useState } from 'react'
import { FiArrowUpRight } from 'react-icons/fi'
import { Section } from '../components/Section.jsx'
import { RepositoryItem } from '../components/RepositoryItem.jsx'
import { getGitHubProfile, getGitHubRepos } from '../services/githubApi.js'
import { GITHUB_URL } from '../components/SocialLinks.jsx'

export function GitHub() {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  useEffect(() => {
    let mounted = true
    Promise.all([getGitHubProfile(), getGitHubRepos()]).then(([profile, repositories]) => {
      if (mounted) setData({ profile: profile.profile, repositories: repositories.repos })
    }).catch(() => { if (mounted) setError(true) }).finally(() => { if (mounted) setLoading(false) })
    return () => { mounted = false }
  }, [])
  return <Section id="github" title="GitHub">
    <div className="github-overview"><div><span>Username</span><strong>{data?.profile.login ? `@${data.profile.login}` : '—'}</strong></div><div><span>Public repositories</span><strong>{loading ? <i className="skeleton-line" /> : data?.profile.public_repos ?? '—'}</strong></div><div><span>Followers</span><strong>{loading ? <i className="skeleton-line" /> : data?.profile.followers ?? '—'}</strong></div><div><span>Following</span><strong>{loading ? <i className="skeleton-line" /> : data?.profile.following ?? '—'}</strong></div></div>
    <h3 className="subsection-title">Selected repositories</h3>
    {loading ? <div className="repository-list" aria-label="Loading repositories">{[0, 1, 2].map(item => <div className="repository-skeleton" key={item}><i className="skeleton-line" /><i className="skeleton-line" /></div>)}</div> : error ? <p className="data-note" role="status">GitHub activity couldn’t be loaded. <a className="inline-link" href={GITHUB_URL} target="_blank" rel="noreferrer">Visit GitHub Profile <FiArrowUpRight aria-hidden="true" /></a></p> : data?.repositories?.length ? <div className="repository-list">{data.repositories.map(repository => <RepositoryItem repository={repository} key={repository.name} />)}</div> : <p className="data-note">No public repositories to show yet.</p>}
    <a className="inline-link" href={GITHUB_URL} target="_blank" rel="noreferrer">View GitHub Profile <FiArrowUpRight aria-hidden="true" /></a>
  </Section>
}
