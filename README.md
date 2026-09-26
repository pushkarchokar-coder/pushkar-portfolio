# Pushkar's Portfolio

Personal portfolio built with React and Vite, deployed to GitHub Pages.

## Development

```sh
npm ci
npm run dev
```

Create `.env.local` from `.env.example` for local WakaTime API access.

## GitHub Pages

The `main` branch workflow builds and deploys the site. It also refreshes the public WakaTime summary every 15 minutes. Add `WAKATIME_API_KEY` under **Settings → Secrets and variables → Actions** in the repository to enable those stats. The API key is used only by the workflow and never included in the published JavaScript.
