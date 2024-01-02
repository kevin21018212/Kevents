// Serverless function (GET) for Votes
import { Votes, db } from "@/app/db";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const user_id = parseInt(searchParams.get("user_id") as string) as number;
  const event_id = parseInt(searchParams.get("event_id") as string) as number;
  const movie_id = parseInt(searchParams.get("movie_id") as string) as number;
  const preferred_event_time = searchParams.get(
    "preferred_event_time"
  ) as string;

  try {
    // Check if the user has already voted for the same movie in the same event

    if (user_id) {
      // If the user hasn't voted for the same movie in the same event, add the vote to the Votes table
      await db.insert(Votes).values({
        user_id,
        event_id,
        movie_id,
        preferred_event_time,
      });
    } else {
      console.log(
        `User ${user_id} has already voted for movie ${movie_id} in event ${event_id}.`
      );
    }
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }

  const votes = await db.select().from(Votes);
  return NextResponse.json({ votes }, { status: 200 });
}
