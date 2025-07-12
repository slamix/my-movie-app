import { useState } from 'react';
import * as React from 'react';
import Header from '../components/Header';
import MoviesList from '../components/MoviesList';
import Box from '@mui/material/Box';
import FilterSection from '../components/FilterSection';
import { mockMovies } from '../constants/FilterSection.constants';
import type { FilterState } from '../constants/FilterSection.constants';


const HomePage: React.FC = () => {
  const [, setFiltered] = useState(mockMovies);


  function handleApply(filters: FilterState) {
    setFiltered(
      mockMovies.filter((movie) => {
        // Фильтр по жанрам
        if (filters.genres.length && !filters.genres.some((g: string) => movie.genres.includes(g))) return false;
        // Фильтр по рейтингу
        const rating = parseFloat(movie.rating);
        if (rating < parseFloat(filters.minRating) || rating > parseFloat(filters.maxRating)) return false;
        // Фильтр по году
        if (filters.year !== 'all') {
          const y = movie.year;
          if (filters.year.includes('-')) {
            const [from, to] = filters.year.split('-').map(Number);
            if (y < from || y > to) return false;
          } else {
            if (String(y) !== filters.year) return false;
          }
        }
        return true;
      })
    );
  }

  return (
    <Box sx={{ bgcolor: '#f7f7fa', minHeight: '100vh' }}>
      <Header />
      {/* Секция фильтров */}
      <Box sx={{ maxWidth: 1200, mx: 'auto', px: { xs: 2, sm: 4 }, py: 2 }}>
        <FilterSection onApply={handleApply} />
      </Box>
      {/* Сетка карточек */}
      <Box sx={{ maxWidth: 1200, mx: 'auto', px: { xs: 2, sm: 4 }, py: 2 }}>
        <MoviesList />
      </Box>
    </Box>
  );
};

export default HomePage;