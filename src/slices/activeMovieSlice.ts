import { createSlice } from "@reduxjs/toolkit";
import type { APIMovie } from "../types/types";

type ActiveMovie = APIMovie | null

interface ActiveMovieState {
  activeMovie: ActiveMovie;
}

const raw = typeof window !== 'undefined'
  ? localStorage.getItem('activeMovie')
  : null;

const initialState: ActiveMovieState = {
  activeMovie: raw
    ? JSON.parse(raw) as APIMovie
    : null
};

const activeMovieSlice = createSlice({
  name: 'activeMovie',
  initialState,
  reducers: {
    setActive: (state, { payload }) => {
      state.activeMovie = payload;
      localStorage.setItem('activeMovie', JSON.stringify(payload));
    },
  }
});

export const { setActive } = activeMovieSlice.actions;
export default activeMovieSlice.reducer;