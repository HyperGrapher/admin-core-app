import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";

export const postRouter = createTRPCRouter({
  createOrEdit: protectedProcedure
    .input(
      z.object({
        id: z.number().optional(), // create islemi icin gerekmiyor, update islemleri icin gerekli
        title: z.string().min(1),
        text: z.string().min(1),
        published: z.boolean(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      // 1 saniye = 1_000 ms -- underscore is a valid separator for numbers: 100_000_000 (yuz milyon)
      // simulate a slow db call
      // await new Promise((resolve) => setTimeout(resolve, 1_000));

      if(input.id) {
       return await ctx.db.post.update({
          where: { id: input.id },
          data: {
            title: input.title,
            text: input.text,
            published: input.published,
          },
        
        });

      }

      return await ctx.db.post.create({
        data: {
          title: input.title,
          text: input.text,
          published: input.published,
          userId: ctx.session.user.id
        },
      })





      // upsert update ve create islemlerinin bir arada kullanilmasini saglar.
      // {where: {id} } varsa update kismidaki bilgilerle guncelleme yapar,
      // yoksa create ile yeni bir row olusturur. 
       
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
        status: z.string(),
      }),
    )
    .query(({ ctx, input }) => {
      const { status } = input;

      const statusQuery =
        status === "published"
          ? { published: true }
          : status === "draft"
            ? { published: false }
            : {};

      return ctx.db.post.findMany({
        orderBy: { createdAt: "desc" },
        where: { ...statusQuery },
      });
    }),
});
