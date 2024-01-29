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

/**
 * Module augmentation for `next-auth` types. Allows us to add custom properties to the `session`
 * object and keep type safety.
 *
 * @see https://next-auth.js.org/getting-started/typescript#module-augmentation
 */
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

/**
 * Options for NextAuth.js used to configure adapters, providers, callbacks, etc.
 *
 * @see https://next-auth.js.org/configuration/options
 */


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
    session: ({ session, token }) => ({
      ...session,
      user: { ...token },
    }),
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

/**
 * Wrapper for `getServerSession` so that you don't need to import the `authOptions` in every file.
 *
 * @see https://next-auth.js.org/configuration/nextjs
 */
export const getServerAuthSession = () => getServerSession(authOptions);
