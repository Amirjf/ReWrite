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

### 2. Setup Environment Variables

**Generate a secure API key:**
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

**Configure the extension:**
```bash
pnpm set-global-env CEB_API_URL=http://localhost:3000 CEB_API_SECRET_KEY=your_generated_key_here
```

**Configure the web API:**

Create `web/.env.local`:
```env
API_SECRET_KEY=your_generated_key_here
OPENROUTER_API_KEY=your_openrouter_key_here
APP_URL=http://localhost:3000
OPENROUTER_MODEL=qwen/qwen-2.5-72b-instruct
```

> **⚠️ Security Note**: See [SECURITY_SETUP.md](./SECURITY_SETUP.md) for detailed security configuration and best practices.

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

