/* eslint-disable @typescript-eslint/no-unused-vars */
import { TRPCError } from "@trpc/server";
import { z } from "zod";
import bcrypt from "bcrypt";
import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "@/server/api/trpc";
import crypto from "node:crypto";

export const authRouter = createTRPCRouter({
  createUser: publicProcedure
    .input(
      z.object({
        email: z.string().trim().email(),
        password: z.string().trim().min(8),
        password2: z.string().trim().min(8),
        username: z.string().trim().min(4),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const { email, password, password2, username } = input;

      const isEmailExist = await ctx.db.user.count({
        where: {
          email,
        },
      });

      if (isEmailExist)
        throw new TRPCError({
          message: "Bu email zaten kayıtlı",
          code: "CONFLICT",
          cause: "Email Conflict",
        });

      if (password !== password2)
        throw new TRPCError({
          message: "Şifre uyuşmuyor",
          code: "CONFLICT",
          cause: "password conflict",
        });

      const emailVerifyCode = crypto.randomBytes(8).toString("hex");

      try {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const user = await ctx.db.user.create({
          data: {
            username,
            email,
            password: hashedPassword,
          },
        });

        return user;
      } catch (error) {
        console.log(error);
      }
    }),

  // TODO:  Cleanup and Complete registration form provider signup
  createProviderUser: protectedProcedure
    .input(
      z.object({
        username: z.string().trim().min(4),
        role: z.enum(["CLIENT", "EXPERT"]),
        provider: z.enum(["google", "facebook", "github", "discord"]),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const { username, role, provider } = input;
      const { id, email, image } = ctx.session.user;

      await new Promise((resolve) => setTimeout(resolve, 1500));

      const exist = await ctx.db.user.findUnique({
        where: {
          email: email ?? "",
        },
      });

      if (exist)
        throw new TRPCError({
          message: "Bu email zaten kayıtlı",
          code: "CONFLICT",
          cause: "Email Conflict",
        });

      try {
        const user = await ctx.db.user.create({
          data: {
            email: email,
            password: "provider-auth",

          },
        });

        
      } catch (error) {
        console.log(error);
      }

      const createdUser = await ctx.db.user.findUnique({
        where: {
          email: email ?? "",
        },
      });

      return createdUser;
    }),

});
