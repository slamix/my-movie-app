import { useSelector, useDispatch } from "react-redux"
import { useEffect } from "react"
import { fetchMovies } from "../hooks/useMovies";
import { addFilms } from "../slices/moviesSlice";
import MovieCard from "./MovieCard";
import type { APIMovie } from "../api/types";
import type { RootState } from "../slices";
import Box from '@mui/material/Box';

const MoviesList = () => {
  const movies = useSelector((state: RootState) => state.movies.movies);
  const dispatch = useDispatch();

  useEffect(() => {
    const getMovies = async () => {
      try {
        const res = await fetchMovies();
        dispatch(addFilms(res));
      } catch (e) {
        console.log(e);
      }
    };
    getMovies();
  }, [dispatch]);

  return (
    <Box sx={{ maxWidth: 1200, mx: 'auto', px: { xs: 2, sm: 4 }, py: 2 }}>
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
        {movies.map((movie: APIMovie) => (
          <Box key={movie.id} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'stretch', minWidth: 0 }}>
            <MovieCard movie={movie} maxWidth={320} />
          </Box>
        ))}
      </Box>
    </Box>
  );
}

export default MoviesList;