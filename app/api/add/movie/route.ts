// Serverless function (GET)
import { Movies, db } from "@/app/db";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const movieTitle = searchParams.get("title") as string;
    const week = parseInt(searchParams.get("week") as string);

    // Read API key from environment variables
    const tmdbApiKey = process.env.MOVIE_KEY;

    // Make API call to TMDb to search for the movie
    const tmdbApiUrl = `https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(
      movieTitle
    )}&include_adult=true&language=en-US&page=1&api_key=${tmdbApiKey}`;
    const tmdbApiResponse = await fetch(tmdbApiUrl);
    const tmdbData = await tmdbApiResponse.json();

    // Extract the poster path of the first result
    const posterPath = tmdbData.results[0]?.poster_path || "";
    const imgurl = `https://image.tmdb.org/t/p/original${posterPath}`;
    // Check if the movie already exists in the database
    const movieExists = await db
      .select()
      .from(Movies)
      .where(eq(Movies.movie_title, movieTitle));

    if (movieExists.length === 0) {
      await db.insert(Movies).values({
        movie_title: movieTitle,
        url: imgurl,
        week,
      });
    } else {
      console.log(`Movie with title ${movieTitle} already exists.`);
    }

    const movies = await db.select().from(Movies);
    return NextResponse.json({ movies }, { status: 200 });
  } catch (error) {
    console.error("Error during movie route:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
