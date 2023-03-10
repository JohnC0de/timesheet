import { type AppType } from "next/app"
import { type Session } from "next-auth"
import { SessionProvider } from "next-auth/react"

import { trpc } from "../utils/trpc"

import "../styles/globals.css"
import "primereact/resources/themes/vela-blue/theme.css"
import "primereact/resources/primereact.min.css"
import "primeicons/primeicons.css"

const MyApp: AppType<{ session: Session | null }> = ({ Component, pageProps: { session, ...pageProps } }) => {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gray-900">
      <SessionProvider session={session}>
        <Component {...pageProps} />
      </SessionProvider>
    </main>
  )
}

export default trpc.withTRPC(MyApp)
