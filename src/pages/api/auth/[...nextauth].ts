import NextAuth from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import { PrismaAdapter } from '@next-auth/prisma-adapter'
import { prisma } from 'src/lib/prismaClient'

const { SECRET, GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET } = process.env

if (!SECRET) throw new Error('You must provide SECRET env var.')
if (!GOOGLE_CLIENT_ID)
  throw new Error('You must provide GOOGLE_CLIENT_ID env var.')
if (!GOOGLE_CLIENT_SECRET)
  throw new Error('You must provide GOOGLE_CLIENT_SECRET env var.')

export default NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
    }),
  ],
  secret: SECRET,
})
