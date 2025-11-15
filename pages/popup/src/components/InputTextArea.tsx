import { cn } from '@extension/ui';

interface InputTextAreaProps {
  inputText: string;
  setInputText: (value: string) => void;
  isLoading: boolean;
  validation: {
    charCount: number;
    exceedsChars: boolean;
    isValid: boolean;
  };
  maxCharacters: number;
}

export const InputTextArea = ({
  inputText,
  setInputText,
  isLoading,
  validation,
  maxCharacters,
}: InputTextAreaProps) => (
  <div className="flex flex-col gap-3">
    <div className="flex items-center justify-between">
      <label htmlFor="inputText" className="text-sm font-semibold text-gray-100">
        Enter text to fix:
      </label>
      <span
        className={cn('font-mono text-xs', validation.exceedsChars ? 'font-semibold text-red-400' : 'text-gray-400')}>
        {validation.charCount}/{maxCharacters}
      </span>
    </div>
    <textarea
      id="inputText"
      value={inputText}
      onChange={e => setInputText(e.target.value)}
      placeholder="Type or paste your text here..."
      className={cn(
        'min-h-[120px] w-full resize-none rounded-xl border-2 bg-gray-800/50 p-4 text-sm text-gray-100 shadow-lg backdrop-blur-sm transition-all duration-200 placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900',
        validation.exceedsChars
          ? 'border-red-600 bg-red-900/10 focus:border-red-500 focus:ring-red-500'
          : 'border-gray-700 hover:border-indigo-600 focus:border-indigo-500 focus:ring-indigo-500',
      )}
      disabled={isLoading}
    />
  </div>
);
