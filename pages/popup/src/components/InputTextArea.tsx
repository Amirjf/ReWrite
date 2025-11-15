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
  isLight: boolean;
}

export const InputTextArea = ({
  inputText,
  setInputText,
  isLoading,
  validation,
  maxCharacters,
  isLight,
}: InputTextAreaProps) => (
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
        {validation.charCount}/{maxCharacters} chars
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
);
