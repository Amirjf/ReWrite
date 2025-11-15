export const Footer = () => (
  <div className="mt-auto flex items-end justify-between border-t border-gray-700/50 pt-4">
    <div className="flex flex-col gap-1.5">
      <a
        href="https://rewrite.canny.io/feature-requests/p/custom-instructions"
        target="_blank"
        className="group flex items-center gap-1 text-xs text-gray-400 transition-colors hover:text-indigo-400">
        <svg
          className="h-3.5 w-3.5 transition-transform group-hover:scale-110"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
        </svg>
        Request a feature
      </a>
      <a href="https://linkedin.com/in/amir-jafari/" target="_blank" className="text-xs text-gray-400">
        Built with <span className="inline-block animate-pulse text-red-500">❤️</span> by{' '}
        <span className="font-bold text-indigo-400 transition-colors hover:text-indigo-300">Amir</span>
      </a>
    </div>

    <a
      href="https://www.buymeacoffee.com/amirjf"
      target="_blank"
      className="flex items-end transition-transform hover:scale-105 active:scale-95">
      <img
        src="https://img.buymeacoffee.com/button-api/?text=Buy me a coffee&emoji=☕&slug=amirjf&button_colour=FFDD00&font_colour=000000&font_family=Bree&outline_colour=000000&coffee_colour=ffffff"
        alt="Buy Me A Coffee"
        className="h-auto max-h-16 w-36 rounded-lg object-contain shadow-md"
      />
    </a>
  </div>
);
