import type { FormState } from "../types/types";

export const genreOptions = [
  "комедия", "мультфильм", "ужасы", "фантастика", "триллер", "боевик", "мелодрама", "детектив", "приключения", "фэнтези", "военный", "семейный", "драма", "документальный", "детский", "криминал", "биография", "вестерн"
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

export const defaultValues: FormState = {
  genres: ['Все жанры'],
  year: 'all',
  minRating: '0.0',
  maxRating: '10.0',
};