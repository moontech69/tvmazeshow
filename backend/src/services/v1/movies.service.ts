import { type Request, type Response } from "express"
import axios from "axios";

import { type Movie, type TVMazeShow } from "src/types"

import { config } from "../../config";

export async function getAllMovies(
  req: Request,
  res: Response
): Promise<void> {
  const { name = "", genre, id } = req.query;

  if (!name) {
    throw new Error("Query param 'name' is required");
  }

  let response: TVMazeShow[] = [];
  try {
    const { data } = await axios.get<any, {data: TVMazeShow[]}>(`${config.api.movie}/search/shows?q=${encodeURIComponent(String(name))}`);
    response = data;
    if (!response || !Array.isArray(response)) {
      throw new Error("Invalid response from TVMaze API");
    }
  } catch (error) {
    throw new Error("Failed to fetch data from TVMaze API");
  }
    
  let shows: Movie[] = response.map((entry) => ({
    id: entry.show.id,
    name: entry.show.name,
    description: entry.show.summary || "",
    image: entry.show.image?.original || "",
    genre: entry.show.genres.join(", "),
    language: entry.show.language || "Unknown",
    rating: entry.show.rating?.average || 0,
    premiereDate: entry.show.premiered || null,
  }));

  if (id) {
    const showId = Number(id);
    const show = shows.find((show) => show.id === showId);
    res.json(show);
  }

  else if (genre) {
    shows = shows.filter((show) =>
      show.genre.toLowerCase().includes(String(genre).toLowerCase())
    );
    res.json(shows);
  }

  else {
    res.json(shows);
  }
}
