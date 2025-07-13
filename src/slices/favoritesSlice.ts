import { createSlice } from "@reduxjs/toolkit";
import type { APIMovie } from "../types/types";


interface FavoritesState {
  favorites: APIMovie[];
}

const raw = typeof window !== 'undefined'
  ? localStorage.getItem('favorites')
  : null;

const initialState: FavoritesState = {
  favorites: raw
    ? JSON.parse(raw) as APIMovie[]
    : []
};

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    addFavorite: (state, { payload }) => {
      state.favorites.push(payload);
      localStorage.setItem('favorites', JSON.stringify(state.favorites));
    },
    removeFavorite: (state, { payload }) => {
      state.favorites = state.favorites.filter((favorite) => favorite.id !== payload.id);
      localStorage.setItem('favorites', JSON.stringify(state.favorites));
    },
  },
});

export const { addFavorite, removeFavorite } = favoritesSlice.actions;
export default favoritesSlice.reducer;