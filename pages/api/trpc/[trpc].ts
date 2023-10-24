import { createNextApiHandler } from '@trpc/server/adapters/next'
import { createContext } from '@/server/context'
import { appRouter } from '@/server/routers/_app'

export type { AppRouter } from '@/server/routers/_app'

//
// @see https://nextjs.org/docs/api-routes/introduction

export default createNextApiHandler({
  router: appRouter,
  createContext,
  batching: {
    enabled: true,
  },
})
