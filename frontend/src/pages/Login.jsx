import { Link } from "wouter"
import ButtonGoHome from "../components/ButtonGoHome"
import FormLogin from "../components/FormLogin"

const Login = () => {
  return (
    <>
      <ButtonGoHome />
      <div className="flex justify-center items-center w-full h-screen">
        <div className="grid grid-rows-[20%_60%_20%] place-items-center content-center gap-3 bg-zinc-900 w-[80%] sm:w-80 py-5">
          <h2 className="text-3xl font-bold">Login</h2>
          <FormLogin />
          <Link href="/register" className="text-sm hover:underline">
            Don't have an account?
          </Link>
        </div>
      </div>
    </>
  )
}

export default Login

// Flex

//   <div className="flex flex-col justify-center items-center gap-3 bg-zinc-900 w-[80%] sm:w-80 h-80">

// grid

// <div className="grid grid-rows-[20%_60%_20%] place-items-center content-center gap-3 bg-zinc-900 w-[80%] sm:w-80 min-h-[20rem]">
