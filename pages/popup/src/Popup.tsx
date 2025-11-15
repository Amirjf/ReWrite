import '@src/Popup.css';
import { withErrorBoundary, withSuspense, useStorage } from '@extension/shared';
import { exampleThemeStorage } from '@extension/storage';
import { createStorage, StorageEnum } from '@extension/storage/lib/base/index.js';
import { cn, ErrorDisplay, LoadingSpinner } from '@extension/ui';
import { useState, useMemo, useEffect } from 'react';

// API URL - change this to your deployed API URL (e.g., 'https://your-api.hetzner.com')
const API_URL = 'http://localhost:3000';

// Validation constants (must match backend)
const MAX_CHARACTERS = 2000;

// Storage for popup state
interface PopupState {
  inputText: string;
  correctedText: string;
}

const popupStateStorage = createStorage<PopupState>(
  'grammar-fixer-popup-state',
  {
    inputText: '',
    correctedText: '',
  },
  {
    storageEnum: StorageEnum.Local,
    liveUpdate: false,
    serialization: {
      serialize: (value: PopupState) => JSON.stringify(value),
      deserialize: (text: string) => {
        if (!text || text === 'undefined' || text === 'null') {
          return { inputText: '', correctedText: '' };
        }
        try {
          return JSON.parse(text) as PopupState;
        } catch {
          return { inputText: '', correctedText: '' };
        }
      },
    },
  },
);

const Popup = () => {
  const { isLight } = useStorage(exampleThemeStorage);
  const storedState = useStorage(popupStateStorage);
  const [inputText, setInputText] = useState('');
  const [correctedText, setCorrectedText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);

  // Load state from storage on mount
  useEffect(() => {
    if (!isInitialized) {
      setInputText(storedState.inputText);
      setCorrectedText(storedState.correctedText);
      setIsInitialized(true);
    }
  }, [storedState, isInitialized]);

  // Save state to storage whenever it changes (but not on initial load)
  useEffect(() => {
    if (isInitialized) {
      popupStateStorage.set({
        inputText,
        correctedText,
      });
    }
  }, [inputText, correctedText, isInitialized]);

  // Calculate validation metrics
  const validation = useMemo(() => {
    const charCount = inputText.length;
    const exceedsChars = charCount > MAX_CHARACTERS;
    const isValid = !exceedsChars && inputText.trim().length > 0;

    return {
      charCount,
      exceedsChars,
      isValid,
    };
  }, [inputText]);

  const handleFixGrammar = async () => {
    if (!inputText.trim()) {
      setError('Please enter some text to fix');
      return;
    }

    if (!validation.isValid) {
      if (validation.exceedsChars) {
        setError(`Text exceeds maximum length of ${MAX_CHARACTERS} characters`);
      }
      return;
    }

    setIsLoading(true);
    setError(null);
    setCorrectedText('');

    try {
      const response = await fetch(`${API_URL}/api/fix-grammar`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text: inputText }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to fix grammar');
      }

      const data = await response.json();
      setCorrectedText(data.correctedText);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = async () => {
    if (correctedText) {
      await navigator.clipboard.writeText(correctedText);
      setCopied(true);
    }
  };

  // Reset "Copied!" message after 2 seconds
  useEffect(() => {
    if (copied) {
      const timer = setTimeout(() => {
        setCopied(false);
      }, 2000);
      return () => clearTimeout(timer);
    }
    return undefined;
  }, [copied]);

  return (
    <div className={cn('App', isLight ? 'bg-slate-50' : 'bg-gray-800')}>
      <div className={cn('flex h-full flex-col gap-4 p-4', isLight ? 'text-gray-900' : 'text-gray-100')}>
        <h1 className={cn('text-center text-xl font-bold')}>Grammar Fixer</h1>

        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <label htmlFor="inputText" className="text-sm font-medium">
              Enter text to fix:
            </label>
            <span
              className={cn(
                validation.exceedsChars ? 'text-red-500' : isLight ? 'text-gray-600' : 'text-gray-400',
                'text-xs',
              )}>
              {validation.charCount}/{MAX_CHARACTERS} chars
            </span>
          </div>
          <textarea
            id="inputText"
            value={inputText}
            onChange={e => setInputText(e.target.value)}
            placeholder="Type or paste your text here..."
            className={cn(
              'min-h-[100px] w-full resize-none rounded border p-2',
              validation.exceedsChars
                ? isLight
                  ? 'border-red-300 bg-red-50 text-gray-900'
                  : 'border-red-600 bg-red-900/20 text-gray-100'
                : isLight
                  ? 'border-gray-300 bg-white text-gray-900'
                  : 'border-gray-600 bg-gray-700 text-gray-100',
            )}
            disabled={isLoading}
          />
        </div>

        <button
          onClick={handleFixGrammar}
          disabled={isLoading || !validation.isValid}
          className={cn(
            'rounded px-4 py-2 font-semibold transition-all',
            'disabled:cursor-not-allowed disabled:opacity-50',
            isLight ? 'bg-blue-500 text-white hover:bg-blue-600' : 'bg-blue-600 text-white hover:bg-blue-700',
          )}>
          {isLoading ? 'Fixing...' : 'Fix Grammar'}
        </button>

        {error && (
          <div className={cn('rounded p-2 text-sm', isLight ? 'bg-red-100 text-red-800' : 'bg-red-900 text-red-200')}>
            {error}
          </div>
        )}

        {correctedText && (
          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Corrected text:</span>
              <button
                onClick={handleCopy}
                className={cn(
                  'rounded px-2 py-1 text-xs transition-colors',
                  copied
                    ? isLight
                      ? 'bg-green-200 text-green-800'
                      : 'bg-green-800 text-green-200'
                    : isLight
                      ? 'bg-gray-200 hover:bg-gray-300'
                      : 'bg-gray-700 hover:bg-gray-600',
                )}>
                {copied ? 'Copied!' : 'Copy'}
              </button>
            </div>
            <div
              className={cn(
                'min-h-[100px] w-full rounded border p-2',
                isLight ? 'border-gray-300 bg-white text-gray-900' : 'border-gray-600 bg-gray-700 text-gray-100',
              )}>
              {correctedText}
            </div>
          </div>
        )}
        <div className="mt-auto flex items-center justify-between gap-2">
          <div className="flex">
            <a href="https://linkedin.com/in/amir-jafari/" target="_blank" className="text-xs text-gray-300">
              Built with ❤️ by <span className="font-bold">Amir</span>
            </a>
          </div>

          <a href="https://www.buymeacoffee.com/amirjf" target="_blank" className="flex items-end justify-end">
            <img
              src="https://img.buymeacoffee.com/button-api/?text=Buy me a coffee&emoji=☕&slug=amirjf&button_colour=FFDD00&font_colour=000000&font_family=Bree&outline_colour=000000&coffee_colour=ffffff"
              alt="Buy Me A Coffee"
              className="h-16 w-32 object-contain"
            />
          </a>
        </div>
      </div>
    </div>
  );
};

export default withErrorBoundary(withSuspense(Popup, <LoadingSpinner />), ErrorDisplay);
