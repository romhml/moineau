import { SessionProvider } from 'next-auth/react'
import '@/app/globals.css'
import { trpc } from '@/utils/trpc'

function App({
  Component,
  pageProps: { session, ...pageProps },
}: {
  Component: React.ComponentType<any>
  pageProps: any
}) {
  return (
    <SessionProvider session={session}>
      <Component {...pageProps} />
    </SessionProvider>
  )
}

export default trpc.withTRPC(App)
