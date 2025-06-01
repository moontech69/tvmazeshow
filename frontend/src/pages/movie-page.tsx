import { useParams } from "react-router-dom"
import { Link } from "react-router-dom"
import Balancer from "react-wrap-balancer"

import { useGetMovieQuery } from "@/state/slices/movies-slice"

import { Button } from "@/components/ui/button"

import { Icons } from "@/components/icons"
import { Rating } from "@/components/rating"
import { useEffect, useState } from "react"
import { ErrorBlock } from "@/components/error"
import { LoadingBlock } from "@/components/loading"

export function MoviePage(): JSX.Element {
  const { name: movieName, id: movieId } = useParams()
  const [query, setQuery] = useState({ name: movieName??"", id: movieId??"" });
  const {
    data: movie,
    isFetching,
    error,
  } = useGetMovieQuery(query)

  useEffect(() => {
    setQuery({name: movieName ?? "", id: movieId ?? "0"});
  }, [movieName, movieId]);

  return (
    <div className="space-y-4">
      <Link to="/">
        <Button variant="ghost" className="gap-2 pl-2">
          <Icons.arrowLeft className="size-4" />
          Go Back
          <span className="sr-only">Go Back</span>
        </Button>
      </Link>

      {isFetching ? (
        <LoadingBlock />
      ) : error ? (
        <ErrorBlock message="Failed to load movie. Please try again later." />
      ) : (
        movie? (<div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div className="rounded-md border overflow-hidden">
            <img
              src={movie.image}
              alt={movie.name}
              className="w-full h-64 md:h-96 object-cover"
            />
          </div>

          <div className="space-y-1 rounded-md border px-6 py-4">
            <div className="flex items-center justify-between">
              <h2 className="flex-1 text-xl font-semibold truncate">{movie.name}</h2>
              <div><Rating rating={movie.rating / 2} /></div>
            </div>
            <div className="text-muted-foreground ma-0 py-0">{movie.language??"Language unknown"} / {movie.premiereDate??"Date unknown "}</div>
            <p className="text-muted-foreground">
              <Balancer dangerouslySetInnerHTML={{ __html: movie.description||"No Summary" }}/>
            </p>
          </div>
        </div>
        ) : (
          <ErrorBlock message="Movie not found. Please check the URL or try a different movie." />
        )
      )}
    </div>
  )
}
