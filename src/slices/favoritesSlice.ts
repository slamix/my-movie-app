import { createSlice } from "@reduxjs/toolkit";
import type { APIMovie } from "../api/types";

interface FavoritesState {
  favorites: APIMovie[];
}

const initialState: FavoritesState = {
  favorites: [],
}

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    addFavorite: (state, { payload }) => {
      state.favorites.push(payload);
    },
    removeFavorite: (state, { payload }) => {
      state.favorites = state.favorites.filter((favorite) => favorite.id !== payload.id);
    },
  },
});

export const { addFavorite, removeFavorite } = favoritesSlice.actions;
export default favoritesSlice.reducer;