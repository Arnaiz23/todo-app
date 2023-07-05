import { useState } from "react"
import { useLocation } from "wouter"

import FormContainer from "./FormContainer.jsx"
import { loginService } from "../services/users.services"

const FormLogin = () => {
  const [login, setLogin] = useState({
    email: "",
    password: "",
  })
  const [, setLocation] = useLocation()

  const handleChange = (event) => {
    setLogin({
      ...login,
      [event.target.name]: event.target.value,
    })
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    if (login.email === "" || login.password === "") return

    try {
      const json = await loginService({ login })
      localStorage.setItem("token", json.data)
      setLocation("/")
    } catch (error) {
      console.error(error.message)
    }
  }

  return (
    <FormContainer handleSubmit={handleSubmit} buttonTitle={"Login"}>
      <div className="flex flex-col justify-start items-start gap-1 w-[90%]">
        <label htmlFor="email" title="required">
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
        <label htmlFor="password" title="required">
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
    </FormContainer>
  )
}

export default FormLogin
