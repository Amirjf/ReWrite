import { cn } from '@extension/ui';

interface FixGrammarButtonProps {
  onClick: () => void;
  isLoading: boolean;
  isValid: boolean;
}

export const FixGrammarButton = ({ onClick, isLoading, isValid }: FixGrammarButtonProps) => (
  <button
    onClick={onClick}
    disabled={isLoading || !isValid}
    className={cn(
      'group relative overflow-hidden rounded-xl px-6 py-3 font-semibold text-white transition-all duration-300',
      'disabled:cursor-not-allowed disabled:opacity-50',
      'shadow-lg hover:shadow-xl active:scale-95',
      'bg-gradient-to-r from-indigo-600 to-purple-700 shadow-indigo-600/40 hover:from-indigo-700 hover:to-purple-800',
    )}>
    <span className="relative z-10 flex items-center justify-center gap-2">
      {isLoading ? (
        <>
          <svg className="h-5 w-5 animate-spin" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
          Fixing...
        </>
      ) : (
        <>
          <svg
            className="h-5 w-5 transition-transform group-hover:scale-110"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          Fix Grammar
        </>
      )}
    </span>
    <div className="absolute inset-0 -translate-x-full transform bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-1000 group-hover:translate-x-full" />
  </button>
);
