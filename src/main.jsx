import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { HashRouter } from 'react-router-dom';
import './styles.css';
import { HeroesApp } from './HeroesApp';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <HashRouter>
      <HeroesApp />
    </HashRouter>
  </StrictMode>,
)
