import { Users, db } from "@/app/db";
import { eq } from "drizzle-orm";
import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";

const handler = NextAuth({
  secret: process.env.AUTH_SECRET,
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
  ],
  callbacks: {
    async jwt({ profile, account, token }) {
      if (token && token.email) {
        const existingUser = await db
          .select()
          .from(Users)
          .where(eq(Users.google_account_id, token.email));
        if (existingUser.length === 0) {
          await db.insert(Users).values({
            username: token.name,
            google_account_id: token.email,
          });
        }
      }

      return token;
    },
  },
});

export { handler as GET, handler as POST };
