import { createSlice } from "@reduxjs/toolkit";
import type { APIMovie } from "../api/types";

interface MovieState {
  movies: APIMovie[];
}

const initialState: MovieState = {
  movies: [],
}

const moviesSlice = createSlice({
  name: 'movies',
  initialState,
  reducers: {
    addFilms: (state, { payload }) => {
      const { docs } = payload;
      console.log(docs);
      state.movies.push(...docs);
    },
    resetMovies: (state) => {
      state.movies = [];
    }
  },
});

export const { addFilms, resetMovies } = moviesSlice.actions;
export default moviesSlice.reducer;