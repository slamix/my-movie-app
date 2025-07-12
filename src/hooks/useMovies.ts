import { kinopoiskApi } from '../api/kinopoisk';
import type { MoviesResponse } from '../api/types';

export const fetchMovies = async () => {
  const { data } = await kinopoiskApi.get<MoviesResponse>('/v1.3/movie', {
    params: {
      limit: 50,
    }
  });
  return data;
}
