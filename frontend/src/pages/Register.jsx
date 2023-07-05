import { Link } from "wouter"

import ButtonGoHome from "../components/ButtonGoHome"
import FormRegister from "../components/FormRegister"

const Register = () => {
  return (
    <>
      <ButtonGoHome />
      <div className="flex justify-center items-center w-full h-screen">
        <div className="flex flex-col justify-center items-center gap-3 bg-zinc-900 w-[80%] sm:w-80 py-5">
          <h2 className="text-3xl font-bold">Sign Up</h2>
          <FormRegister />
          <Link href="/login" className="text-sm hover:underline">
            Already have an account?
          </Link>
        </div>
      </div>
    </>
  )
}

export default Register
