import dotenv from "dotenv"
import { z } from "zod"

dotenv.config()

const environmentSchema = z.object({
  NODE_ENV: z
    .enum(["development", "production", "test"])
    .default("development"),
  SERVER_PROTOCOL: z
    .string({ required_error: "SERVER_PROTOCOL missing" })
    .default("http"),
  SERVER_HOSTNAME: z
    .string({
      required_error: "SERVER_HOSTNAME missing",
    })
    .default("localhost"),
  SERVER_PORT: z.coerce
    .number({
      required_error: "SERVER_PORT missing",
    })
    .int()
    .positive()
    .max(65536)
    .default(4000),
  CLIENT_PROTOCOL: z
    .string({ required_error: "CLIENT_PROTOCOL missing" })
    .default("http"),
  CLIENT_HOSTNAME: z
    .string({ required_error: "CLIENT_HOSTNAME missing" })
    .default("localhost"),
  CLIENT_PORT: z.coerce
    .number({ required_error: "CLIENT_PORT missing" })
    .int()
    .positive()
    .max(65536)
    .default(3000),
  MOVIE_API_URL: z.string({ required_error: "MOVIE_API_URL missing" }),
})

const env = environmentSchema.parse(process.env)

export const config = {
  node_env: env.CLIENT_HOSTNAME,
  server: {
    protocol: env.SERVER_PROTOCOL,
    hostname: env.SERVER_HOSTNAME,
    port: env.SERVER_PORT,
  },
  client: {
    protocol: env.CLIENT_PROTOCOL,
    hostname: env.CLIENT_HOSTNAME,
    port: env.CLIENT_PORT,
  },
  api: {
    movie: env.MOVIE_API_URL,
  },
}
