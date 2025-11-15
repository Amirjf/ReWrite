import { createOpenAI } from '@ai-sdk/openai';
import { generateObject } from 'ai';
import { NextResponse } from 'next/server';
import { z } from 'zod';
import type { NextRequest } from 'next/server';

const MAX_CHARACTERS = 2000;
const MAX_TOKENS = 2000;
const MIN_TOKENS = 500;

const grammarCorrectionSchema = z.object({
  correctedText: z
    .string()
    .describe('The corrected text with grammar and spelling errors fixed'),
});

const openai = createOpenAI({
  apiKey: process.env.OPENROUTER_API_KEY,
  baseURL: 'https://openrouter.ai/api/v1',
  headers: {
    'HTTP-Referer': process.env.APP_URL || 'http://localhost:3000',
    'X-Title': 'Grammar Fixer Extension',
  },
});

export async function POST(request: NextRequest) {
  try {
    // Security Layer 1: Validate Chrome Extension Origin
    const origin = request.headers.get('origin');
    const allowedExtensionId = process.env.CHROME_EXTENSION_ID;

    console.log({ origin });

    // In production, validate the extension ID
    if (process.env.NODE_ENV === 'production' && allowedExtensionId) {
      const expectedOrigin = `chrome-extension://${allowedExtensionId}`;
      if (origin !== expectedOrigin) {
        console.warn(`Unauthorized origin attempt: ${origin}`);
        return NextResponse.json(
          { error: 'Unauthorized - Invalid origin' },
          { status: 403 }
        );
      }
    }

    // Security Layer 2: Validate API key (optional, for dev/testing)
    const apiKey = request.headers.get('X-API-Key');
    const validApiKey = process.env.API_SECRET_KEY;

    if (validApiKey && (!apiKey || apiKey !== validApiKey)) {
      return NextResponse.json(
        { error: 'Unauthorized - Invalid API key' },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { text } = body;

    if (!text || typeof text !== 'string') {
      return NextResponse.json({ error: 'Text is required' }, { status: 400 });
    }

    if (text.length > MAX_CHARACTERS) {
      return NextResponse.json(
        {
          error: `Text exceeds maximum length of ${MAX_CHARACTERS} characters`,
        },
        { status: 400 }
      );
    }

    if (!text.trim()) {
      return NextResponse.json(
        { error: 'Text cannot be empty' },
        { status: 400 }
      );
    }

    if (!process.env.OPENROUTER_API_KEY) {
      return NextResponse.json(
        { error: 'OpenRouter API key is not configured' },
        { status: 500 }
      );
    }

    const estimatedInputTokens = Math.ceil(text.length / 4);
    const calculatedMaxTokens = Math.max(
      MIN_TOKENS,
      Math.min(Math.ceil(estimatedInputTokens * 1.5), MAX_TOKENS)
    );

    const result = await generateObject({
      model: openai(
        process.env.OPENROUTER_MODEL || 'qwen/qwen-2.5-72b-instruct'
      ),
      schema: grammarCorrectionSchema,

      messages: [
        {
          role: 'system',
          content: `
You are a world-class grammar and sentence correction engine.

Rules:
- Fix grammar, spelling, punctuation, clarity.
- DO NOT change meaning.
- DO NOT add new ideas.
- Preserve formatting (line breaks, paragraphs).
- Preserve tone (formal stays formal, casual stays casual).
- No markdown, no explanations, no intro text.
- Output ONLY the corrected text.
`,
        },
        {
          role: 'user',
          content: text,
        },
      ],
      temperature: 0.4,
      maxOutputTokens: calculatedMaxTokens,
    });

    const correctedText = result.object?.correctedText || text;

    return NextResponse.json({ correctedText });
  } catch (error: any) {
    console.error('Error fixing grammar:', error);

    if (
      error.name === 'AI_NoObjectGeneratedError' ||
      error.name === 'AI_JSONParseError'
    ) {
      return NextResponse.json(
        {
          error: 'Failed to generate valid response',
          message:
            'The response was incomplete or invalid. Please try again with shorter text.',
        },
        { status: 500 }
      );
    }

    return NextResponse.json(
      {
        error: 'Failed to fix grammar',
        message: error.message || 'An unexpected error occurred',
      },
      { status: 500 }
    );
  }
}
