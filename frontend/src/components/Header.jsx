import { useState } from "react"
import { Link } from "wouter"

const Header = () => {
  const [userLogged, setUserLogged] = useState(
    localStorage.getItem("token") ? true : false
  )

  return (
    <header className="p-4 border-b border-b-white w-full flex justify-between items-center">
      <h3>Icon</h3>
      {userLogged ? (
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
      ) : (
        <Link href="/login" className="py-2 px-4 bg-cyan-700 rounded font-bold">
          Login
        </Link>
      )}
    </header>
  )
}

export default Header
