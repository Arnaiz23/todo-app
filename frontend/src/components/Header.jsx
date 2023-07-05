import { useEffect, useState } from "react"
import { Link } from "wouter"

import { getUserData } from "../services/users.services"

const Header = () => {
  // TODO: This userLogged is in the Context for change all the conditions in Home Component
  const [userLogged, setUserLogged] = useState(
    localStorage.getItem("token") ? true : false
  )
  const [user, setUser] = useState({})

  useEffect(() => {
    if (!userLogged) return

    ;(async () => {
      try {
        const json = await getUserData()
        setUser(json.data)
      } catch (error) {
        console.error(error.message)
      }
    })()
  }, [userLogged])

  return (
    <header className="p-4 border-b border-b-white w-full flex justify-between items-center">
      <h3>Icon</h3>
      {userLogged ? (
        <>
          <h2 className="text-xl">
            Welcome <span className="font-bold capitalize">{user.name}</span>
          </h2>
          <button
            href="/logout"
            className="py-2 px-4 bg-red-700 rounded font-bold"
            onClick={() => {
              localStorage.removeItem("token")
              setUserLogged(false)
            }}
          >
            Logout
          </button>
        </>
      ) : (
        <Link href="/login" className="py-2 px-4 bg-cyan-700 rounded font-bold">
          Login
        </Link>
      )}
    </header>
  )
}

export default Header
