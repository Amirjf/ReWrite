import '@src/Popup.css';
import { CorrectedTextBox } from './components/CorrectedTextBox';
import { ErrorMessage } from './components/ErrorMessage';
import { FixGrammarButton } from './components/FixGrammarButton';
import { Footer } from './components/Footer';
import { Header } from './components/Header';
import { InputTextArea } from './components/InputTextArea';
import { API_ENDPOINT, API_SECRET_KEY } from '../../../packages/env/lib';
import { withErrorBoundary, withSuspense, useStorage } from '@extension/shared';
import { createStorage, StorageEnum } from '@extension/storage/lib/base/index.js';
import { ErrorDisplay, LoadingSpinner } from '@extension/ui';
import { useState, useMemo, useEffect } from 'react';

const API_URL = API_ENDPOINT || 'https://rewrite-chrome.vercel.app';

const MAX_CHARACTERS = 2000;

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
  const storedState = useStorage(popupStateStorage);
  const [inputText, setInputText] = useState('');
  const [correctedText, setCorrectedText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    if (!isInitialized) {
      setInputText(storedState.inputText);
      setCorrectedText(storedState.correctedText);
      setIsInitialized(true);
    }
  }, [storedState, isInitialized]);

  useEffect(() => {
    if (isInitialized) {
      popupStateStorage.set({
        inputText,
        correctedText,
      });
    }
  }, [inputText, correctedText, isInitialized]);

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
          'X-API-Key': API_SECRET_KEY as string,
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
    <div className="App bg-gray-900">
      <div className="relative z-10 flex h-full flex-col gap-5 p-6 text-gray-100">
        <Header />

        <InputTextArea
          inputText={inputText}
          setInputText={setInputText}
          isLoading={isLoading}
          validation={validation}
          maxCharacters={MAX_CHARACTERS}
        />

        <FixGrammarButton onClick={handleFixGrammar} isLoading={isLoading} isValid={validation.isValid} />

        {error && <ErrorMessage error={error} />}

        {correctedText && <CorrectedTextBox correctedText={correctedText} copied={copied} onCopy={handleCopy} />}

        <Footer />
      </div>
    </div>
  );
};

export default withErrorBoundary(withSuspense(Popup, <LoadingSpinner />), ErrorDisplay);
