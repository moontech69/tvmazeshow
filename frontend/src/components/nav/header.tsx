import { navLinks } from "@/data/nav-links"

import { Navigation } from "@/components/nav/navigation"
import { NavigationMobile } from "@/components/nav/navigation-mobile"
import { UserDropdown } from "@/components/nav/user-dropdown"
import { ThemeSwitch } from "../theme-switch"

export function Header(): JSX.Element {
  const session = {
    user: {
      name: "Stanislav Karpenko",
      email: "karstas765@gmail.com",
      image: null,
    },
  }

  return (
    <header className="sticky top-0 z-50 flex h-20 w-full bg-background">
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between p-4 md:px-8">
        <Navigation navLinks={navLinks} />
        <NavigationMobile navLinks={navLinks} />

        <div className="flex flex-1 items-center justify-end">
          <nav className="flex items-center justify-center gap-1.5">
            <ThemeSwitch />
            <UserDropdown user={session.user} />
          </nav>
        </div>
      </div>
    </header>
  )
}
