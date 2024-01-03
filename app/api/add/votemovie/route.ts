// Serverless function (GET) for Events
import { MovieVotes, Users, db } from "@/app/db";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const movie_id = parseInt(searchParams.get("movie_id") as string) as number;
  const email = searchParams.get("email") as string;
  const week = parseInt(searchParams.get("week") as string) as number;

  const [user] = await db
    .select({ user_id: Users.user_id })
    .from(Users)
    .where(eq(Users.google_account_id, email));

  const user_id = user.user_id as number;
  await db.insert(MovieVotes).values({ user_id, week, movie_id });

  return NextResponse.json({}, { status: 200 });
}
