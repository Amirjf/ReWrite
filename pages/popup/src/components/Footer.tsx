export const Footer = () => (
  <div className="mt-auto flex items-center justify-between gap-2">
    <div className="flex">
      <a href="https://linkedin.com/in/amir-jafari/" target="_blank" className="text-xs text-gray-300">
        Built with ❤️ by <span className="font-bold">Amir</span>
      </a>
    </div>

    <a href="https://www.buymeacoffee.com/amirjf" target="_blank" className="flex items-end justify-end">
      <img
        src="https://img.buymeacoffee.com/button-api/?text=Buy me a coffee&emoji=☕&slug=amirjf&button_colour=FFDD00&font_colour=000000&font_family=Bree&outline_colour=000000&coffee_colour=ffffff"
        alt="Buy Me A Coffee"
        className="h-16 w-32 object-contain"
      />
    </a>
  </div>
);
