import { cn } from '@extension/ui';

interface ErrorMessageProps {
  error: string;
  isLight: boolean;
}

export const ErrorMessage = ({ error, isLight }: ErrorMessageProps) => (
  <div className={cn('rounded p-2 text-sm', isLight ? 'bg-red-100 text-red-800' : 'bg-red-900 text-red-200')}>
    {error}
  </div>
);
