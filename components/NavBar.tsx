'use client'

import { LogOut, Mail } from 'lucide-react'
import { signIn, signOut, useSession } from 'next-auth/react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { ThemeSwitcher } from '@/components/ThemeSwitcher'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { cn } from '@/utils/cn'

function UserMenu() {
  const { status, data } = useSession()
  const router = useRouter()

  if (status === 'authenticated') {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger className="rounded-full">
          <Avatar>
            <AvatarImage src={data?.user?.image || undefined} />
            <AvatarFallback></AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>

        <DropdownMenuContent className="mr-2">
          <DropdownMenuItem onClick={() => router.push('/posts')}>
            <Mail className="mr-2 w-4 h-4 text-gray-500" />
            <span>Posts</span>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => signOut()}>
            <LogOut className="mr-2 w-4 h-4 text-gray-500" />
            <span>Log out</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    )
  }

  if (status === 'loading') {
    return null
  }

  return (
    <Button
      variant="ghost"
      onClick={() => signIn()}
      className="text-primary border-primary"
    >
      Sign in
    </Button>
  )
}

function NavBar({ className, ...props }: { className?: string }) {
  return (
    <div
      className={cn('dark:border-gray-800 h-16 w-full', className)}
      {...props}
    >
      <nav className="w-full h-full flex max-w-screen-lg mx-auto items-center px-8 py-2 justify-between">
        <div>
          <Link
            href="/"
            className="text-xl font-bold"
          >
            <Image
              src="/icon.png"
              alt="moineau"
              width="32"
              height="32"
            />
          </Link>
        </div>
        <div className="flex space-x-1 items-center">
          <ThemeSwitcher />
          <UserMenu />
        </div>
      </nav>
    </div>
  )
}

export { NavBar }
