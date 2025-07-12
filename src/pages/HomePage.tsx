import React, { useState, useRef } from 'react';
import { Panel, Group, /*Text*/ } from '@vkontakte/vkui';
import Header from '../components/Header';
import MoviesList from '../components/MoviesList';
// import MovieCard from '../components/MovieCard';
import { CaretDown, Check } from '@phosphor-icons/react';

const genreOptions = [
  'Боевик', 'Драма', 'Комедия', 'Фантастика', 'Триллер', 'Мелодрама', 'Ужасы', 'Мультфильм', 'Приключения', 'Криминал',
];
const yearOptions = [
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

const mockMovies = Array.from({ length: 8 }, (_, i) => ({
  id: String(i),
  title: `Movie Title ${i + 1}`,
  year: 2000 + i,
  rating: (Math.random() * 9 + 1).toFixed(1),
  poster: 'https://avatars.mds.yandex.net/get-kinopoisk-image/1600647/430042eb-ee69-4818-aed0-a312400a26bf/300x450',
  genres: [genreOptions[i % genreOptions.length]],
}));

const containerStyles: React.CSSProperties = {
  width: '100%',
  maxWidth: 960,
  margin: '0 auto',
  boxSizing: 'border-box',
};

type FilterState = {
  genres: string[];
  year: string;
  minRating: string;
  maxRating: string;
};

function Dropdown<T extends string | number>({
  options,
  value,
  onChange,
  placeholder,
  style,
  name,
  label,
}: {
  options: { value: T; label: string }[];
  value: T;
  onChange: (val: T) => void;
  placeholder?: string;
  style?: React.CSSProperties;
  name?: string;
  label?: string;
}) {
  const [open, setOpen] = useState(false);
  const btnRef = useRef<HTMLButtonElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (
        open &&
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node) &&
        btnRef.current &&
        !btnRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [open]);

  const selectedLabel = options.find(o => o.value === value)?.label;

  return (
    <div style={{ position: 'relative', ...style, minWidth: 180 }}>
      {label && <label htmlFor={name} style={{ fontWeight: 700, fontSize: 15, marginBottom: 4, display: 'block', color: '#444' }}>{label}</label>}
      <button
        ref={btnRef}
        id={name}
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={() => setOpen(v => !v)}
        style={{
          width: '100%',
          padding: '12px 44px 12px 16px',
          borderRadius: 12,
          border: open ? '2px solid #ff6600' : '1.5px solid #e0e0e0',
          background: '#fff',
          color: '#222',
          fontWeight: 400,
          fontSize: 18,
          outline: 'none',
          boxShadow: open ? '0 8px 32px 0 rgba(0,0,0,0.10)' : 'none',
          display: 'block',
          textAlign: 'left',
          cursor: 'pointer',
          position: 'relative',
          transition: 'border 0.15s, box-shadow 0.15s',
        }}
      >
        <span style={{ display: 'block', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{selectedLabel || placeholder || 'Выбрать'}</span>
        <span style={{ position: 'absolute', right: 18, top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }}>
          <CaretDown size={26} color="#bbb" />
        </span>
      </button>
      {open && (
        <div
          ref={dropdownRef}
          style={{
            position: 'absolute',
            top: 'calc(100% + 8px)',
            left: 0,
            width: '100%',
            maxWidth: 340,
            background: '#fff',
            borderRadius: 14,
            boxShadow: '0 12px 32px 0 rgba(0,0,0,0.10)',
            zIndex: 2000,
            padding: 4,
            maxHeight: 320,
            overflowY: 'auto',
            border: '1.5px solid #e0e0e0',
          }}
        >
          <ul role="listbox" aria-label={label || placeholder} style={{ listStyle: 'none', margin: 0, padding: 0 }}>
            {options.map(option => {
              const checked = value === option.value;
              return (
                <li
                  key={option.value as string}
                  role="option"
                  aria-selected={checked}
                  onClick={() => {
                    onChange(option.value);
                    setOpen(false);
                  }}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '12px 18px 12px 16px',
                    cursor: 'pointer',
                    borderRadius: 10,
                    background: checked ? '#f7f7f7' : 'none',
                    fontWeight: 400,
                    color: checked ? '#ff6600' : '#222',
                    fontSize: 17,
                    marginBottom: 2,
                    transition: 'background 0.15s',
                  }}
                  tabIndex={0}
                  onKeyDown={e => { if (e.key === 'Enter') { onChange(option.value); setOpen(false); } }}
                >
                  <span>{option.label}</span>
                  {checked && <Check size={22} color="#ff6600" weight="bold" />}
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
}

function FilterSection({ onApply }: { onApply: (filters: FilterState) => void }) {
  const [genre, setGenre] = useState('all');
  const [year, setYear] = useState('all');
  const [minRating, setMinRating] = useState('1.0');
  const [maxRating, setMaxRating] = useState('10.0');

  return (
    <form
      onSubmit={e => { e.preventDefault(); onApply({ genres: genre === 'all' ? [] : [genre], year, minRating, maxRating }); }}
      style={{
        margin: '16px 0',
        padding: 20,
        background: '#fff',
        boxShadow: '0 4px 24px 0 rgba(0,0,0,0.08)',
        borderRadius: 18,
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
        gap: 20,
        alignItems: 'end',
        maxWidth: 960,
        marginLeft: 'auto',
        marginRight: 'auto',
        border: '1.5px solid #e0e0e0',
      }}
    >
      <fieldset style={{ border: 'none', padding: 0, margin: 0, minWidth: 0 }}>
        <Dropdown
          options={[{ value: 'all', label: 'Все жанры' }, ...genreOptions.map(g => ({ value: g, label: g }))]}
          value={genre}
          onChange={setGenre}
          placeholder="Жанр"
          name="genre"
          label="Жанр"
        />
      </fieldset>
      <fieldset style={{ border: 'none', padding: 0, margin: 0, minWidth: 0, display: 'flex', gap: 8, alignItems: 'center' }}>
        <label htmlFor="minRating" style={{ fontWeight: 700, fontSize: 15, color: '#444', marginRight: 6 }}>Рейтинг</label>
        <input
          id="minRating"
          type="number"
          min={1}
          max={10}
          step={0.1}
          value={minRating}
          onChange={e => setMinRating(e.target.value)}
          style={{
            width: 60,
            borderRadius: 10,
            border: '1.5px solid #e0e0e0',
            padding: '10px 8px',
            fontSize: 16,
            background: '#fafafa',
            color: '#222',
            outline: 'none',
            fontWeight: 500,
            marginRight: 4,
            transition: 'border 0.15s',
          }}
        />
        <span style={{ color: '#888', fontSize: 18 }}>–</span>
        <input
          id="maxRating"
          type="number"
          min={1}
          max={10}
          step={0.1}
          value={maxRating}
          onChange={e => setMaxRating(e.target.value)}
          style={{
            width: 60,
            borderRadius: 10,
            border: '1.5px solid #e0e0e0',
            padding: '10px 8px',
            fontSize: 16,
            background: '#fafafa',
            color: '#222',
            outline: 'none',
            fontWeight: 500,
            marginLeft: 4,
            transition: 'border 0.15s',
          }}
        />
      </fieldset>
      <fieldset style={{ border: 'none', padding: 0, margin: 0, minWidth: 0 }}>
        <Dropdown
          options={yearOptions}
          value={year}
          onChange={setYear}
          placeholder="Год выпуска"
          name="year"
          label="Год выпуска"
        />
      </fieldset>
      <button
        type="submit"
        style={{
          padding: '13px 0',
          borderRadius: 12,
          background: 'linear-gradient(90deg, #ff6600 0%, #ffb300 100%)',
          color: '#fff',
          fontWeight: 700,
          fontSize: 18,
          border: 'none',
          boxShadow: '0 2px 8px 0 rgba(255, 102, 0, 0.10)',
          cursor: 'pointer',
          transition: 'background 0.15s, box-shadow 0.15s',
          minWidth: 120,
        }}
      >
        Найти
      </button>
    </form>
  );
}

const HomePage: React.FC = () => {
  const [, setFiltered] = useState(mockMovies);

  function handleApply(filters: FilterState) {
    setFiltered(
      mockMovies.filter((movie) => {
        // Фильтр по жанрам
        if (filters.genres.length && !filters.genres.some((g: string) => movie.genres.includes(g))) return false;
        // Фильтр по рейтингу
        const rating = parseFloat(movie.rating);
        if (rating < parseFloat(filters.minRating) || rating > parseFloat(filters.maxRating)) return false;
        // Фильтр по году
        if (filters.year !== 'all') {
          const y = movie.year;
          if (filters.year.includes('-')) {
            const [from, to] = filters.year.split('-').map(Number);
            if (y < from || y > to) return false;
          } else {
            if (String(y) !== filters.year) return false;
          }
        }
        return true;
      })
    );
  }

  return (
    <Panel style={{ background: 'var(--vkui--color_background_secondary)', minHeight: '100vh' }}>
      <Header />
      {/* Секция фильтров */}
      <Group style={{ padding: 0, margin: 0, background: 'none', boxShadow: 'none' }}>
        <div style={containerStyles}>
          <FilterSection onApply={handleApply} />
        </div>
      </Group>
      {/* Сетка карточек */}
      <MoviesList />
    </Panel>
  );
};

export default HomePage;