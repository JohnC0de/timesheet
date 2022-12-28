import { useSession } from "next-auth/react"
import Link from "next/link"

export const AccountMenu = () => {
  const user = useSession()
  if (user.status === "unauthenticated")
    return (
      <div className="absolute right-2 top-2 flex flex-col gap-2 ">
        <Link href="/api/auth/signin" className="btn w-24 text-center">
          Sign In
        </Link>
        <Link href="/register" className="btn w-24 text-center">
          Register
        </Link>
      </div>
    )
  return null
}
