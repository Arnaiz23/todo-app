import ButtonGoHome from "../components/ButtonGoHome"
import FormLogin from "../components/FormLogin"

const Login = () => {
  return (
    <>
      <ButtonGoHome />
      <div className="flex justify-center items-center w-full h-screen">
        <div className="flex flex-col justify-center items-center gap-3 bg-zinc-900 w-[80%] sm:w-80 h-80">
          <h1 className="text-3xl font-bold">Login</h1>
          <FormLogin />
        </div>
      </div>
    </>
  )
}

export default Login
