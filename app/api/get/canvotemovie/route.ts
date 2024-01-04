import { MovieVotes, Movies, Users, db } from "@/app/db";
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
        .from(MovieVotes)
        .where(
          and(
            eq(MovieVotes.week, findweek),
            eq(MovieVotes.user_id, user.user_id)
          )
        );

      if (votes.length == 0) {
        const movies = await db
          .select()
          .from(Movies)
          .where(eq(Movies.week, findweek));

        return NextResponse.json(
          { userCanVote: true, movies },
          { status: 200 }
        );
      } else {
        const votedMovieId = votes[0].movie_id as number;
        const movies = await db
          .select()
          .from(Movies)
          .where(eq(Movies.movie_id, votedMovieId));

        return NextResponse.json(
          { userCanVote: false, movies },
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
