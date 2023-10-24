'use client'

import { LogOut } from 'lucide-react'
import { signIn, signOut, useSession } from 'next-auth/react'
import Link from 'next/link'
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
          <DropdownMenuItem onClick={() => signOut()}>
            <LogOut className="mr-2 w-4 h-4 text-slate-500" />
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
      className={cn('border-b border-slate-100 h-16', className)}
      {...props}
    >
      <nav className="w-full h-full flex max-w-screen-xl mx-auto items-center px-8 py-2 justify-between">
        <div>
          <Link
            href="/"
            className="text-xl font-bold"
          >
            X
          </Link>
        </div>
        <div className="space-x-2">
          <UserMenu />
        </div>
      </nav>
    </div>
  )
}

export { NavBar }
