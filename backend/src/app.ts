import express from "express"
import compression from "compression"
import cookieParser from "cookie-parser"
import cookieSession from "cookie-session"
import helmet from "helmet"
import xss from "xss-shield"
import cors from "cors"

import { corsOptions } from "./config/cors"
import { cookieSessionOptions } from "./config/cookies"
import { compressionOptions } from "./config/compression"
import { xssOptions } from "./config/xss"

import { logger } from "./middleware/logger.middleware"
import {
  notFoundHandler,
  errorHandler,
} from "./middleware/error-handler.middleware"

import { moviesController } from "./controllers/v1/movies.controller"

const app = express()

app.use(helmet())
app.use(cors(corsOptions))
app.use(xss.xssShield(xssOptions))
app.use(express.json({ limit: "16kb" }))
app.use(express.urlencoded({ extended: true, limit: "16kb" }))
app.use(cookieParser())
app.use(cookieSession(cookieSessionOptions))
app.use(compression(compressionOptions))
app.use(logger)

app.use("/api/v1/movies", moviesController)

app.use(notFoundHandler)
app.use(errorHandler)

export { app }
