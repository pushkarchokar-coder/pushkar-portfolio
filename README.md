# Pushkar's Portfolio

Personal portfolio built with React and Vite, deployed to GitHub Pages.

## Development

```sh
npm ci
npm run dev
```

Create `.env.local` from `.env.example` for public profile settings. WakaTime credentials must stay server-side; do not add them as `VITE_` variables.

## GitHub Pages

The `main` branch workflow builds and deploys the site. It also refreshes the public WakaTime summary every 15 minutes. Add `WAKATIME_API_KEY` under **Settings → Secrets and variables → Actions** in the repository to enable those stats. The key is used only by the workflow and never included in the published JavaScript. Until it is configured, the coding section reports that data is unavailable instead of showing sample statistics.

Projects and the GitHub section use the public GitHub API for `pushkarchokar-coder`. Change `VITE_GITHUB_USERNAME` only if the account name changes. LinkedIn is optional and can be set with `VITE_LINKEDIN_URL` once the exact profile URL is known.
