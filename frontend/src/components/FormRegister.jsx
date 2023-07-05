import { useState } from "react"

const FormRegister = () => {
  const [register, setRegister] = useState({
    email: "",
    password: "",
    name: ""
  })

  const handleChange = (event) => {
    setRegister({
      ...register,
      [event.target.name]: event.target.value,
    })
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    console.log(register)
  }

  return (
    <form
      className="flex flex-col justify-center items-center gap-3 w-[90%]"
      onSubmit={handleSubmit}
    >
      <div className="flex flex-col justify-start items-start gap-1 w-[90%]">
        <label htmlFor="username">
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
        Register
      </button>
    </form>
  )
}

export default FormRegister
