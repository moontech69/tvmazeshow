import { Icons } from "@/components/icons"

interface RatingProps {
  rating: number
}

export function Rating({
  rating,
}: Readonly<RatingProps>): JSX.Element {
  return (
    <div className="flex w-full items-center justify-between">
      <div className="flex items-center justify-center">
        {[1, 2, 3, 4, 5].map((value) => (
          <span key={value}>
            {rating >= value ? (
              <Icons.starFilled className="size-4" />
            ) : rating >= value - 0.5 ? (
              <Icons.halfStar className="size-3.5" />
            ) : (
              <Icons.star className="size-3.5 text-muted-foreground" />
            )}
          </span>
        ))}
      </div>
    </div>
  )
}
