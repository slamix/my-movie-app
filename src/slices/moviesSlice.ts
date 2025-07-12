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
      state.movies = docs;
    }
  },
});

export const { addFilms } = moviesSlice.actions;
export default moviesSlice.reducer;