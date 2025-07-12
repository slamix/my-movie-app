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
