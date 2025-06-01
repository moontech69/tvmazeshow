import { Link } from "react-router-dom"

import type { Movie } from "@/types"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import { formatPrice } from "@/lib/utils"

import { Rating } from "@/components/rating"

interface ProductCardProps {
  movie: Movie
}

export default function MovieCard({
  movie,
}: Readonly<ProductCardProps>): JSX.Element {
  return (
    <Link to={`/movies/${movie.name}/${movie.id}`} aria-label={movie.name}>
      <Card className="rounded-md bg-accent/20 hover:bg-accent/60">
        <CardHeader>
          <CardTitle>{movie.name}</CardTitle>
          <CardDescription dangerouslySetInnerHTML={{ __html: movie.description||"No Summary" }} />
        </CardHeader>
        <CardFooter>
          <Rating rating={movie.rating/2}/>
        </CardFooter>
      </Card>
    </Link>
  )
}
