export const GITHUB_USERNAME = import.meta.env.VITE_GITHUB_USERNAME || 'pushkarchokar-coder'
/** Public GitHub data can be read without a token; use a server proxy for private/token-authenticated data. */
export async function getGitHubProfile() {
  const response = await fetch(`https://api.github.com/users/${encodeURIComponent(GITHUB_USERNAME)}`, { headers: { Accept: 'application/vnd.github+json' } })
  if (!response.ok) throw new Error(`GitHub profile request failed (${response.status})`)
  const profile = await response.json()
  return { connected: true, profile }
}
export async function getGitHubRepos() {
  const response = await fetch(`https://api.github.com/users/${encodeURIComponent(GITHUB_USERNAME)}/repos?sort=updated&per_page=100`, { headers: { Accept: 'application/vnd.github+json' } })
  if (!response.ok) throw new Error(`GitHub repository request failed (${response.status})`)
  const repos = await response.json()
  const selected = repos.filter(repo => !repo.fork).slice(0, 4)
  return { connected: true, repos: selected.map(repo => ({ name: repo.name, description: repo.description, stars: repo.stargazers_count, forks: repo.forks_count, language: repo.language, updatedAt: repo.updated_at, url: repo.html_url })) }
}
