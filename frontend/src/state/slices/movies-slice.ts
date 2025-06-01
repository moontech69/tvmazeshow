import type { Movie } from "@/types"

import { apiSlice } from "@/state/slices/api-slice"

const MOVIES_API_URL = `${import.meta.env.VITE_BASE_API_URL}/movies`

export const moviesSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getMovies: builder.query<Movie[], { name: string; genre?: string }>({
      query: (params = {name: ""}) => {
        const queryParams = new URLSearchParams();

        queryParams.append("name", params.name);
        if (params.genre) queryParams.append("genre", params.genre);

        return {
          url: `${MOVIES_API_URL}/?${queryParams.toString()}`,
        };
      },
      keepUnusedDataFor: 5,
    }),
    getMovie: builder.query<Movie, { name: string; id: string }>({
      query: (params = {name: "", id: "0"}) => {
        const queryParams = new URLSearchParams();

        queryParams.append("name", params.name);
        queryParams.append("id", params.id);

        return {
          url: `${MOVIES_API_URL}/?${queryParams.toString()}`,
        };
      },
      keepUnusedDataFor: 5,
    }),
  }),
})

export const { useGetMoviesQuery, useGetMovieQuery } = moviesSlice
