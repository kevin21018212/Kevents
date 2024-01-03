import { MovieVotes, Users, db } from "@/app/db";
import { and, eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const useremail = searchParams.get("email") as string;
  const findweek = parseInt(searchParams.get("week") as string) as number;

  const [user] = await db
    .select({ user_id: Users.user_id })
    .from(Users)
    .where(eq(Users.google_account_id, useremail));

  if (user) {
    const votes = await db
      .select()
      .from(MovieVotes)
      .where(
        and(
          eq(MovieVotes.week, findweek),
          eq(MovieVotes.user_id, user?.user_id)
        )
      );

    const userCanVote = votes.length === 0;
    return NextResponse.json({ userCanVote }, { status: 200 });
  }

  return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
}
