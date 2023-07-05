import { useState } from "react"
import FormContainer from "./FormContainer"
import { registerService } from "../services/users.services"
import { useLocation } from "wouter"

const FormRegister = () => {
  const [register, setRegister] = useState({
    email: "",
    password: "",
    name: "",
  })
  const [, setLocation] = useLocation()

  const handleChange = (event) => {
    setRegister({
      ...register,
      [event.target.name]: event.target.value,
    })
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    try {
      const json = await registerService({ register })
      localStorage.setItem("token", json.data)
      setLocation("/")
    } catch (error) {
      // TODO: show the client errors. Maybe with custom Errors.
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
          className="rounded p-1 text-black w-full"
          onChange={handleChange}
          placeholder="test"
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

export default FormRegister
