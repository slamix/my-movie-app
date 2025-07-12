import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from '../pages/HomePage';
import FavoritesPage from '../pages/FavoritesPage';
import MoviePage from '../pages/MoviePage';

const AppRoutes: React.FC = () => (
  <Routes>
    <Route path="/" element={<HomePage />} />
    <Route path="/favorites" element={<FavoritesPage />} />
    <Route path="/movie/:id" element={<MoviePage />} />
  </Routes>
);

export default AppRoutes;