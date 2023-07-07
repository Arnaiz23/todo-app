import { useEffect } from "react"
import { Link } from "wouter"

import { getUserData } from "../services/users.services"
import { useStoreWeb } from "../context/store"

const Header = () => {
  const { setUserInfo, userInfo, userLogged, setLogout } = useStoreWeb()

  useEffect(() => {
    if (!userLogged) return
    ;(async () => {
      try {
        const json = await getUserData()
        setUserInfo(json.data)
      } catch (error) {
        // TODO: check if the error is a 401 and execute the setLogout
        setLogout()
        console.error(error.message)
      }
    })()
  }, [userLogged, setUserInfo, setLogout])

  return (
    <header className="p-4 border-b border-b-white w-full flex justify-between items-center">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="50"
        height="50"
        viewBox="0 0 24 24"
      >
        <path
          fill="white"
          d="M6.104 5.91c.584.474.802.438 1.898.365l10.332-.62c.22 0 .037-.22-.036-.256l-1.716-1.24c-.329-.255-.767-.548-1.606-.475l-10.005.73c-.364.036-.437.219-.292.365l1.425 1.13Zm.62 2.408v10.87c0 .585.292.803.95.767l11.354-.657c.657-.036.73-.438.73-.912V7.588c0-.474-.182-.73-.584-.693l-11.866.693c-.438.036-.584.255-.584.73Zm11.21.583c.072.328 0 .657-.33.694l-.547.109v8.025c-.475.256-.913.402-1.278.402c-.584 0-.73-.183-1.168-.73l-3.579-5.618v5.436l1.133.255s0 .657-.914.657l-2.519.146c-.073-.146 0-.51.256-.584l.657-.182v-7.187l-.913-.073c-.073-.329.11-.803.621-.84l2.702-.181l3.724 5.69V9.887l-.95-.109c-.072-.402.22-.693.585-.73l2.52-.146ZM4.131 3.429l10.406-.766c1.277-.11 1.606-.036 2.41.547l3.321 2.335c.548.401.731.51.731.948v12.805c0 .803-.292 1.277-1.314 1.35l-12.085.73c-.767.036-1.132-.073-1.534-.584L3.62 17.62c-.438-.584-.62-1.021-.62-1.533V4.706c0-.657.292-1.204 1.132-1.277Z"
        />
      </svg>
      {userLogged ? (
        <>
          <h2 className="text-xl">
            Welcome{" "}
            <span className="font-bold capitalize">{userInfo.name}</span>
          </h2>
          <button
            href="/logout"
            className="py-2 px-4 bg-red-700 rounded font-bold"
            onClick={() => {
              localStorage.removeItem("token")
              setLogout()
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
