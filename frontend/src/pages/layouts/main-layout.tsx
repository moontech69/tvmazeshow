import { Outlet } from "react-router-dom"

import { Header } from "@/components/nav/header"

export function MainLayout(): JSX.Element {
  return (
    <div className="flex min-h-screen w-full flex-col">
      <Header />
      <main className="mx-auto w-full max-w-7xl flex-1 px-4 md:px-8">
        <Outlet />
      </main>
    </div>
  )
}
