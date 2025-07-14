import * as React from 'react';
import Header from '../components/Header';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { useSelector } from 'react-redux';
import type { RootState } from '../slices';
import MovieCard from '../components/MovieCard';
import type { APIMovie } from '../types/types';

const FavoritesPage: React.FC = () => {
  const favorites = useSelector((state: RootState) => state.favorites.favorites);

  return (
    <Box sx={{ bgcolor: '#f7f7fa', minHeight: '100vh' }}>
      <Header />
      <Box sx={{ maxWidth: 1200, mx: 'auto', pt: 5, pb: 2, px: { xs: 2, sm: 4 }, textAlign: 'center' }}>
        <Typography variant="h3" sx={{ fontWeight: 800, mb: 1, fontSize: { xs: 28, sm: 36 } }}>
          Избранное
        </Typography>
        <Typography variant="subtitle1" sx={{ color: '#888', fontSize: { xs: 16, sm: 20 }, mb: 3 }}>
          Здесь находятся фильмы, которые Вам понравились
        </Typography>
      </Box>
      {favorites.length === 0 ? (
        <Box sx={{ maxWidth: 600, mx: 'auto', mt: 6, p: 4, display: 'flex', flexDirection: 'column', alignItems: 'center', bgcolor: '#fff', borderRadius: 3, boxShadow: 2 }}>
          <Typography variant="h5" sx={{ color: '#888', textAlign: 'center' }}>
            Похоже, вы ещё не добавили ни одного фильма в «Избранное»
          </Typography>
        </Box>
      ) : (
        <Box sx={{ maxWidth: 1200, mx: 'auto', px: { xs: 1, sm: 4 }, py: 4 }}>
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
                <MovieCard movie={movie} fromFavorites />
              </Box>
            ))}
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default FavoritesPage;