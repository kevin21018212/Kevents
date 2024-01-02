// Serverless function (GET) for adding a user
import { Users, db } from "@/app/db";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const email = searchParams.get("google_account_id") as string;

    const existingUser = await db
      .select()
      .from(Users)
      .where(eq(Users.google_account_id, email));

    if (existingUser.length === 0) {
      // If the user doesn't exist, add them to the Users table
      await db.insert(Users).values({
        username: searchParams.get("username") as string,
        google_account_id: email,
      });

      console.log(`User with Google Account ID ${email} added.`);
    } else {
      console.log(`User with Google Account ID ${email} already exists.`);
    }

    const users = await db.select().from(Users);
    return NextResponse.json({ users }, { status: 200 });
  } catch (error) {
    console.error("Error during user route:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
