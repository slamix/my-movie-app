import { useState } from 'react';
import Paper from '@mui/material/Paper';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { genreOptions, yearOptions } from '../constants/FilterSection.constants';
import type { FilterState } from '../constants/FilterSection.constants';

const FilterSection = ({ onApply }: { onApply: (filters: FilterState) => void }) => {
  const [genre, setGenre] = useState('all');
  const [year, setYear] = useState('all');
  const [minRating, setMinRating] = useState('1.0');
  const [maxRating, setMaxRating] = useState('10.0');

  return (
    <Paper
      component="form"
      onSubmit={e => { e.preventDefault(); onApply({ genres: genre === 'all' ? [] : [genre], year, minRating, maxRating }); }}
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
      }}
    >
      <FormControl fullWidth>
        <InputLabel id="genre-label">Жанр</InputLabel>
        <Select
          labelId="genre-label"
          id="genre"
          value={genre}
          label="Жанр"
          onChange={e => setGenre(e.target.value)}
        >
          <MenuItem value="all">Все жанры</MenuItem>
          {genreOptions.map(g => (
            <MenuItem key={g} value={g}>{g}</MenuItem>
          ))}
        </Select>
      </FormControl>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <TextField
          id="minRating"
          label="Рейтинг от"
          type="number"
          inputProps={{ min: 1, max: 10, step: 0.1 }}
          value={minRating}
          onChange={e => setMinRating(e.target.value)}
          sx={{ width: 80 }}
        />
        <Box sx={{ color: '#888', fontSize: 18, px: 1 }}>–</Box>
        <TextField
          id="maxRating"
          label="до"
          type="number"
          inputProps={{ min: 1, max: 10, step: 0.1 }}
          value={maxRating}
          onChange={e => setMaxRating(e.target.value)}
          sx={{ width: 80 }}
        />
      </Box>
      <FormControl fullWidth>
        <InputLabel id="year-label">Год выпуска</InputLabel>
        <Select
          labelId="year-label"
          id="year"
          value={year}
          label="Год выпуска"
          onChange={e => setYear(e.target.value)}
        >
          {yearOptions.map(opt => (
            <MenuItem key={opt.value} value={opt.value}>{opt.label}</MenuItem>
          ))}
        </Select>
      </FormControl>
      <Button
        type="submit"
        variant="contained"
        sx={{
          py: 1.5,
          borderRadius: 2,
          background: 'linear-gradient(90deg, #ff6600 0%, #ffb300 100%)',
          color: '#fff',
          fontWeight: 700,
          fontSize: 18,
          boxShadow: '0 2px 8px 0 rgba(255, 102, 0, 0.10)',
          minWidth: 120,
          textTransform: 'none',
          '&:hover': {
            background: 'linear-gradient(90deg, #ffb300 0%, #ff6600 100%)',
          },
        }}
      >
        Найти
      </Button>
    </Paper>
  );
};

export default FilterSection; 