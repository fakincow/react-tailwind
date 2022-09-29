import React from 'react';
import { Routes, Route } from 'react-router-dom'
import './App.css';
import { HomePage } from './pages/HomePage';
import { Favourites } from './pages/FavouritesPage';
import { Navigation } from './components/Navigation';

function App() {
  return (
    <div className="App">
      <Navigation />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/favourites" element={<Favourites />} />
      </Routes>
    </div>
  );
}

export default App;
