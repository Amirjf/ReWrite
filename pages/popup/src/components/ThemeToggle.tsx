import { useStorage } from '@extension/shared';
import { exampleThemeStorage } from '@extension/storage';
import { cn } from '@extension/ui';

export const ThemeToggle = () => {
  const { isLight } = useStorage(exampleThemeStorage);

  return (
    <button
      onClick={() => exampleThemeStorage.toggle()}
      className={cn(
        'relative inline-flex h-7 w-12 items-center rounded-full shadow-lg transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 active:scale-95',
        'bg-gradient-to-r from-gray-300 to-gray-400 focus:ring-indigo-500',
        'dark:from-indigo-600 dark:to-purple-600 dark:shadow-indigo-500/30 dark:focus:ring-indigo-400',
      )}
      aria-label="Toggle dark mode">
      {/* Sun icon for light mode - positioned on the left */}
      <svg
        className="absolute left-1 h-3.5 w-3.5 text-yellow-500 opacity-100 transition-opacity dark:text-gray-100 dark:opacity-85"
        fill="currentColor"
        viewBox="0 0 20 20">
        <path
          fillRule="evenodd"
          d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
          clipRule="evenodd"
        />
      </svg>
      {/* Moon icon for dark mode - positioned on the right */}
      <svg
        className="absolute right-1 h-3.5 w-3.5 text-gray-900 opacity-70 transition-opacity dark:text-blue-200 dark:opacity-100"
        fill="currentColor"
        viewBox="0 0 20 20">
        <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
      </svg>
      <span
        className={cn(
          'relative z-10 inline-block h-5 w-5 transform rounded-full bg-white shadow-lg transition-transform duration-300',
          isLight ? 'translate-x-1' : 'translate-x-6',
        )}
      />
      <span className="sr-only">{isLight ? 'Switch to dark mode' : 'Switch to light mode'}</span>
    </button>
  );
};
