import { Link } from "react-router-dom"

import type { Genre } from "@/types"

import {
  Card,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

interface GenreCardProps {
  genre: Genre
  onClick: (genreLabel: string) => void
}

export default function GenreCard({
  genre, onClick
}: Readonly<GenreCardProps>): JSX.Element {
  return (
    <Card className="rounded-md bg-accent/20 hover:bg-accent/60" onClick={() => onClick(genre.label)}>
      <CardHeader>
        <CardTitle className="flex justify-between items-center">
          <span>{genre.label}</span>
          <span> {genre.count}</span>
        </CardTitle>
      </CardHeader>
    </Card>
  )
}
