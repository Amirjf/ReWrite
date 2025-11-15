import { cn } from '@extension/ui';

interface FixGrammarButtonProps {
  onClick: () => void;
  isLoading: boolean;
  isValid: boolean;
  isLight: boolean;
}

export const FixGrammarButton = ({ onClick, isLoading, isValid, isLight }: FixGrammarButtonProps) => (
  <button
    onClick={onClick}
    disabled={isLoading || !isValid}
    className={cn(
      'rounded px-4 py-2 font-semibold transition-all',
      'disabled:cursor-not-allowed disabled:opacity-50',
      isLight ? 'bg-blue-500 text-white hover:bg-blue-600' : 'bg-blue-600 text-white hover:bg-blue-700',
    )}>
    {isLoading ? 'Fixing...' : 'Fix Grammar'}
  </button>
);
