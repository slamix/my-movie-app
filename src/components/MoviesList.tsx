import React, { useEffect, useMemo, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import MovieCard from './MovieCard';
import { useInfiniteMovies } from '../hooks/useInfiniteMovies';
import type { FilterState } from '../types/types';

const MoviesList: React.FC = () => {
  const [searchParams] = useSearchParams();
  const sentinel = useRef<HTMLDivElement>(null);

  const filters: FilterState = useMemo(() => {
    const genresOrNot = searchParams.get('genres');
    const genres = genresOrNot ? genresOrNot.split(',') : [];
    const years = searchParams.get('year');
    const now = new Date().getFullYear();
    let year: number[];
    if (!years || years === 'all') year = [1990, now];
    else if (years.includes('-')) {
      const [a, b] = years.split('-').map((year) => parseInt(year));
      year = [a, b];
    } else {
      const y = parseInt(years);
      year = [y, y];
    }
    const minRating = parseFloat(searchParams.get('minRating') ?? '0.0');
    const maxRating = parseFloat(searchParams.get('maxRating') ?? '10.0');
    return { genres, year, minRating, maxRating };
  }, [searchParams]);

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
    error,
  } = useInfiniteMovies(filters);

  useEffect(() => {
    if (!sentinel.current || !hasNextPage) return;
    const obs = new IntersectionObserver(
      ([e]) => e.isIntersecting && fetchNextPage(),
      { rootMargin: '200px' }
    );
    obs.observe(sentinel.current);
    return () => obs.disconnect();
  }, [fetchNextPage, hasNextPage]);

  if (status === 'pending')
    return (
      <Box sx={{ textAlign: 'center', py: 4 }}>
        <CircularProgress />
      </Box>
    );
  if (status === 'error')
    return (
      <Box sx={{ textAlign: 'center', py: 4, color: 'error.main' }}>
        Ошибка: {error!.message}
      </Box>
    );

  return (
    <Box sx={{ maxWidth: 1200, mx: 'auto', py: 3 }}>
      <Box
        sx={{
          display: 'grid',
          gap: 3,
          gridTemplateColumns: {
            xs: '1fr',
            sm: 'repeat(2,1fr)',
            md: 'repeat(3,1fr)',
            lg: 'repeat(4,1fr)',
          },
        }}
      >
        {data?.pages.flatMap((page) =>
          page?.docs.map((movie) => (
            <Box
              key={movie.id}
              sx={{ display: 'flex', justifyContent: 'center', minWidth: 0 }}
            >
              <MovieCard movie={movie} />
            </Box>
          ))
        )}
      </Box>
      <div ref={sentinel} style={{ height: 1 }} />
      {isFetchingNextPage && (
        <Box sx={{ textAlign: 'center', py: 2 }}>
          <CircularProgress size={24} />
        </Box>
      )}
    </Box>
  );
};

export default MoviesList;