'use client'

import { SessionProvider } from 'next-auth/react'
import { Footer } from '@/components/Footer'
import { NavBar } from '@/components/NavBar'
import './globals.css'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <SessionProvider>
          <div className="flex flex-col min-h-screen">
            <NavBar />
            <main className="max-w-screen-lg w-full mx-auto px-8 grow">
              {children}
            </main>
            <Footer />
          </div>
        </SessionProvider>
      </body>
    </html>
  )
}
