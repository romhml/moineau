import Link from 'next/link'

export function Footer() {
  return (
    <>
      <div className="flex items-center mx-auto max-w-screen-xl px-8 py-4">
        <p className="text-sm text-slate-600 dark:text-slate-400">
          Made with <span className="text-red-500">♥</span> by{' '}
          <Link
            href="https://github.com/romhml"
            target="_blank"
            className="font-bold"
          >
            @romhml
          </Link>
        </p>
      </div>
    </>
  )
}
