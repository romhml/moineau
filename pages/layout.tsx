import { Footer } from '@/components/Footer'
import { NavBar } from '@/components/NavBar'

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen">
      <NavBar />
      <main className="max-w-screen-xl w-full mx-auto px-8 grow">
        {children}
      </main>
      <Footer />
    </div>
  )
}
