import { useState } from "react"

const FormLogin = ({ button }) => {
  const [data, setData] = useState({ email: "", password: "" })

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log(data)
  }

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value })
  }

  return (
    <form
      className="flex flex-col justify-center items-center gap-3 w-[90%]"
      onSubmit={handleSubmit}
    >
      <label className="flex flex-col justify-start items-start gap-1 w-[90%]">
        Email
        <input
          type="email"
          name="email"
          className="rounded p-1 text-black w-full"
          onChange={handleChange}
        />
      </label>
      <label className="flex flex-col justify-start items-start gap-1 w-[90%]">
        Password
        <input
          type="password"
          name="password"
          className="rounded p-1 text-black w-full"
          onChange={handleChange}
        />
      </label>
      <button type="submit" className="bg-cyan-700 p-2 rounded">
        {button}
      </button>
    </form>
  )
}

export default FormLogin
