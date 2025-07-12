import { configureStore } from "@reduxjs/toolkit";
import moviesReducer from './moviesSlice'
import favoritesReducer from './favoritesSlice'
import activeMovieReducer from './activeMovieSlice';

export const store = configureStore({
  reducer: {
    movies: moviesReducer,
    favorites: favoritesReducer,
    activeMovie: activeMovieReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch;

export default store;