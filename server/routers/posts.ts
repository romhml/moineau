import { z } from 'zod'
import { db } from '@/db'
import { posts } from '@/db/schema'
import { createPostSchema } from '@/server/schemas'
import { protectedProcedure, router } from '../trpc'

export const postsRouter = router({
  list: protectedProcedure
    .input(
      z.object({
        cursor: z.number().default(0),
        limit: z.number().max(50).default(10),
        authorId: z.string().optional().nullish(),
      }),
    )
    .query(async ({ input }) => {
      const posts = await db.query.posts.findMany({
        columns: { id: true, content: true, createdAt: true },
        with: { author: { columns: { id: true, image: true, name: true } } },
        where: (posts, { eq }) =>
          input?.authorId ? eq(posts.authorId, input?.authorId) : undefined,
        orderBy: (posts, { desc }) => [desc(posts.createdAt)],
        limit: input.limit,
        offset: input.cursor,
      })

      return {
        items: posts,
        nextCursor:
          posts.length < input.limit ? undefined : input.cursor + input.limit,
      }
    }),

  create: protectedProcedure
    .input(createPostSchema)
    .mutation(async ({ ctx, input }) => {
      const post = await db
        .insert(posts)
        .values({
          ...input,
          authorId: ctx.user.id,
        })
        .returning()
        .get()

      return {
        id: post.id,
        content: post.content,
        createdAt: post.createdAt,
        author: { id: ctx.user.id, image: ctx.user.image, name: ctx.user.name },
      }
    }),
})
