// Serverless function (GET) for Votes
import { Votes, db } from "@/app/db";
import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const user_id = parseInt(searchParams.get("user_id") as string, 10);
  const event_id = parseInt(searchParams.get("event_id") as string, 10);
  const movie_id = parseInt(searchParams.get("movie_id") as string, 10);
  const preferred_event_time = searchParams.get(
    "preferred_event_time"
  ) as string;

  try {
    await db.insert(Votes).values({
      user_id,
      event_id,
      movie_id,
      preferred_event_time,
    });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }

  const votes = await sql`SELECT * FROM Votes`;
  return NextResponse.json({ votes }, { status: 200 });
}
