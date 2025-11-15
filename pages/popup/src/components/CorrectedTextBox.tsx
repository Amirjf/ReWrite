import { cn } from '@extension/ui';

interface CorrectedTextBoxProps {
  correctedText: string;
  copied: boolean;
  onCopy: () => void;
}

export const CorrectedTextBox = ({ correctedText, copied, onCopy }: CorrectedTextBoxProps) => (
  <div className="flex flex-col gap-3">
    <div className="flex items-center justify-between">
      <span className="flex items-center gap-2 text-sm font-semibold text-gray-100">
        <svg className="h-5 w-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        Corrected text:
      </span>
      <button
        onClick={onCopy}
        className={cn(
          'group relative flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium shadow-lg transition-all duration-200',
          copied ? 'bg-green-900/30 text-green-300' : 'bg-indigo-900/30 text-indigo-300 hover:bg-indigo-900/50',
        )}>
        {copied ? (
          <>
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            Copied!
          </>
        ) : (
          <>
            <svg
              className="h-4 w-4 transition-transform group-hover:scale-110"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
              />
            </svg>
            Copy
          </>
        )}
      </button>
    </div>
    <div className="min-h-[120px] w-full rounded-xl border-2 border-green-900/50 bg-gradient-to-br from-green-900/10 to-emerald-900/10 p-4 text-sm text-gray-100 shadow-lg backdrop-blur-sm">
      {correctedText}
    </div>
  </div>
);
