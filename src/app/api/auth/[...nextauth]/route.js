// app/api/auth/[...nextauth]/route
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import db from "../../db";
import bcrypt from "bcrypt";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        const [rows] = await db.execute(
          "SELECT * FROM users WHERE username = ? AND account_status = 'active'",
          [credentials.username]
        );
        const user = rows[0];
        if (user && bcrypt.compareSync(credentials.password, user.password)) {
          return { id: user.user_id, name: user.username, role: user.user_role };
        }
        return null;
      },
    }),
  ],
  callbacks: {
    async session({ session, token }) {
      session.user.id = token.sub;
      session.user.role = token.role;
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.sub = user.id;
        token.role = user.role;
      }
      return token;
    },
  },
  pages: {
    signIn: "/auth/login",
    error: "/auth/error",
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };