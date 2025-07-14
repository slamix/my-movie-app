import { useForm, Controller } from 'react-hook-form';
import { useSearchParams } from 'react-router-dom';
import { useEffect, useMemo } from 'react';
import Paper from '@mui/material/Paper';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { genreOptions, yearOptions } from '../constants/FilterSection.constants';
import type { FormState } from '../types/types';
import { defaultValues } from '../constants/FilterSection.constants';
import { useInfiniteMovies } from '../hooks/useInfiniteMovies';
import { getFiltersFromSearchParams } from '../utils/getFiltersFromSearchParams';

const FilterSection = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { control, handleSubmit, watch, reset } = useForm<FormState>({
    defaultValues,
    mode: 'onChange',
  });

  useEffect(() => {
    const vals: Partial<FormState> = {};
    const g = searchParams.get('genres');
    if (g) vals.genres = g.split(',');
    const y = searchParams.get('year');
    if (y) vals.year = y;
    const minRating = searchParams.get('minRating');
    if (minRating) vals.minRating = minRating;
    const maxRating = searchParams.get('maxRating');
    if (maxRating) vals.maxRating = maxRating;
    reset({ ...defaultValues, ...vals });
  }, [reset, searchParams]);

  const onApply = (values: FormState) => {
    const params: Record<string, string> = {};
    if (!values.genres.includes('Все жанры')) {
      params.genres = values.genres.join(',');
    }
    if (values.year !== 'all') {
      params.year = values.year;
    }
    if (values.minRating !== defaultValues.minRating) {
      params.minRating = values.minRating;
    }
    if (values.maxRating !== defaultValues.maxRating) {
      params.maxRating = values.maxRating;
    }
    sessionStorage.setItem('movieAppFilters', JSON.stringify(params));
    setSearchParams(params, { replace: true });
  };

  const onReset = () => {
    reset(defaultValues);
    sessionStorage.removeItem('movieAppFilters');
    setSearchParams({});
  };
  
  const minRating = watch('minRating');
  const maxRating = watch('maxRating');

  const filters = useMemo(() => getFiltersFromSearchParams(searchParams), [searchParams]);

  const { status } = useInfiniteMovies(filters);

  return (
    <Paper
      component="form"
      onSubmit={handleSubmit(onApply)}
      sx={{
        my: 2,
        p: 3,
        borderRadius: 3,
        boxShadow: 2,
        display: 'grid',
        gridTemplateColumns: { xs: '1fr', sm: 'repeat(auto-fit, minmax(220px, 1fr))' },
        gap: 2.5,
        alignItems: 'end',
        border: '1.5px solid #e0e0e0',
        maxWidth: 1200,
        mx: 'auto',
        pl: { xs: 1, sm: 2.5 },
        pr: { xs: 1, sm: 6 },
      }}
    >
      {/* Жанр */}
      <FormControl fullWidth>
        <InputLabel id="genre-label">Жанр</InputLabel>
        <Controller
          name="genres"
          control={control}
          render={({ field }) => (
            <Select
              {...field}
              labelId="genre-label"
              id="genre"
              label="Жанр"
              multiple
              value={field.value}
              renderValue={(selected) =>
                Array.isArray(selected) && selected.includes('Все жанры')
                  ? 'Все жанры'
                  : Array.isArray(selected)
                  ? selected.join(', ')
                  : selected
              }
              onChange={(e) => {
                let v = e.target.value;
                if (typeof v === 'string') {
                  v = v.split(',');
                }
                const newValues = v as string[];
                const last = newValues[newValues.length - 1];
                if (last === 'Все жанры') {
                  field.onChange(['Все жанры']);
                } else {
                  field.onChange(newValues.filter(g => g !== 'Все жанры'));
                }
              }}
            >
              <MenuItem value="Все жанры">Все жанры</MenuItem>
              {genreOptions.map(g => (
                <MenuItem key={g} value={g}>
                  {g}
                </MenuItem>
              ))}
            </Select>
          )}
        />
      </FormControl>

      {/* Рейтинг */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flexDirection: 'column' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Controller
            name="minRating"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                id="minRating"
                label="Рейтинг от"
                type="number"
                inputProps={{
                  min: isNaN(parseFloat(maxRating)) ? 0 : 0,
                  max: isNaN(parseFloat(maxRating)) ? 10 : parseFloat(maxRating),
                  step: 0.1,
                }}
                sx={{ width: 120 }}
              />
            )}
          />
          <Box sx={{ color: '#888', fontSize: 18, px: 1, alignSelf: 'center' }}>–</Box>
          <Controller
            name="maxRating"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                id="maxRating"
                label="Рейтинг до"
                type="number"
                inputProps={{
                  min: isNaN(parseFloat(minRating)) ? 1 : parseFloat(minRating),
                  max: 10,
                  step: 0.1,
                }}
                sx={{ width: 120 }}
              />
            )}
          />
        </Box>
      </Box>

      {/* Год выпуска */}
      <FormControl fullWidth>
        <InputLabel id="year-label">Год выпуска</InputLabel>
        <Controller
          name="year"
          control={control}
          render={({ field }) => (
            <Select {...field} labelId="year-label" id="year" label="Год выпуска">
              {yearOptions.map(opt => (
                <MenuItem key={opt.value} value={opt.value}>
                  {opt.label}
                </MenuItem>
              ))}
            </Select>
          )}
        />
      </FormControl>

      {/* Кнопки */}
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          gap: { xs: 1.5, sm: 2 },
          alignItems: 'center',
          width: '100%',
          mt: { xs: 2, sm: 0 },
        }}
      >
        <Button
          type="button"
          variant="outlined"
          disabled={status === 'pending'}
          sx={{
            height: 56,
            minWidth: { xs: 'unset', sm: 140 },
            width: { xs: '50%', sm: 'auto' },
            borderRadius: 2,
            fontWeight: 700,
            fontSize: 18,
            textTransform: 'none',
            borderColor: '#ffb300',
            color: '#ffb300',
            background: '#fff',
            '&:hover': {
              borderColor: '#ff6600',
              color: '#ff6600',
              background: '#fff7e6',
            },
          }}
          onClick={onReset}
        >
          Сбросить
        </Button>
        <Button
          type="submit"
          variant="contained"
          disabled={status === 'pending'}
          sx={{
            height: 56,
            minWidth: { xs: 'unset', sm: 140 },
            width: { xs: '50%', sm: 'auto' },
            borderRadius: 2,
            background: 'linear-gradient(90deg, #ff6600 0%, #ffb300 100%)',
            color: '#fff',
            fontWeight: 700,
            fontSize: 18,
            boxShadow: '0 2px 8px 0 rgba(255, 102, 0, 0.10)',
            textTransform: 'none',
            '&:hover': {
              background: 'linear-gradient(90deg, #ffb300 0%, #ff6600 100%)',
            },
          }}
        >
          Найти
        </Button>
      </Box>
    </Paper>
  );
};

export default FilterSection;
