import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';

// Create container for React app
const container = document.createElement('div');
container.id = 'react-app';
document.body.appendChild(container);

// Render React app
const root = createRoot(container);
root.render(<App />);