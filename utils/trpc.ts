import { httpBatchLink, loggerLink } from '@trpc/client'
import { createTRPCNext } from '@trpc/next'
import { inferRouterInputs } from '@trpc/server'
import superjson from 'superjson'
import type { AppRouter } from '../server/routers/_app'

export type RouterOutput = inferRouterInputs<AppRouter>
export type RouterInput = inferRouterInputs<AppRouter>

function getBaseUrl() {
  if (typeof window !== 'undefined')
    // browser should use relative path
    return ''

  if (process.env.VERCEL_URL)
    // reference for vercel.com
    return `https://${process.env.VERCEL_URL}`

  if (process.env.RENDER_INTERNAL_HOSTNAME)
    // reference for render.com
    return `http://${process.env.RENDER_INTERNAL_HOSTNAME}:${process.env.PORT}`

  // assume localhost
  return `http://localhost:${process.env.PORT ?? 3000}`
}

export const trpc = createTRPCNext<AppRouter>({
  config(opts) {
    const { ctx } = opts

    return {
      transformer: superjson,
      links: [
        loggerLink({
          enabled: (opts) =>
            process.env.NODE_ENV === 'development' ||
            (opts.direction === 'down' && opts.result instanceof Error),
        }),
        httpBatchLink({
          /**
           * If you want to use SSR, you need to use the server's full URL
           * @link https://trpc.io/docs/ssr
           **/
          url: `${getBaseUrl()}/api/trpc`,
          headers() {
            if (ctx?.req) {
              // To use SSR properly, you need to forward the client's headers to the server
              // This is so you can pass through things like cookies when we're server-side rendering

              // If you're using Node 18, omit the "connection" header
              const {
                // eslint-disable-next-line @typescript-eslint/no-unused-vars
                connection: _connection,
                ...headers
              } = ctx.req.headers
              return {
                ...headers,
                // Optional: inform server that it's an SSR request
                'x-ssr': '1',
              }
            }
            return {}
          },
        }),
      ],
    }
  },
  /**
   * @link https://trpc.io/docs/ssr
   **/
  ssr: true,
})
