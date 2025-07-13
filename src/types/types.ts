export interface APIMovie {
  id: string;
  name: string;
  poster: { url: string };
  year: number;
  rating: { kp: number };
  genres: { name: string }[];
  description: string;
}

export interface MoviesResponse {
  docs: APIMovie[];
  page: number;
  pages: number;
  total: number;
  limit: number;
}

export type FilterState = {
  genres: string[];
  year: number[];
  minRating: number;
  maxRating: number;
};

export interface FormState {
  genres: string[];
  year: string;
  minRating: string;
  maxRating: string;
}
