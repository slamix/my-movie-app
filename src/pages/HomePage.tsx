import * as React from 'react';
import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import Header from '../components/Header';
import MoviesList from '../components/MoviesList';
import Box from '@mui/material/Box';
import FilterSection from '../components/FilterSection';

const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    if (searchParams.toString() === '') {
      const saved = sessionStorage.getItem('movieAppFilters');
      if (saved) {
        const params = JSON.parse(saved);
        const search = new URLSearchParams(params).toString();
        if (search) {
          navigate(`/?${search}`, { replace: true });
        }
      }
    }
  }, [navigate, searchParams]);

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