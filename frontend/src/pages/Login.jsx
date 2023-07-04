import { Link } from "wouter"

const Login = () => {
  return (
    <>
      <Link href="/">
        <a className="absolute top-10 left-5 border border-white rounded-full p-2 cursor-pointer">
          <img src="/arrow-left.svg" alt="Go to home" className="w-5" />
        </a>
      </Link>
    </>
  )
}

export default Login
