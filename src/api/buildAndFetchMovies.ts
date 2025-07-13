import {
  KinopoiskDev,
  MovieQueryBuilder,
  SPECIAL_VALUE,
  SORT_TYPE,
} from '@openmoviedb/kinopoiskdev_client';
import type {  FilterState } from '../types/types';

const kp = new KinopoiskDev(import.meta.env.VITE_KP_API_KEY);

export async function buildAndFetchMovies(filters: FilterState) {

  const [yearGte, yearLte] = filters.year.length === 2
    ? [filters.year[0], filters.year[1]]
    : [filters.year[0], filters.year[0]];

  const builder = new MovieQueryBuilder()
    .select([
      'id',
      'name',
      'poster.url',
      'year',
      'rating',
      'genres.name',
      'description',
    ])
    .filterExact('type', 'movie')
    .filterExact('id', SPECIAL_VALUE.NOT_NULL)
    .filterExact('name', SPECIAL_VALUE.NOT_NULL)
    .filterExact('poster.url', SPECIAL_VALUE.NOT_NULL)
    .filterExact('year', SPECIAL_VALUE.NOT_NULL)
    .filterExact('rating.kp', SPECIAL_VALUE.NOT_NULL)
    .filterExact('genres.name', SPECIAL_VALUE.NOT_NULL)
    .filterExact('description', SPECIAL_VALUE.NOT_NULL)
    .filterRange('year', [yearGte, yearLte])
    .filterRange('rating.kp', [
      filters.minRating,
      filters.maxRating,
    ])

    filters.genres.forEach(g => builder.filterExact('genres.name', g));

  builder.sort('rating.kp', SORT_TYPE.DESC);
  builder.paginate(1, 50);
  
  const query = builder.build();

  try {
    const { data } = await kp.movie.getByFilters(query);
    return data;
  } catch(error) {
    console.log(error);
  }
  
}
