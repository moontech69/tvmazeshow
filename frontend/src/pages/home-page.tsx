import { useEffect, useState } from "react"

import { useGetMoviesQuery } from "@/state/slices/movies-slice"

import GenreCard from "@/components/cards/genre-card"
import MovieCard from "@/components/cards/movie-card"
import { LoadingBlock } from "@/components/loading"
import { ErrorBlock } from "@/components/error"

export function HomePage(): JSX.Element {
  const [searchQuery, setSearchQuery] = useState(() => {
    return localStorage.getItem("searchQuery") || "";
  });
  const [query, setQuery] = useState({name: searchQuery});
  const [genre, setGenre] = useState<string | null>(null);
  const [genres, setGenres] = useState<{label: string, count: number}[]>([])
  const {
    data: movies,
    isFetching ,
    error,
  } = useGetMoviesQuery(query)

  useEffect(() => {
    const handler = setTimeout(() => {
      localStorage.setItem("searchQuery", searchQuery);
      setQuery((prev) => ({...prev, name: searchQuery }));
    }, 500);

    return () => clearTimeout(handler);
  }, [searchQuery]);

  useEffect(() => {
    if (movies && !genre) {
      const genreCountMap: Record<string, number> = {};

      movies.forEach((movie) => {
        const genreList = movie.genre
          .split(",")
          .map((g) => g.trim())
          .filter(Boolean);

        genreList.forEach((genre) => {
          genreCountMap[genre] = (genreCountMap[genre] || 0) + 1;
        });
      });

      const genreCounts = Object.entries(genreCountMap).map(([label, count]) => ({
        label,
        count,
      }));
      setGenres(genreCounts);
    }
  }, [movies])

  useEffect(() => {
    if (genre) {
      setQuery((prev) => ({
        ...prev,
        genre: genre,
      }));
    }
  }, [genre]);

  return (
    <div className="py-8">
      <div className="max-w-md mx-auto mb-8">
        <input
          type="text"
          placeholder="Search for a show..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500
            border-gray-300 text-black bg-white 
            dark:border-gray-600 dark:text-white dark:bg-gray-800"
        />
      </div>
      {isFetching? (
        <LoadingBlock />
      ) : error ? (
        <ErrorBlock message="You must input search query"/>
      ) : (
        movies? (<div className="space-y-12">
          <section id="categories-section" className="space-y-6">
            <h2 className="text-lg font-medium leading-none">Genres</h2>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {genres.map((genre, i) => (
                <GenreCard key={i} genre={genre} onClick={setGenre} />
              ))}
              {!genres.length && (
                <div className="col-span-1 sm:col-span-2 md:col-span-3 lg:col-span-4 text-center text-muted-foreground">
                  No genres found for the current search query.
                </div>
              )}
            </div>
          </section>

          <section id="products-section" className="space-y-6">
            <h2 className="text-lg font-medium leading-none">Movies</h2>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {movies?.map((movie) => (
                <MovieCard key={movie.id} movie={movie} />
              ))}
              {!movies.length && (
                <div className="col-span-1 sm:col-span-2 md:col-span-3 lg:col-span-4 text-center text-muted-foreground">
                  No movies found for the current search query.
                </div>
              )}
            </div>
          </section>
        </div>
        ): (
          <ErrorBlock message="No movies found. Please try a different search query." />
        )
      )}
    </div>
  )
}
