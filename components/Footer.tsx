import Image from 'next/image'
import Link from 'next/link'

export function Footer() {
  return (
    <div className="flex flex-col items-center space-y-4 mx-auto max-w-screen-lg px-8 py-8">
      <Image
        src="/icon.png"
        width={32}
        height={32}
        alt="moineau"
      />
      <p className="text-sm text-gray-800 dark:text-gray-200">
        Made with <span className="text-gray-400 dark:text-gray-600">♥</span>{' '}
        by{' '}
        <Link
          href="https://github.com/romhml"
          target="_blank"
          className="underline font-semibold"
        >
          @romhml
        </Link>
      </p>
    </div>
  )
}
