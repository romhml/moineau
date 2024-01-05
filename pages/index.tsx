import { Github, Shield } from 'lucide-react'
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
    <div className="flex flex-col justify-center items-center min-h-screen">
      <NavBar />

      <section className="grow flex flex-col text-center items-center pb-40 py-20">
        <Badge>Moineau</Badge>
        <p className="text-4xl sm:text-5xl lg:text-6xl font-heading font-bold mt-1">
          An example app <br /> powered by Next.js
        </p>
        <p className="text-gray-500 text-xl max-w-lg mt-4">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor.
        </p>
        <div className="mt-4 flex justify-center items-center space-x-4">
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

      <section className="w-full bg-gray-100 dark:bg-transparent py-16 flex flex-col justify-center items-center space-y-4 px-2">
        <p className="text-3xl lg:text-5xl font-heading font-medium">
          Features
        </p>
        <p className="text-gray-500 text-lg text-center max-w-2xl">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </p>
        <div className="grid grid-cols-3 max-w-screen-lg gap-2 w-full pt-4">
          <FeatureCard
            icon={<Shield className="w-full h-full" />}
            title="Next.js"
            description="lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
          />
          <FeatureCard
            icon={<Shield className="w-full h-full" />}
            title="Authentication"
            description="lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
          />
          <FeatureCard
            icon={<Shield className="w-full h-full" />}
            title="Payments"
            description="lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
          />
          <FeatureCard
            icon={<Shield className="w-full h-full" />}
            title="Database"
            description="lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
          />
          <FeatureCard
            icon={<Shield className="w-full h-full" />}
            title="Styles"
            description="lorem  ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
          />
          <FeatureCard
            icon={<Shield className="w-full h-full" />}
            title="API"
            description="lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
          />
        </div>
      </section>
      <Footer />
    </div>
  )
}

function FeatureCard({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode
  title: string
  description: string
}) {
  return (
    <div className="border border-gray-200 dark:bg-gray-950 dark:border-gray-700 p-8 bg-white space-y-2">
      <div className="w-12 h-12 text-gray-800 dark:text-gray-200">{icon}</div>
      <p className="text-lg font-bold">{title}</p>
      <p className="text-sm text-gray-400"> {description} </p>
    </div>
  )
}
