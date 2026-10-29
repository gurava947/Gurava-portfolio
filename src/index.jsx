import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/bootstrap-shim.css';
import './styles/fonts-local.css';
import './styles/font-fallbacks.css';
import './index.css';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
