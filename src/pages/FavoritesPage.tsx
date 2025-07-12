import * as React from 'react';
import Header from '../components/Header';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { useSelector } from 'react-redux';
import type { RootState } from '../slices';
import MovieCard from '../components/MovieCard';
import type { APIMovie } from '../api/types';

const FavoritesPage: React.FC = () => {
  const favorites = useSelector((state: RootState) => state.favorites.favorites);

  return (
    <Box sx={{ bgcolor: '#f7f7fa', minHeight: '100vh' }}>
      <Header />
      {favorites.length === 0 ? (
        <Box sx={{ maxWidth: 600, mx: 'auto', mt: 10, p: 4, display: 'flex', flexDirection: 'column', alignItems: 'center', bgcolor: '#fff', borderRadius: 3, boxShadow: 2 }}>
          <Typography variant="h5" sx={{ color: '#888', textAlign: 'center' }}>
            Здесь будут ваши избранные фильмы
          </Typography>
        </Box>
      ) : (
        <Box sx={{ maxWidth: 1200, mx: 'auto', px: { xs: 2, sm: 4 }, py: 4 }}>
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: {
                xs: 'repeat(1, 1fr)',
                sm: 'repeat(2, 1fr)',
                md: 'repeat(3, 1fr)',
                lg: 'repeat(4, 1fr)',
              },
              gap: 3,
              justifyContent: 'start',
              alignItems: 'stretch',
              minHeight: 320,
            }}
          >
            {favorites.map((movie: APIMovie) => (
              <Box key={movie.id} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'stretch', minWidth: 0 }}>
                <MovieCard movie={movie} maxWidth={320} />
              </Box>
            ))}
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default FavoritesPage;