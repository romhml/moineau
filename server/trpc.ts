import { TRPCError, initTRPC } from '@trpc/server'
import superjson from 'superjson'
import type { Context } from '@/server/context'

/**
 * Initialization of tRPC backend
 * Should be done only once per backend!
 */
const t = initTRPC.context<Context>().create({
  transformer: superjson,
})

/**
 * Export reusable router and procedure helpers
 * that can be used throughout the router
 */
export const router = t.router
export const publicProcedure = t.procedure
export const middleware = t.middleware

const isAuthed = middleware(async ({ ctx, next }) => {
  if (!ctx.user) {
    throw new TRPCError({ code: 'UNAUTHORIZED' })
  }
  return next({ ctx: { ...ctx, user: ctx.user } })
})

export const protectedProcedure = t.procedure.use(isAuthed)
