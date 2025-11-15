import { cn } from '@extension/ui';

interface CorrectedTextBoxProps {
  correctedText: string;
  copied: boolean;
  onCopy: () => void;
  isLight: boolean;
}

export const CorrectedTextBox = ({ correctedText, copied, onCopy, isLight }: CorrectedTextBoxProps) => (
  <div className="flex flex-col gap-2">
    <div className="flex items-center justify-between">
      <span className="text-sm font-medium">Corrected text:</span>
      <button
        onClick={onCopy}
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
);
