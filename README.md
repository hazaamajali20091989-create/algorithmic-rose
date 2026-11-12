# Algorithmic Rose (React + Three.js + Tailwind + Vite)

## Setup
npm install
npm run dev        # http://localhost:5173 (use --host to open it on your phone)

## Build
npm run build      # output: dist/
npm run preview

## Deploy: GitHub Pages
1. Create a repo and upload all the files (not node_modules, not dist).
2. Settings > Pages > Source: GitHub Actions.
3. Push to main. The workflow .github/workflows/deploy.yml builds and publishes.

## Deploy: Vercel
1. Import the repo at vercel.com/new.
2. Framework: Vite (auto). Build: npm run build. Output: dist.
3. Deploy.
