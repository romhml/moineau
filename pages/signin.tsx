import { ChevronLeft, Github } from 'lucide-react'
import { signIn } from 'next-auth/react'
import { useSession } from 'next-auth/react'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useForm } from 'react-hook-form'
import { Footer } from '@/components/Footer'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'

export default function SignIn() {
  const { status } = useSession()
  const router = useRouter()

  const form = useForm({
    defaultValues: {
      email: '',
    },
  })

  if (status === 'authenticated') {
    // Navigate away from this page if the user is signed in
    router.push('/')
  }

  return (
    <div className="flex flex-col h-screen w-screen">
      <div className="grow flex flex-col items-center max-w-xs w-full py-8 mx-auto">
        <Image
          className="cursor-pointer"
          src="/icon.png"
          alt="logo"
          width={128}
          height={128}
          onClick={() => router.push('/')}
        />

        <h1 className="text-2xl font-bold mt-4">Welcome back!</h1>
        <p className="text-gray-500 dark:text-gray-400 mt-1 text-lg">
          Sign in with your email to continue
        </p>
        <div className="mt-8 w-full flex flex-col space-y-4">
          <Form {...form}>
            <form>
              <FormField
                name="email"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <Input
                      {...field}
                      placeholder="bob@dylan.com"
                    />
                    <div className="flex">
                      <FormMessage />
                      <FormDescription />
                    </div>
                  </FormItem>
                )}
              />
              <Button
                className="w-full"
                type="submit"
              >
                Sign In
              </Button>
            </form>
          </Form>

          <div className="flex items-center justify-center">
            <div className="h-px bg-gray-200 dark:bg-gray-800 w-16 mr-2" />
            <span className="text-gray-300 dark:text-gray-600 text-sm uppercase">
              or
            </span>
            <div className="h-px bg-gray-200 dark:bg-gray-800 w-16 ml-2" />
          </div>

          <Button
            onClick={() => signIn('github')}
            variant="outline"
          >
            <Github className="h-5 w-5 mr-2" />
            Sign in with Github
          </Button>
        </div>
      </div>
    </div>
  )
}
