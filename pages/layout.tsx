import { Footer } from '@/components/Footer'
import { NavBar } from '@/components/NavBar'

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen">
      <NavBar className="border-b border-slate-200 dark:border-slate-800" />
      <main className="max-w-screen-lg w-full mx-auto px-8 grow">
        {children}
      </main>
      <Footer />
    </div>
  )
}
