# MrHost.ai Chrome Side Panel Extension

This project is a React + TypeScript + Vite Chrome extension that surfaces the MrHost.ai side panel alongside any active tab. The extension listens for tab changes in the background service worker and renders the side panel UI through React components.

## Prerequisites
- Node.js 18+ and npm (comes with Node).
- Google Chrome or another Chromium-based browser for loading the unpacked extension.

## Getting Started
1. **Install dependencies**
   ```bash
   npm install
   ```
2. **Start the development server (optional UI testing)**
   ```bash
   npm run dev
   ```
   This runs Vite on [http://localhost:5173](http://localhost:5173) with hot module reloading. Because Chrome extensions must be loaded from built assets, this command is primarily for iterating on UI components before producing a build.
3. **Build the extension**
   ```bash
   npm run build
   ```
   The bundled extension assets are emitted to the `build/` directory with separate entry points for the popup, side panel, and background service worker.

## Run locally (step-by-step commands)
Use the following sequence of commands from a fresh clone to produce the unpacked build for Chrome:
```bash
git clone <repo-url>
cd guest-chrome-extension
npm install
npm run build
```
After the build completes, load the `build/` directory as an unpacked extension via `chrome://extensions`.

## Loading the extension in Chrome
1. Run `npm run build` to ensure the `build/` folder is up to date.
2. Open Chrome and navigate to `chrome://extensions`.
3. Enable **Developer mode** in the top-right corner.
4. Click **Load unpacked** and select the `build/` directory from this repository.
5. Pin the extension and open the side panel to verify the React UI renders correctly.

## Environment configuration
No secrets are required for local use. The only external dependency is the Healvi API base URL defined in [`src/consts/healvi.ts`](src/consts/healvi.ts).

If you need to override that value per environment, create a `.env` file at the project root (ignored by Git) and add Vite-prefixed variables, for example:
```bash
VITE_HEALVI_API_BASE_URL=https://example.com/third-party/v1
```
Then update `src/consts/healvi.ts` to read from `import.meta.env.VITE_HEALVI_API_BASE_URL` so the build picks up your custom endpoint.

## Available npm scripts
- `npm run dev` – Start Vite in development mode with hot module reload.
- `npm run build` – Type-check the project and produce production extension assets in `build/`.
- `npm run preview` – Preview the production build locally.
- `npm run lint` – Run ESLint against the project sources.

## Project structure
- `public/manifest.json` – Chrome extension manifest (MV3) configuring the background service worker and side panel.
- `src/background.ts` – Background service worker that tracks tab changes and notifies the UI.
- `src/sidepanel.html` – Entry HTML file for the side panel rendered by React.
- `src/components/` – React components that render the side panel UI.
- `src/hooks/useHealviChatIframe.ts` – Fetches the Healvi chat iframe URL from the configured API.
