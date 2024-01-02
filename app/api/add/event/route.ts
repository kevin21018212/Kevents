// Serverless function (GET) for Events
import { Events, db } from "@/app/db";
import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const event_name = searchParams.get("event_name") as string;
  const event_time = searchParams.get("event_time") as string;
  const description = searchParams.get("description") as string;
  const url = searchParams.get("url") as string;
  const imagepath = searchParams.get("imagepath") as string;
  const location = searchParams.get("location") as string;
  const week = parseInt(searchParams.get("week") as string) as number;

  try {
    await db.insert(Events).values({
      event_name,
      event_time,
      description,
      url,
      imagepath,
      location,
      week,
    });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }

  const events = await await db.select().from(Events);
  return NextResponse.json({ events }, { status: 200 });
}
