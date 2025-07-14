import type { FilterState } from '../types/types';

export function getFiltersFromSearchParams(searchParams: URLSearchParams): FilterState {
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
} 