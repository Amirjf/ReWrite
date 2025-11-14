# Grammar Fix API

A simple Node.js API server that uses OpenRouter to fix grammar and spelling errors in text.

## Features

- Uses OpenRouter API for cost-effective AI model access
- Validates input: Maximum 1000 characters
- Automatically calculates optimal token limits
- Dockerized for easy deployment

## Setup

1. Get your OpenRouter API key from [OpenRouter](https://openrouter.ai/keys)

2. Copy `ENV_EXAMPLE.txt` to `.env`:
   ```bash
   cp ENV_EXAMPLE.txt .env
   ```

3. Add your OpenRouter API key to `.env`:
   ```
   OPENROUTER_API_KEY=your_openrouter_api_key_here
   OPENROUTER_MODEL=openai/gpt-3.5-turbo
   PORT=3000
   APP_URL=http://localhost:3000
   ```

4. Install dependencies:
   ```bash
   npm install
   ```

## Running Locally

```bash
npm start
```

For development with auto-reload:
```bash
npm run dev
```

## Docker

### Build and run with Docker Compose

```bash
docker-compose up -d
```

Make sure to set the `OPENROUTER_API_KEY` environment variable before running:
```bash
export OPENROUTER_API_KEY=your_key_here
docker-compose up -d
```

### Build Docker image manually

```bash
docker build -t grammar-fix-api .
docker run -p 3000:3000 -e OPENROUTER_API_KEY=your_key_here grammar-fix-api
```

## API Endpoints

### POST /api/fix-grammar

Fixes grammar and spelling errors in the provided text.

**Validation:**
- Maximum 1000 characters
- Text cannot be empty

**Request:**
```json
{
  "text": "This is a sentance with erors."
}
```

**Response:**
```json
{
  "correctedText": "This is a sentence with errors."
}
```

**Error Response (validation failed):**
```json
{
  "error": "Text exceeds maximum length of 1000 characters"
}
```

### GET /health

Health check endpoint.

**Response:**
```json
{
  "status": "ok"
}
```

## Configuration

- `MAX_CHARACTERS`: Maximum character length (default: 1000)
- `MAX_TOKENS`: Maximum tokens for API response (default: 300)
- `OPENROUTER_MODEL`: Model to use (default: `openai/gpt-3.5-turbo`)

You can change the model in `.env` to use different models available on OpenRouter, such as:
- `openai/gpt-3.5-turbo` (default, cost-effective)
- `openai/gpt-4`
- `anthropic/claude-3-haiku`
- And many more available on [OpenRouter](https://openrouter.ai/models)

