import { useState } from "react"
import FormContainer from "./FormContainer"
import { registerService } from "../services/users.services"
import { useLocation } from "wouter"
import { useStoreWeb } from "../context/store"
import { UserExistsError } from "../libs/customErrors"

const FormRegister = () => {
  const [register, setRegister] = useState({
    email: "",
    password: "",
    name: "",
  })
  const [error, setError] = useState({
    email: false,
    password: false,
    name: false,
  })
  const [userExists, setUserExists] = useState(false)

  const [, setLocation] = useLocation()

  const { setLogin } = useStoreWeb()

  const handleChange = (event) => {
    setRegister({
      ...register,
      [event.target.name]: event.target.value,
    })
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    if (!register.name || !register.email || !register.password) {
      setError({
        name: Boolean(!register.name),
        email: Boolean(!register.email),
        password: Boolean(!register.password),
      })
      return
    }

    try {
      const json = await registerService({ register })
      localStorage.setItem("token", json.data)
      setLogin()
      setLocation("/")
    } catch (error) {
      // TODO: show the client errors. Maybe with custom Errors.
      if(error instanceof UserExistsError) {
        setUserExists(true)
        return
      }
      console.error(error.message)
    }
  }

  return (
    <FormContainer handleSubmit={handleSubmit} buttonTitle={"Register"}>
      <div className="flex flex-col justify-start items-start gap-1 w-[90%]">
        <label htmlFor="username" title="required">
          Name <span className="text-red-600">*</span>
        </label>
        <input
          type="text"
          name="name"
          id="name"
          className={`rounded p-1 text-black w-full ${
            error.name ? "border-2 border-red-500" : ""
          }`}
          onChange={handleChange}
          placeholder="test"
          required
        />
      </div>
      <div className="flex flex-col justify-start items-start gap-1 w-[90%]">
        <label htmlFor="email" title="required">
          Email <span className="text-red-600">*</span>
        </label>
        <input
          type="email"
          name="email"
          id="email"
          className={`rounded p-1 text-black w-full ${
            error.email ? "border-2 border-red-500" : ""
          }`}
          onChange={handleChange}
          placeholder="test@gmail.com"
          required
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
          className={`rounded p-1 text-black w-full ${
            error.password ? "border-2 border-red-500" : ""
          }`}
          onChange={handleChange}
          placeholder="*********"
          minLength={6}
          required
        />
      </div>
      {userExists && <h3 className="text-red-700">This email is not available!!!</h3>}
    </FormContainer>
  )
}

export default FormRegister
