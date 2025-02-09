import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import './styles.css';
import { HeroesApp } from './HeroesApp';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter basename='/react-heroes-spa'>
      <HeroesApp />
    </BrowserRouter>
  </StrictMode>,
)
