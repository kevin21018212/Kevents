import { EventVotes, Events, Users, db } from "@/app/db";
import { and, eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
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
        .from(EventVotes)
        .where(
          and(
            eq(EventVotes.week, findweek),
            eq(EventVotes.user_id, user.user_id)
          )
        );

      if (votes.length === 0) {
        const weekEvents = await db
          .select()
          .from(Events)
          .where(eq(Events.week, findweek));

        return NextResponse.json(
          { userCanVote: true, weekEvents },
          { status: 200 }
        );
      } else {
        const votedEventId = votes[0].event_id as number;
        const weekEvents = await db
          .select()
          .from(Events)
          .where(eq(Events.event_id, votedEventId));

        return NextResponse.json(
          { userCanVote: false, weekEvents },
          { status: 200 }
        );
      }
    }

    throw new Error("User not found");
  } catch (error) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
