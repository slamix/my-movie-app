import axios from "axios";

export const kinopoiskApi = axios.create({
  baseURL: 'https://api.kinopoisk.dev/',
  headers: {
    'Content-Type': 'application/json',
    'X-API-KEY': import.meta.env.VITE_KP_API_KEY,
  }
});
