import { publicProcedure, router } from '@/server/trpc'
import { postsRouter } from './posts'

export const appRouter = router({
  probe: publicProcedure.query(() => 'OK'),
  posts: postsRouter,
})

export type AppRouter = typeof appRouter
