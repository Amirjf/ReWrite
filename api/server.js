import express from 'express';
import cors from 'cors';
import { config as dotenvConfig } from 'dotenv';
import { generateObject } from 'ai';
import { createOpenAI } from '@ai-sdk/openai';
import { z } from 'zod';

dotenvConfig();

const app = express();
const port = process.env.PORT || 4000;

const MAX_CHARACTERS = 2000;
const MAX_TOKENS = 2000;
const MIN_TOKENS = 500;

app.use(cors());
app.use(express.json());

const openai = createOpenAI({
  apiKey: process.env.OPENROUTER_API_KEY,
  baseURL: 'https://openrouter.ai/api/v1',
  headers: {
    'HTTP-Referer': process.env.APP_URL || 'http://localhost:4000', // Optional: for analytics
    'X-Title': 'Grammar Fixer Extension', // Optional: for analytics
  },
});

// Zod schema for grammar correction response
const grammarCorrectionSchema = z.object({
  correctedText: z.string().describe('The corrected text with grammar and spelling errors fixed'),
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

// Grammar fix endpoint
app.post('/api/fix-grammar', async (req, res) => {
  try {
    const { text } = req.body;

    if (!text || typeof text !== 'string') {
      return res.status(400).json({ error: 'Text is required' });
    }

    if (text.length > MAX_CHARACTERS) {
      return res.status(400).json({
        error: `Text exceeds maximum length of ${MAX_CHARACTERS} characters`,
      });
    }

    if (!text.trim()) {
      return res.status(400).json({ error: 'Text cannot be empty' });
    }

    if (!process.env.OPENROUTER_API_KEY) {
      return res.status(500).json({ error: 'OpenRouter API key is not configured' });
    }

    const estimatedInputTokens = Math.ceil(text.length / 4);
    const calculatedMaxTokens = Math.max(MIN_TOKENS, Math.min(Math.ceil(estimatedInputTokens * 1.5), MAX_TOKENS));

    const result = await generateObject({
      model: openai(process.env.OPENROUTER_MODEL || 'gpt-4o-2024-08-06'),
      schema: grammarCorrectionSchema,
      prompt: `You are a helpful assistant that fixes grammar and spelling errors in text. Fix the grammar and spelling errors in the following text and return only the corrected text without any explanations or additional comments.

Text to fix: "${text}"`,
      temperature: 0.3,
      maxTokens: calculatedMaxTokens,
    });

    const correctedText = result.object?.correctedText || text;

    res.json({ correctedText });
  } catch (error) {
    console.error('Error fixing grammar:', error);

    if (error.name === 'AI_NoObjectGeneratedError' || error.name === 'AI_JSONParseError') {
      return res.status(500).json({
        error: 'Failed to generate valid response',
        message: 'The response was incomplete or invalid. Please try again with shorter text.',
      });
    }

    res.status(500).json({
      error: 'Failed to fix grammar',
      message: error.message || 'An unexpected error occurred',
    });
  }
});

app.listen(port, () => {
  console.log(`Grammar fix API server running on port ${port}`);
});
