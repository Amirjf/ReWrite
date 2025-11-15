import { ThemeToggle } from './ThemeToggle';
import { cn } from '@extension/ui';

export const Header = () => (
  <div className="flex items-center justify-between">
    <h1 className={cn('text-left text-xl font-bold')}>Rewrite</h1>
    <ThemeToggle />
  </div>
);
