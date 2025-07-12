import { useSelector, useDispatch } from "react-redux"
import { useEffect } from "react"
import { Group } from "@vkontakte/vkui";
import { fetchMovies } from "../hooks/useMovies";
import { addFilms } from "../slices/moviesSlice";
import MovieCard from "./MovieCard";
import type { APIMovie } from "../api/types";
import type { RootState } from "../slices";

const containerStyles: React.CSSProperties = {
  width: '100%',
  maxWidth: 960,
  margin: '0 auto',
  boxSizing: 'border-box',
};

const gridStyles: React.CSSProperties = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
  gap: 16,
  justifyItems: 'center',
};

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
    <Group style={{ background: 'none', boxShadow: 'none', padding: 0, margin: 0 }}>
      <div style={containerStyles}>
        <div style={gridStyles}>
          {movies.map((movie: APIMovie) => (
            <MovieCard
              key={movie.id}
              movie={movie}
            />
          ))}
        </div>
      </div>
    </Group>
  );
}

export default MoviesList;