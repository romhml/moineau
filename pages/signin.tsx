import { Github } from 'lucide-react'
import { signIn } from 'next-auth/react'
import { useSession } from 'next-auth/react'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { Footer } from '@/components/Footer'
import { Button } from '@/components/ui/button'

export default function SignIn() {
  const { status } = useSession()
  const router = useRouter()

  if (status === 'authenticated') {
    // Navigate away from this page if the user is signed in
    router.push('/')
  }

  return (
    <div className="flex flex-col h-screen w-screen justify-center">
      <div className="grow gap-8 flex flex-col items-center justify-center">
        <Image
          src="/icon.png"
          alt="logo"
          width={128}
          height={128}
        />
        <div className="font-bold text-2xl">
          <Button onClick={() => signIn('github')}>
            <Github className="h-5  w-5 mr-2" />
            Sign in with Github
          </Button>
        </div>
      </div>
      <Footer />
    </div>
  )
}
