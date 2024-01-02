// Serverless function (GET)
import { Movies, db } from "@/app/db";
import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const movie_title = searchParams.get("title") as string;
  const url = searchParams.get("url") as string;
  const week = searchParams.get("week") as string;

  await db.insert(Movies).values({
    movie_title,
    url,
    week,
  });

  const movies = await db.select().from(Movies);
  return NextResponse.json({ movies }, { status: 200 });
}
