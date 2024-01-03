// Serverless function (GET) for Events and Movies
import { Movies, Events, db, MovieVotes } from "@/app/db";
import { desc, eq, max, sql } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const findweek = parseInt(searchParams.get("week") as string) as number;

    // Fetch movies and events for the specified week

    const votes = await db
      .select({
        movie_id: MovieVotes.movie_id,
        votes: sql<number>`cast(count(${MovieVotes.movie_id}) as int)`,
      })
      .from(MovieVotes)
      .groupBy(MovieVotes.movie_id);

    const maxVotesObject = votes.reduce((max, current) =>
      current.votes > max.votes ? current : max
    );

    const displayedmovie = maxVotesObject.movie_id as number;

    const movies = await db
      .select()
      .from(Movies)
      .where(eq(Movies.movie_id, displayedmovie));

    const events = await db
      .select()
      .from(Events)
      .where(eq(Events.week, findweek));

    return NextResponse.json({ movies, events }, { status: 200 });
  } catch (error) {
    console.error("Error during combined route:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
