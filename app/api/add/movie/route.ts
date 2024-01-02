// Serverless function (GET)
import { Movies, db } from "@/app/db";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const movie_title = searchParams.get("title") as string;
    const week = parseInt(searchParams.get("week") as string);

    // Read API key from environment variables
    const omdbApiKey = process.env.MOVIE_KEY;

    // Make API call to OMDB to get the movie details
    const omdbApiUrl = `https://www.omdbapi.com/?t=${encodeURIComponent(
      movie_title
    )}&apikey=${omdbApiKey}`;
    const omdbApiResponse = await fetch(omdbApiUrl);
    const omdbData = await omdbApiResponse.json();

    const url = omdbData.Poster || "";

    const movieExists = await db
      .select()
      .from(Movies)
      .where(eq(Movies.movie_title, movie_title));

    if (movieExists.length === 0) {
      await db.insert(Movies).values({
        movie_title,
        url,
        week,
      });
    } else {
      console.log(`Movie with title ${movie_title} already exists.`);
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
