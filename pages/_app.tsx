import { SessionProvider } from 'next-auth/react'
import localFont from 'next/font/local'
import '@/app/globals.css'
import { ThemeProvider } from '@/components/ThemeProvider'
import { trpc } from '@/utils/trpc'

// Font files can be colocated inside of `pages`
const fontHeading = localFont({
  src: '../assets/fonts/CalSans-SemiBold.woff2',
  variable: '--font-heading',
})

function App({
  Component,
  pageProps: { session, ...pageProps },
}: {
  Component: React.ComponentType<any>
  pageProps: any
}) {
  return (
    <div className={fontHeading.variable}>
      <SessionProvider session={session}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Component {...pageProps} />
        </ThemeProvider>
      </SessionProvider>
    </div>
  )
}

export default trpc.withTRPC(App)
