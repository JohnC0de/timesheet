import { type NextPage } from "next"
import { useSession } from "next-auth/react"
import Router from "next/router"
import { FloatingMenu } from "../components/NavMenu/FloatingMenu"

const Home: NextPage = () => {
  const session = useSession()
  if (session.status === "loading") return <p>Loading...</p>
  else if (session.status === "unauthenticated") Router.push("/login")

  return (
    <>
      <FloatingMenu />
      <h1 className="text-4xl font-bold text-white">Welcome, {session.data?.user?.name}!</h1>
      <p className="text-2xl text-white">You are now logged in.</p>
      <p className="text-2xl text-white">You can now create attendance records.</p>
    </>
  )
}

export default Home
