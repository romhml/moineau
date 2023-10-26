import NextAuth from 'next-auth'
import GithubProvider from 'next-auth/providers/github'
import { db } from '@/db'
import { SQLiteDrizzleAdapter } from '@/db/drizzleAdapter'

export const authOptions = {
  adapter: SQLiteDrizzleAdapter(db),
  pages: {
    signIn: '/signin',
  },

  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    }),
    // ...add more providers here
  ],

  callbacks: {
    // Add additional user properties in the session
    async session({ session, user }) {
      session.user = user
      return session
    },
  },
}

export default NextAuth(authOptions)
