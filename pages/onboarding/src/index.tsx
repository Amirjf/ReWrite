import Onboarding from '@src/Onboarding';
import { createRoot } from 'react-dom/client';
import '@src/index.css';

const init = () => {
  const appContainer = document.querySelector('#app-container');
  if (!appContainer) {
    throw new Error('Cannot find #app-container');
  }
  const root = createRoot(appContainer);

  root.render(<Onboarding />);
};

init();
