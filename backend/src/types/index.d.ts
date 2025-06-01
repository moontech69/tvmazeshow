export interface Movie {
  id: number
  name: string
  description: string
  image: string
  genre: string
  language: string
  rating: number
  premiereDate: string | null
}

export type TVMazeShow = {
  score: number;
  show: {
    id: number;
    name: string;
    language: string;
    genres: string[];
    summary: string;
    image: {
      medium: string;
      original: string;
    } | null;
    rating: {
      average: number | null;
    };
    premiered: string | null;
  };
};