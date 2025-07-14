import React, { useEffect, useMemo, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import MovieCard from './MovieCard';
import { useInfiniteMovies } from '../hooks/useInfiniteMovies';
import type { FilterState } from '../types/types';
import { getFiltersFromSearchParams } from '../utils/getFiltersFromSearchParams';

const MoviesList: React.FC = () => {
  const [searchParams] = useSearchParams();
  const sentinel = useRef<HTMLDivElement>(null);

  const filters: FilterState = useMemo(() => getFiltersFromSearchParams(searchParams), [searchParams]);

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
            > {/*@ts-expect-error dont know how to fix*/}
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