import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "@/server/api/trpc";

export const userRouter = createTRPCRouter({
  toggleUserStatus: protectedProcedure
    .input(
      z.object({
        userId: z.string().min(1),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      // simulate a slow db call
      await new Promise((resolve) => setTimeout(resolve, 1000));

     const user = await ctx.db.user.findUnique({
        where: {
          id: input.userId,
        },
        select: {
          active: true
        }
      });

      return ctx.db.user.update({
        where: {
          id: input.userId
        },
        data: {
          active: !user?.active
        },
      });
    }),

  getUsers: protectedProcedure.query(({ ctx }) => {
    return ctx.db.user.findMany({
      orderBy: { createdAt: "desc" },
    });
  }),

  getUserDetail: protectedProcedure
    .input(
      z.object({
        userId: z.string(),
      }),
    )
    .query(({ ctx, input }) => {
      return ctx.db.user.findUnique({
        where: {
          id: input.userId,
        },
      });
    }),
});
