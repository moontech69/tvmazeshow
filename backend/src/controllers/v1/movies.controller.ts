import express, { type Router } from "express"
import asyncHandler from "express-async-handler"

import * as moviesService from "../../services/v1/movies.service"

const moviesController: Router = express.Router()

moviesController.route("/").get(asyncHandler(moviesService.getAllMovies))

export { moviesController }
