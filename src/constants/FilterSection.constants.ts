export const genreOptions = [
  'Боевик', 'Драма', 'Комедия', 'Фантастика', 'Триллер', 'Мелодрама', 'Ужасы', 'Мультфильм', 'Приключения', 'Криминал',
];
export const yearOptions = [
  { value: 'all', label: 'Все годы' },
  { value: '2025', label: '2025' },
  { value: '2024', label: '2024' },
  { value: '2023', label: '2023' },
  { value: '2022', label: '2022' },
  { value: '2021', label: '2021' },
  { value: '2010-2019', label: '2010-2019' },
  { value: '2000-2009', label: '2000-2009' },
  { value: '1990-1999', label: '1990-1999' },
];
export const mockMovies = Array.from({ length: 8 }, (_, i) => ({
  id: String(i),
  title: `Movie Title ${i + 1}`,
  year: 2000 + i,
  rating: (Math.random() * 9 + 1).toFixed(1),
  poster: 'https://avatars.mds.yandex.net/get-kinopoisk-image/1600647/430042eb-ee69-4818-aed0-a312400a26bf/300x450',
  genres: [genreOptions[i % genreOptions.length]],
}));

export type FilterState = {
  genres: string[];
  year: string;
  minRating: string;
  maxRating: string;
}; 