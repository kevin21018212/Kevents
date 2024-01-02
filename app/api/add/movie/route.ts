// Serverless function (GET)
import { Movies, db } from "@/app/db";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const movie_title = searchParams.get("title") as string;
    const url = searchParams.get("url") as string;
    const week = parseInt(searchParams.get("week") as string);
    const existingMovies = await db
      .select({ movie_title: Movies.movie_title })
      .from(Movies);

    const movieExists = existingMovies.some(
      (movie) => movie.movie_title === movie_title
    );

    if (movieExists) {
      // If the movie doesn't exist, add it to the Movies table
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
