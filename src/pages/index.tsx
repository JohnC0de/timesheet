import { type NextPage } from "next"
import { useSession } from "next-auth/react"
import { AccountMenu } from "../components/NavMenu/AccountMenu"
import { FloatingMenu } from "../components/NavMenu/FloatingMenu"

const Home: NextPage = () => {
  const user = useSession()
  return (
    <>
      <main className="relative flex min-h-screen flex-col items-center justify-center bg-gray-900 text-white">
        <FloatingMenu />
        <AccountMenu />
        <h1>Hello</h1>
        <p>{user.status}</p>
      </main>
    </>
  )
}

export default Home
