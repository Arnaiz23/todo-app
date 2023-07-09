import { useState } from "react"
import { useLocation } from "wouter"

import FormContainer from "./FormContainer.jsx"
import { loginService } from "../services/users.services"
import { useStoreWeb } from "../context/store.js"
import { EmailPasswordNotMatch } from "../libs/customErrors.js"

const FormLogin = () => {
  const [userInfo, setUserInfo] = useState({
    email: "",
    password: "",
  })
  const [errors, setErrors] = useState({
    email: false,
    password: false,
  })
  const [userError, setUserError] = useState(false)
  const [, setLocation] = useLocation()

  const { setLogin } = useStoreWeb()

  const handleChange = (event) => {
    setUserInfo({
      ...userInfo,
      [event.target.name]: event.target.value,
    })
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    if (userInfo.email === "" || userInfo.password === "") {
      setErrors({
        email: Boolean(!userInfo.email),
        password: Boolean(!userInfo.password),
      })
      return
    }

    setErrors({
      email: false,
      password: false,
    })

    try {
      const json = await loginService({ userInfo })
      localStorage.setItem("token", json.data)
      setLogin()
      setLocation("/")
    } catch (error) {
      if (error instanceof EmailPasswordNotMatch) {
        setUserError(true)
        return
      }
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
          className={`rounded p-1 text-black w-full ${
            errors.email ? "border-2 border-red-600" : ""
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
            errors.password ? "border-2 border-red-600" : ""
          }`}
          onChange={handleChange}
          placeholder="*********"
          minLength={6}
          required
        />
      </div>
      {userError && (
        <h3 className="text-red-700">Email or password doesn't match</h3>
      )}
    </FormContainer>
  )
}

export default FormLogin
