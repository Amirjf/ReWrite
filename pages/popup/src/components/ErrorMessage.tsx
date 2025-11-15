interface ErrorMessageProps {
  error: string;
}

export const ErrorMessage = ({ error }: ErrorMessageProps) => (
  <div className="animate-in slide-in-from-top-2 flex items-start gap-3 rounded-xl border-2 border-red-900/50 bg-red-900/20 p-4 text-sm text-red-200 shadow-lg backdrop-blur-sm duration-300">
    <svg className="h-5 w-5 flex-shrink-0 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    </svg>
    <span className="flex-1">{error}</span>
  </div>
);
