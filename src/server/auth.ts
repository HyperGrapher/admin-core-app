/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
import {
  getServerSession,
  type DefaultSession,
  type NextAuthOptions,
  type User as UserDbType,
} from "next-auth";
import DiscordProvider from "next-auth/providers/discord";
import CredentialProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";

import { env } from "@/env";
import { db } from "@/server/db";

declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      id: string;
      email: string;
      image: string;
      username: string;
    } & DefaultSession["user"];
  }

  interface User {
    id: string;
    email: string;
    image: string;
    username: string;
  }
}

const MAX_DAYS = 30;

export const authOptions: NextAuthOptions = {
  debug: true,
  session: {
    strategy: "jwt",
    maxAge: MAX_DAYS * 24 * 60 * 60,
    updateAge: 24 * 60 * 60, // 24 h
  },
  callbacks: {
    jwt({ token, user }) {
      if (user) {
        return {
          ...token,
          id: user.id,
          email: user.email,
          username: user.username,
          image: user.image,
        };
      }

      return token;
    },
    session: async ({ session, token }) => {
      const dbUser = await db.user.findFirst({
        where: { email: session?.user.email },
        select: { image: true },
      });

      return {
        ...session,
        user: {
          ...token,
          image: dbUser?.image,
          picture: dbUser?.image,
        },
      };
    },
  },
  providers: [
    DiscordProvider({
      clientId: env.DISCORD_CLIENT_ID,
      clientSecret: env.DISCORD_CLIENT_SECRET,
    }),
    CredentialProvider({
      name: "credentials",
      credentials: {
        email: {
          label: "Email",
          type: "text",
          placeholder: "Email",
        },
        password: {
          label: "Password",
          type: "password",
          placeholder: "Password",
        },
      },

      async authorize(credentials): Promise<UserDbType | null> {
        const { email, password } = credentials as unknown as {
          email: string;
          password: string;
        };
        if (!email || !password) {
          throw new Error("No email or password");
        }

        const user = await db.user.findFirst({
          where: { email: credentials?.email },
        });

        if (!user) return null;
        // password check
        const result = await bcrypt.compare(password, user?.password ?? "");
        if (!result) return null;

        const authUser = {
          id: user.id,
          email: user.email ?? "",
          image: user.image,
          username: user?.username ?? "",
        } as unknown as UserDbType;

        return authUser;
      },
    }),
  ],
};

export const getServerAuthSession = () => getServerSession(authOptions);
