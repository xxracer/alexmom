import {StrictMode} from 'react';
import {createRoot, hydrateRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';

const rootEl = document.getElementById('root')!;
const initialLang = location.pathname.replace(/\/+$/, '').endsWith('/es') ? 'es' : 'en';

const app = (
  <StrictMode>
    <App initialLang={initialLang} />
  </StrictMode>
);

// Hydrate the server-rendered HTML when present; fall back to a plain
// client render (e.g. `vite dev`, which serves an empty #root).
if (rootEl.hasChildNodes()) {
  hydrateRoot(rootEl, app);
} else {
  createRoot(rootEl).render(app);
}