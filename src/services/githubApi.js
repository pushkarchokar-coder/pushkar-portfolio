import { siteConfig } from '../data/siteConfig.js'

const API = 'https://api.github.com'
const headers = { Accept: 'application/vnd.github+json' }
let cachedData
let pendingRequest

async function get(path) {
  const response = await fetch(`${API}${path}`, { headers })
  if (response.status === 403 && response.headers.get('x-ratelimit-remaining') === '0') {
    throw new Error('GitHub is temporarily limiting requests. Try again in a little while.')
  }
  if (!response.ok) throw new Error(`GitHub data is unavailable (${response.status}).`)
  return response.json()
}

export async function getGitHubData() {
  if (cachedData) return cachedData
  if (pendingRequest) return pendingRequest
  const username = encodeURIComponent(siteConfig.githubUsername)
  pendingRequest = Promise.all([
    get(`/users/${username}`),
    get(`/users/${username}/repos?sort=updated&per_page=100`),
  ]).then(([profile, repositories]) => {
    cachedData = {
      profile,
      repositories: repositories.filter(repo => !repo.fork).map(repo => ({
        title: repo.name,
        description: repo.description,
        technologies: repo.language ? [repo.language] : [],
        image: null,
        githubUrl: repo.html_url,
        liveUrl: repo.homepage || null,
        featured: false,
        stars: repo.stargazers_count,
        forks: repo.forks_count,
        updatedAt: repo.updated_at,
      })),
    }
    return cachedData
  }).catch(error => { pendingRequest = undefined; throw error })
  return pendingRequest
}

export async function getGitHubContributions() {
  const username = encodeURIComponent(siteConfig.githubUsername)
  const response = await fetch(`https://github-contributions-api.jogruber.de/v4/${username}?y=last`)
  if (!response.ok) throw new Error(`Contribution data is unavailable (${response.status}).`)
  const data = await response.json()
  if (!Array.isArray(data.contributions)) throw new Error('Contribution data is unavailable.')
  return data.contributions
}
