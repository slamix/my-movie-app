import * as React from 'react';
import Header from '../components/Header';
import MoviesList from '../components/MoviesList';
import Box from '@mui/material/Box';
import FilterSection from '../components/FilterSection';

const HomePage: React.FC = () => {
  return (
    <Box sx={{ bgcolor: '#f7f7fa', minHeight: '100vh' }}>
      <Header />
      {/* Секция фильтров */}
      <Box sx={{ maxWidth: 1200, mx: 'auto', px: { xs: 2, sm: 4 }, py: 2 }}>
        <FilterSection />
      </Box>
      {/* Сетка карточек */}
      <MoviesList />
    </Box>
  );
};

export default HomePage;