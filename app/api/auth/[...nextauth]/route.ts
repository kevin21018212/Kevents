import { Users, db } from "@/app/db";
import { eq } from "drizzle-orm";
import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";

const handler = NextAuth({
  secret: process.env.AUTH_SECRET,
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
    }),
  ],

  callbacks: {
    async signIn(params) {
      const { profile } = params;

      try {
        // Check if the user already exists in the Users table
        if (profile && profile.email) {
          const existingUser = await db
            .select()
            .from(Users)
            .where(eq(Users.google_account_id, profile.email));

          if (existingUser.length === 0) {
            // If the user doesn't exist, add them to the Users table
            await db.insert(Users).values({
              username: profile.name,
              google_account_id: profile.email,
            });
          }
        }

        return true;
      } catch (error) {
        console.error("Error during signIn callback:", error);
        return false; // Handle the error as needed
      }
    },
  },
});

export { handler as GET, handler as POST };
