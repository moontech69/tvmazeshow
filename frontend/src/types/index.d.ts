export interface NavLink {
  label: string
  href: string
  external?: boolean
  disabled?: boolean
  subLinks?: NavLink[]
}
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

export interface User {
  name: string
  email: string
  image?: string | null
}

export type Genre = {
  label: string
  count: number
}