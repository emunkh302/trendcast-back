// src/index.js
import React from 'react';
import ReactDOM from 'react-dom/client'; // Update this import
import App from './App';
import './styles.css'; // We'll create this file for styling
import { BrowserRouter } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root')); // Use createRoot
root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
