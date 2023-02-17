import { verify } from "argon2"
import NextAuth, { type NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import { env } from "../../../env/server.mjs"
import { prisma } from "../../../server/db/client"

export const authOptions: NextAuthOptions = {
  callbacks: {
    jwt: async ({ token, user }) => {
      if (user) {
        token.id = user.id
        token.email = user.email
        token.name = user.name
      }

      return token
    },
    session({ session, token }) {
      if (token && session.user) {
        session.user.id = token.id as string
      }

      return session
    }
  },
  secret: env.NEXTAUTH_SECRET,
  providers: [
    CredentialsProvider({
      credentials: {
        email: { label: "Email", type: "text", placeholder: "email@email.com" },
        password: { label: "Password", type: "password" }
      },
      authorize: async credentials => {
        if (!credentials || !credentials.email || !credentials.password) return null
        const user = await prisma.user.findUnique({ where: { email: credentials.email } })
        if (user === null) return null

        const isValidPassword = await verify(user.password, credentials.password)
        if (isValidPassword === false) return null

        return {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role
        }
      }
    })
  ]
}

export default NextAuth(authOptions)
