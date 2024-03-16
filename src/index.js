import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './index.css';
import App from './App';
import MemesMaker from './pages/memesMaker/memesMaker';

const ProductRoute = () => {
  return (
    <Router>
      <Routes>
      <Route path="/" element={<App />} />
      <Route path='/meme/:id' element={<MemesMaker />} />
      </Routes>
    </Router>
  );
};

const root = document.getElementById('root');

// Use createRoot instead of ReactDOM.render
createRoot(root).render(
  <React.StrictMode>
    <ProductRoute />
  </React.StrictMode>
);
