/* import {
  KinopoiskDev,
  MovieQueryBuilder,
  SPECIAL_VALUE,
  SortType,
  Filter,
  MovieFields,
} from '@openmoviedb/kinopoiskdev_client';

const kp = new KinopoiskDev('ВАШ ТОКЕН');

// Получение списка фильмов за 2020-2023 годы с рейтингом от 7.5 до 10, у которых есть постер и которые созданы в России или США
// Этот пример использует query builder
const getRelatedByQueryBuilderMovies = async () => {
  // Создаем билдер запросов для фильмов
  const queryBuilder = new MovieQueryBuilder();

  // Выбираем поля, которые мы хотим получить в ответе
  // Полный список полей можно посмотреть в документации
  // https://api.kinopoisk.dev/v1/documentation для метода /v1.3/movie
  const query = queryBuilder
    .select(['id', 'name', 'rating', 'poster', 'year'])
    // Добавляем фильтр поиска по указанному диапазону года
    .filterRange('year', [2020, 2023])
    // Добавляем фильтр поиска по указанному диапазону рейтинга
    .filterRange('rating.kp', [7.5, 10])
    // Добавляем фильтр для поиска фильмов с постером
    .filterExact('poster.url', SPECIAL_VALUE.NOT_NULL)
    // Добавим страны
    .filterExact('countries.name', 'США')
    .filterExact('countries.name', 'Россия')
    // Добавляем сортировку по рейтингу
    .sort('rating.kp', SortType.DESC)
    // Добавляем пагинацию и получаем 1 страницу по с 10 фильмами на странице
    .paginate(1, 10)
    // Собираем запрос
    .build();

  // Отправляем запрос на получение фильмов
  const { data, error, message } = await kp.movie.getByFilters(query);

  if (data) {
    const { docs, page, limit } = data;
    console.log(`Страница ${page} из ${limit}`);
    console.log(docs);
  }

  // Если будет ошибка, то выведем ее в консоль
  if (error) console.log(error, message);
}; */