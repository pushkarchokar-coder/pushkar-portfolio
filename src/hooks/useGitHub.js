import { useEffect, useState } from 'react'
import { getGitHubContributions, getGitHubData } from '../services/githubApi.js'

export function useGitHub() {
  const [state, setState] = useState({ loading: true, profile: null, repositories: [], error: null, contributions: [], contributionsError: false })
  useEffect(() => {
    let active = true
    getGitHubData().then(data => { if (active) setState({ loading: false, ...data, error: null }) })
      .catch(error => { if (active) setState({ loading: false, profile: null, repositories: [], error: error.message }) })
    getGitHubContributions().then(contributions => { if (active) setState(current => ({ ...current, contributions, contributionsError: false })) })
      .catch(() => { if (active) setState(current => ({ ...current, contributionsError: true })) })
    return () => { active = false }
  }, [])
  return state
}
