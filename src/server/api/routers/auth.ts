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
        // Server tarafinda yanlis bir sey varsa throwing TRPCError daha avantajli
        // frontend'de mesaji toast olarak gosterebilirsin.
        // bir middleware ile TRPC error'lari bir dosya/DB'ye log'layabilirsin
        throw new TRPCError({
          message: "Şifre uyuşmuyor",
          code: "CONFLICT",
          cause: "password conflict",
        });

      /* 
      eger gerekli olursa bu sekilde bir random string olusturabiirsin
      verifyCode1: 654bcc6f28e885d2f8b28e70df9a6098
      verifyCode2: aXvSHiGM4se5R9yeeCDSdg
    */
      const verifyCode1 = crypto.randomBytes(16).toString("hex"); // daha fazla char uretir 
      const verifyCode2 = crypto
        .randomBytes(16)
        .toString("base64url")
        .replace(/^a-zA-Z0-9 ]/g, ""); // replaces special chars with alphanumeric

      // server tarafi oldugu icin prints on terminal not browser
      console.table({ verifyCode1, verifyCode2 });

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
