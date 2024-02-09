import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";

export const postRouter = createTRPCRouter({
  create: protectedProcedure
    .input(
      z.object({
        title: z.string().min(1),
        text: z.string().min(1),
        published: z.boolean(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      // simulate a slow db call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      return ctx.db.post.create({
        data: {
          title: input.title,
          text: input.text,
          published: input.published,
          user: { connect: { id: ctx.session.user.id } },
        },
      });
    }),

  getbyId: protectedProcedure
    .input(
      z.object({
        id: z.string(),
      }),
    )
    .query(({ ctx, input }) => {
      return ctx.db.post.findFirst({
        where: { id: Number(input.id) },
      });
    }),
  getAll: protectedProcedure
    .input(
      z.object({
        published: z.boolean(),
      }),
    )
    .query(({ ctx, input }) => {
      return ctx.db.post.findMany({
        orderBy: { createdAt: "desc" },
        where: { published: input.published },
      });
    }),
});
