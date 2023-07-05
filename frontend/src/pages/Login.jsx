import { useState } from "react"
import { Link } from "wouter"

const Login = () => {
  const [login, setLogin] = useState({
    email: "",
    password: "",
  })

  const handleChange = (event) => {
    setLogin({
      ...login,
      [event.target.name]: event.target.value,
    })
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    console.log(login)
  }

  return (
    <>
      <Link href="/">
        <a className="absolute top-10 left-5 border border-white rounded-full p-2 cursor-pointer">
          <img src="/arrow-left.svg" alt="Go to home" className="w-5" />
        </a>
      </Link>

      <div className="flex justify-center items-center w-full h-screen">
        <div className="flex flex-col justify-center items-center gap-3 bg-zinc-900 w-[80%] sm:w-80 h-80">
          <h1 className="text-3xl font-bold">Login</h1>
          <form
            className="flex flex-col justify-center items-center gap-3 w-[90%]"
            onSubmit={handleSubmit}
          >
            <div className="flex flex-col justify-start items-start gap-1 w-[90%]">
              <label htmlFor="email">
                Email <span className="text-red-600">*</span>
              </label>
              <input
                type="email"
                name="email"
                id="email"
                className="rounded p-1 text-black w-full"
                onChange={handleChange}
                placeholder="test@gmail.com"
              />
            </div>
            <div className="flex flex-col justify-start items-start gap-1 w-[90%]">
              <label htmlFor="password">
                Password <span className="text-red-600">*</span>
              </label>
              <input
                type="password"
                name="password"
                id="password"
                className="rounded p-1 text-black w-full"
                onChange={handleChange}
                placeholder="*********"
                minLength={6}
              />
            </div>
            <button type="submit" className="bg-cyan-700 p-2 rounded">
              Login
            </button>
          </form>
        </div>
      </div>
    </>
  )
}

export default Login
