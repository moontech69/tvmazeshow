import "@/styles/globals.css"

import * as React from "react"
import ReactDOM from "react-dom/client"
import { Provider } from "react-redux"
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom"

import { ThemeProvider } from "@/providers/theme-provider"
import { store } from "@/state/store"

import { HomePage } from "@/pages/home-page"
import { MainLayout } from "@/pages/layouts/main-layout"
import { MoviePage } from "@/pages/movie-page"

import { Toaster } from "@/components/ui/toaster"

import { TailwindIndicator } from "@/components/tailwind-indicator"
import { ErrorBlock } from "./components/error"

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<MainLayout />}>
      <Route index element={<HomePage />} />
      <Route path="/movies/:name/:id" element={<MoviePage />} />
      <Route path="*" element={<ErrorBlock message="Can not find page: 404" />} />
    </Route>
  )
)

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ThemeProvider>
      <Provider store={store}>
        <RouterProvider router={router} />
        <Toaster />
        <TailwindIndicator />
      </Provider>
    </ThemeProvider>
  </React.StrictMode>
)
