import { configureStore } from "@reduxjs/toolkit";
import favoritesReducer from './favoritesSlice'
import activeMovieReducer from './activeMovieSlice';
import modalReducer from './modalSlice';

export const store = configureStore({
  reducer: {
    favorites: favoritesReducer,
    activeMovie: activeMovieReducer,
    modal: modalReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch;

export default store;