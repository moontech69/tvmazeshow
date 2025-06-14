import { siteConfig } from "@/config/site"

import { Link } from "react-router-dom"

import { Button, type ButtonProps } from "@/components/ui/button"

import { cn } from "@/lib/utils"

import { Icons } from "@/components/icons"

export function HeaderLogo({
  className,
  ...props
}: Readonly<ButtonProps>): JSX.Element {
  return (
    <Link to="/">
      <Button
        variant="link"
        className={cn(
          "gap-1.5 px-0 hover:text-muted-foreground hover:no-underline",
          className
        )}
        {...props}
      >
        <Icons.logo className="size-6" aria-hidden="true" />
        <span className="text-lg font-semibold tracking-tight">
          {siteConfig.name}
        </span>
      </Button>
    </Link>
  )
}
