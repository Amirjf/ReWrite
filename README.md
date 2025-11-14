# ReWrite

A Chrome extension that fixes grammar and spelling errors in your text using AI. Built with React, TypeScript, and powered by OpenRouter API.

## Features

- ✨ **Grammar & Spelling Correction** - Fix errors in your text with AI-powered corrections
- 🚀 **Fast & Efficient** - Quick response times with optimized token usage
- 💾 **State Persistence** - Your input and corrected text are saved automatically
- 📋 **One-Click Copy** - Easily copy corrected text to clipboard
- 🎨 **Dark Mode Support** - Beautiful UI with light/dark theme
- ⚡ **Character Limit** - Supports up to 2000 characters per request

## Architecture

ReWrite consists of two main components:

1. **Chrome Extension** - React-based popup interface for user interaction
2. **API Server** - Express.js backend that processes grammar corrections via OpenRouter

## Prerequisites

- Node.js >= 22.15.1
- pnpm >= 10.11.0
- OpenRouter API key ([Get one here](https://openrouter.ai/keys))

## Quick Start

### 1. Clone and Install

```bash
git clone <repository-url>
cd ReWrite
pnpm install
```

### 2. Setup API Server

```bash
cd api
cp ENV_EXAMPLE.txt .env
```

Edit `.env` and add your OpenRouter API key:

```env
OPENROUTER_API_KEY=your_openrouter_api_key_here
OPENROUTER_MODEL=openai/gpt-4o-2024-08-06
PORT=4000
APP_URL=http://localhost:4000
```

Start the API server:

```bash
npm install
npm start
```

### 3. Build Extension

```bash
# From project root
pnpm build
```

### 4. Load Extension in Chrome

1. Open Chrome and navigate to `chrome://extensions/`
2. Enable "Developer mode" (toggle in top right)
3. Click "Load unpacked"
4. Select the `dist` folder from the project root

## Development

### Run Extension in Development Mode

```bash
pnpm dev
```

The extension will auto-reload on file changes.

### Run API in Development Mode

```bash
cd api
npm run dev
```

### Build for Production

```bash
pnpm build
```

### Package Extension

```bash
pnpm zip
```

This creates a zip file ready for Chrome Web Store submission.

## Project Structure

```
ReWrite/
├── api/                 # Express.js API server
├── chrome-extension/    # Extension manifest and config
├── pages/              # Extension pages (popup, options, etc.)
├── packages/           # Shared packages (ui, storage, i18n, etc.)
├── dist/               # Built extension (generated)
└── tests/              # E2E tests
```

## Tech Stack

- **Frontend**: React 19, TypeScript, Vite, Tailwind CSS
- **Backend**: Express.js, Node.js
- **AI**: OpenRouter API (OpenAI models)
- **Build**: Turbo (monorepo), pnpm workspaces
- **Testing**: Playwright (E2E)

## Configuration

### API Configuration

Edit `api/.env` to customize:
- `OPENROUTER_MODEL` - AI model to use (default: `openai/gpt-4o-2024-08-06`)
- `PORT` - API server port (default: `4000`)
- `MAX_CHARACTERS` - Maximum input length (default: `2000`)

### Extension Configuration

Update `pages/popup/src/Popup.tsx` to change the API URL:

```typescript
const API_URL = 'http://localhost:4000'; // Change to your deployed API URL
```

## Docker Deployment

The API can be deployed using Docker:

```bash
cd api
docker-compose up -d
```

Make sure to set `OPENROUTER_API_KEY` environment variable before running.

## License

MIT

