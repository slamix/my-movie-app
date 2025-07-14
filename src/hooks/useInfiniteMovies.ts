import { useInfiniteQuery } from '@tanstack/react-query';
import {
  KinopoiskDev,
  MovieQueryBuilder,
  SPECIAL_VALUE,
  SORT_TYPE,
} from '@openmoviedb/kinopoiskdev_client';
import type { FilterState } from '../types/types';

const kp = new KinopoiskDev(import.meta.env.VITE_KP_API_KEY);

export function useInfiniteMovies(filters: FilterState) {
  return useInfiniteQuery({
    initialPageParam: 1,
    queryKey: ['movies', filters],
    queryFn: async ({ pageParam = 1 }) => {
      const [yearGte, yearLte] =
        filters.year.length === 2
          ? [filters.year[0], filters.year[1]]
          : [filters.year[0], filters.year[0]];

      const builder = new MovieQueryBuilder()
        .select([
          'id',
          'name',
          'poster.url',
          'year',
          'rating.kp',
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
        .filterRange('rating.kp', [filters.minRating, filters.maxRating]);

      filters.genres.forEach((g) => builder.filterExact('genres.name', g));

      builder
        .sort('rating.kp', SORT_TYPE.DESC)
        .paginate(pageParam, 50);

      const query = builder.build();
      const { data } = await kp.movie.getByFilters(query);
      return data;
    },
    getNextPageParam: (lastPage) =>
      lastPage && lastPage.page < lastPage.pages ? lastPage.page + 1 : undefined,
    staleTime: 1000 * 60 * 5,
  });
}
