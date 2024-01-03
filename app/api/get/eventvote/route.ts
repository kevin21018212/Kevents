// Serverless function (GET) for Events and Movies
import { Movies, Events, db } from "@/app/db";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const findweek = parseInt(searchParams.get("week") as string) as number;

    // Fetch movies and events for the specified week
    const movies = await db
      .select()
      .from(Movies)
      .where(eq(Movies.week, findweek));
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
