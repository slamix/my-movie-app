import * as React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import HomePage from '../pages/HomePage';
import FavoritesPage from '../pages/FavoritesPage';
import MoviePage from '../pages/MoviePage';

const AppRoutes: React.FC = () => (
  <Routes>
    <Route path="/" element={<HomePage />} />
    <Route path="/favorites" element={<FavoritesPage />} />
    <Route path="/favorites/movie/:id" element={<MoviePage />} />
    <Route path="/movie/:id" element={<MoviePage />} />
    <Route path="*" element={<Navigate to="/" />} />
  </Routes>
);

export default AppRoutes;