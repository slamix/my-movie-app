import * as React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setActive } from '../slices/activeMovieSlice';
import type { APIMovie } from '../api/types';
import { removeFavorite } from '../slices/favoritesSlice';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import type { RootState } from '../slices';
import { setOpen } from '../slices/modalSlice';

interface MovieCardProps {
  movie: APIMovie;
  maxWidth?: number;
}

const MovieCard: React.FC<MovieCardProps> = ({ movie, maxWidth = 340 }) => {
  const dispatch = useDispatch();
  const favorites = useSelector((state: RootState) => state.favorites.favorites);
  const isFavorite = favorites.some((f: APIMovie) => f.id === movie.id);

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (isFavorite) {
      dispatch(removeFavorite(movie));
    } else {
      dispatch(setOpen(movie))
    }
  };

  return (
    <Card
      sx={{
        width: '100%',
        maxWidth: maxWidth,
        minWidth: 0,
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        borderRadius: 2,
        boxShadow: '0 4px 24px 0 rgba(0,0,0,0.12), 0 1.5px 4px 0 rgba(0,0,0,0.10)',
        overflow: 'hidden',
        position: 'relative',
        border: '1.5px solid #e0e0e0',
      }}
    >
      <Link
        to={`/movie/${movie.id}`}
        onClick={() => dispatch(setActive(movie))}
        style={{ textDecoration: 'none', color: 'inherit', display: 'block', flex: 1 }}
      >
        <Box sx={{ width: '100%', aspectRatio: '2/3', position: 'relative', bgcolor: '#f5f5f5' }}>
          <CardMedia
            component="img"
            image={movie.poster.url}
            alt={movie.name}
            sx={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
          />
          {/* Рейтинг */}
          <Box
            sx={{
              position: 'absolute',
              top: 10,
              right: 10,
              bgcolor: 'background.paper',
              color: 'text.primary',
              borderRadius: 1,
              px: 1.5,
              py: '2px',
              fontSize: 15,
              fontWeight: 600,
              zIndex: 2,
              boxShadow: 2,
              display: 'flex',
              alignItems: 'center',
              gap: 0.5,
            }}
          >
            <span style={{fontSize: 18, marginRight: 2}}>★</span> {movie.rating.kp.toFixed(1)}
          </Box>
        </Box>
        <CardContent sx={{ p: '16px 16px 18px 16px', display: 'flex', flexDirection: 'column', gap: 1 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 1 }}>
            <Typography
              variant="subtitle1"
              sx={{ fontWeight: 700, fontSize: 17, lineHeight: '20px', flex: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}
              component="span"
            >
              {movie.name}
            </Typography>
            <IconButton
              sx={{
                bgcolor: isFavorite ? '#ffeaea' : 'background.paper',
                width: 36,
                height: 36,
                ml: 1,
                '&:hover': { bgcolor: '#ffeaea' },
                transition: 'background 0.2s',
              }}
              onClick={handleFavoriteClick}
              tabIndex={-1}
              aria-label={isFavorite ? 'Удалить из избранного' : 'Добавить в избранное'}
            >
              {isFavorite ? (
                <FavoriteIcon sx={{ color: '#ff5c5c', fontSize: 22 }} />
              ) : (
                <FavoriteBorderIcon sx={{ color: '#ff5c5c', fontSize: 22 }} />
              )}
            </IconButton>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Typography variant="body2" sx={{ color: 'text.secondary', fontSize: 15 }}>
              {movie.year}
            </Typography>
          </Box>
        </CardContent>
      </Link>
    </Card>
  );
};

export default MovieCard;