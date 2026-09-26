import { cp, copyFile, mkdir, writeFile } from 'node:fs/promises'

await mkdir('assets', { recursive: true })
await cp('dist/assets', 'assets', { recursive: true, force: true })
await mkdir('api', { recursive: true })
await copyFile('dist/index.html', 'index.html')
await copyFile('dist/favicon.svg', 'favicon.svg')
await copyFile('dist/icons.svg', 'icons.svg')
await copyFile('dist/api/wakatime.json', 'api/wakatime.json')
await writeFile('.nojekyll', '', 'utf8')
