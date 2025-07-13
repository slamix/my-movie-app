import React, { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import Box from '@mui/material/Box';
import MovieCard from './MovieCard';
import { buildAndFetchMovies } from '../api/buildAndFetchMovies';
import type { APIMovie } from '../types/types';
import type { FilterState } from '../types/types';

export const MoviesList: React.FC = () => {
  const [searchParams] = useSearchParams();
  const [movies, setMovies] = useState<APIMovie[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const filters: FilterState = useMemo(() => {
    const genresParam = searchParams.get('genres');
    const genres = genresParam ? genresParam.split(',') : [];

    const rawYear = searchParams.get('year');
    let year: number[];
    if (!rawYear || rawYear === 'all') {
      year = [1990, 2025];
    } else if (rawYear.includes('-')) {
      const [from, to] = rawYear.split('-').map(v => parseInt(v));
      year = [from, to];
    } else {
      const y = parseInt(rawYear);
      year = [y, y];
    }

    const minRating = parseFloat(searchParams.get('minRating') ?? '0.0');
    const maxRating = parseFloat(searchParams.get('maxRating') ?? '10.0');

    return { genres, year, minRating, maxRating };
  }, [searchParams]);

  useEffect(() => {
    setLoading(true);
    setError(null);
    const getMovies = async () => {
      try {
        // @ts-expect-error dont know how to type this
        const { docs } = await buildAndFetchMovies(filters);
        setMovies(docs);
      } catch(error) {
        console.log(error);
        setError('Не удалось загрузить фильмы')
      } finally {
        setLoading(false)
      }
    }
    getMovies();
  }, [filters]);

  if (loading) {
    return <Box sx={{ textAlign: 'center', py: 4 }}>Загрузка фильмов…</Box>;
  }

  if (error) {
    return <Box sx={{ textAlign: 'center', py: 4, color: 'red' }}>{error}</Box>;
  }

  return (
    <Box sx={{ maxWidth: 1200, mx: 'auto', px: { xs: 1, sm: 4 }, py: 2 }}>
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: {
            xs: 'repeat(1,1fr)',
            sm: 'repeat(2,1fr)',
            md: 'repeat(3,1fr)',
            lg: 'repeat(4,1fr)',
          },
          gap: 3,
        }}
      >
        {movies.map(movie => (
          <Box
            key={movie.id}
            sx={{ display: 'flex', justifyContent: 'center', minWidth: 0 }}
          >
            <MovieCard movie={movie}/>
          </Box>
        ))}
      </Box>
      {movies.length === 0 && (
        <Box sx={{ textAlign: 'center', py: 4 }}>Фильмы не найдены</Box>
      )}
    </Box>
  );
};

export default MoviesList;
