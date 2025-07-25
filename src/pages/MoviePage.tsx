import * as React from 'react';
import Header from '../components/Header';
import { Heart as HeartIcon, HeartBreak as HeartBreakIcon } from '@phosphor-icons/react';
import { useSelector, useDispatch } from 'react-redux';
import type { RootState } from '../slices';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from 'react-router-dom';
import type { APIMovie } from '../types/types';
import { removeFavorite } from '../slices/favoritesSlice';
import { setOpen } from '../slices/modalSlice';
import Skeleton from '@mui/material/Skeleton';

const MoviePage: React.FC = () => {
  const dispatch = useDispatch();
  const activeMovie = useSelector((state: RootState) => state.activeMovie.activeMovie);
  const favorites = useSelector((state: RootState) => state.favorites.favorites);
  const isFavorite = favorites.some((f: APIMovie) => f.id === activeMovie?.id);
  const navigate = useNavigate();

  const handleFavoriteClick = () =>  {
    if (isFavorite) {
      dispatch(removeFavorite(activeMovie));
      return;
    }
    dispatch(setOpen(activeMovie))
  }
  const readyGenres = activeMovie?.genres.map((genre: { name: string }) => genre.name).join(', ')

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <Box sx={{ bgcolor: '#f7f7fa', minHeight: '100vh' }}>
      <Header />
      <Box sx={{ maxWidth: 1200, mx: 'auto', px: { xs: 2, sm: 4 }, pt: 5, pb: 2 }}>
        <Button
          startIcon={<ArrowBackIcon />}
          onClick={handleBack}
          sx={{ mb: 2, fontWeight: 700, fontSize: 17, textTransform: 'none' }}
          color="inherit"
        >
          Назад
        </Button>
        <Paper
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', sm: 'row' },
            flexWrap: 'wrap',
            gap: 5,
            bgcolor: '#fff',
            borderRadius: 3,
            boxShadow: 3,
            p: { xs: 2, sm: 4 },
            alignItems: { xs: 'center', sm: 'flex-start' },
          }}
        >
          {/* Постер */}
          <Box sx={{
            flex: { xs: '0 0 auto', sm: '0 0 320px' },
            maxWidth: { xs: '90vw', sm: 320 },
            width: '100%',
            mx: { xs: 'auto', sm: 0 },
            mb: { xs: 2, sm: 0 },
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}>
            {activeMovie?.poster?.url ? (
              <Box
                component="img"
                src={activeMovie.poster.url}
                alt={activeMovie?.name}
                sx={{
                  width: '100%',
                  borderRadius: 2.5,
                  boxShadow: '0 2px 12px 0 rgba(0,0,0,0.10)',
                  maxHeight: { xs: '60vw', sm: 'none' },
                  objectFit: 'cover',
                }}
              />
            ) : (
              <Skeleton
                variant="rectangular"
                width="100%"
                height={0}
                sx={{
                  aspectRatio: '2/3',
                  borderRadius: 2.5,
                  boxShadow: '0 2px 12px 0 rgba(0,0,0,0.10)',
                  bgcolor: '#e0e0e0',
                  maxHeight: { xs: '60vw', sm: 'none' },
                  width: '100%',
                  minHeight: 240,
                }}
              />
            )}
            <Button
              variant={isFavorite ? 'outlined' : 'contained'}
              startIcon={isFavorite ? <HeartBreakIcon size={20} color="#888" weight="duotone" /> : <HeartIcon size={20} color="#fff" weight="duotone" />}
              sx={{
                mt: 3,
                width: '100%',
                alignSelf: 'stretch',
                fontSize: { xs: 17, sm: 15 },
                py: { xs: 2, sm: 1 },
                border: isFavorite ? '2px solid #bbb' : '2px solid #ff6600',
                color: isFavorite ? '#888' : '#fff',
                background: isFavorite ? '#f5f5f5' : 'linear-gradient(90deg, #ff6600 0%, #ffb300 100%)',
                borderRadius: 2,
                fontWeight: 700,
                boxShadow: isFavorite ? 'none' : '0 2px 8px 0 rgba(255,102,0,0.10)',
                boxSizing: 'border-box',
                '&:hover': isFavorite
                  ? { background: '#eee', borderColor: '#888', color: '#888' }
                  : { background: 'linear-gradient(90deg, #ffb300 0%, #ff6600 100%)', color: '#fff' },
              }}
              onClick={handleFavoriteClick}
            >
              {isFavorite ? 'Удалить из избранного' : 'Добавить в избранное'}
            </Button>
          </Box>
          {/* Информация */}
          <Box sx={{ flex: '1 1 340px', minWidth: 0, display: 'flex', flexDirection: 'column', gap: 3, justifyContent: 'space-between', height: '100%' }}>
            <Box>
              {/* Название */}
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2.5, flexWrap: 'wrap' }}>
                <Typography variant="h3" sx={{ fontSize: 36, fontWeight: 800, m: 0, color: '#111', lineHeight: 1.1 }}>
                  {activeMovie?.name} <Typography component="span" sx={{ fontWeight: 400, fontSize: 26, color: '#888' }}>({activeMovie?.year})</Typography>
                </Typography>
              </Box>
              {/* Описание */}
              <Typography sx={{ fontSize: 19, color: '#222', lineHeight: 1.5, my: 2 }}>
                {activeMovie?.description}
              </Typography>
              {/* Характеристики */}
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
                <Box sx={{ minWidth: 180, fontSize: 17, color: '#444', display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                  <Box>
                    <Typography component="span" sx={{ color: '#888' }}>Рейтинг:</Typography>{' '}
                    <Typography component="span" sx={{ fontWeight: 700, color: '#ff6600', fontSize: 20 }}>★ {activeMovie?.rating.kp.toFixed(1)}</Typography>
                  </Box>
                  <Box>
                    <Typography component="span" sx={{ color: '#888' }}>Год выхода:</Typography>{' '}
                    <Typography component="span">{activeMovie?.year}</Typography>
                  </Box>
                  <Box>
                    <Typography component="span" sx={{ color: '#888' }}>Жанры:</Typography>{' '}
                    <Typography component="span">{readyGenres}</Typography>
                  </Box>
                </Box>
              </Box>
            </Box>
          </Box>
        </Paper>
      </Box>
    </Box>
  );
};

export default MoviePage;