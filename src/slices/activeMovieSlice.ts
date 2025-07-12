import { createSlice } from "@reduxjs/toolkit";
import type { APIMovie } from "../api/types";

type ActiveMovie = APIMovie | null

interface ActiveMovieState {
  activeMovie: ActiveMovie;
}

const initialState: ActiveMovieState = {
  activeMovie: null
}

const activeMovieSlice = createSlice({
  name: 'activeMovie',
  initialState,
  reducers: {
    setActive: (state, { payload }) => {
      state.activeMovie = payload;
    },
    setInactive: (state) => {
      state.activeMovie = null;
    }
  }
});

export const { setActive, setInactive } = activeMovieSlice.actions;
export default activeMovieSlice.reducer;