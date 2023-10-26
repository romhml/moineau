import { Github } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { Footer } from '@/components/Footer'
import { NavBar } from '@/components/NavBar'
import { Badge } from '@/components/ui/badge'
import { Button, buttonVariants } from '@/components/ui/button'
import { cn } from '@/utils/cn'

export default function Home() {
  const router = useRouter()
  return (
    <div className="flex flex-col justify-center min-h-screen">
      <NavBar />

      <div className="grow flex flex-col items-center py-6 md:pb-12 md:pt-10 lg:py-20">
        <section className="text-center">
          <Badge>Moineau</Badge>
          <p className="text-6xl font-heading font-bold mt-1">
            An example app <br /> powered by Next.js
          </p>
          <div className="mt-8 flex justify-center items-center space-x-4">
            <Button
              variant="outline"
              onClick={() => router.push('/posts')}
            >
              Get started
            </Button>

            <Link
              href="https://github.com/romhml/moineau"
              target="_blank"
              rel="noreferrer"
              className={cn(buttonVariants())}
            >
              <Github className="w-5 h-5 mr-1" />
              <span>GitHub</span>
            </Link>
          </div>
        </section>
      </div>
      <Footer />
    </div>
  )
}
