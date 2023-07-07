import { useState } from "react"
import { createTodo } from "../services/todos.services"
import { useStoreWeb } from "../context/store"

const FormNewTodo = () => {
  const [title, setTitle] = useState("")

  const {todos, setTodos} = useStoreWeb()

  return (
    <form
      className="bg-transparent p-3 text-xl text-slate-400"
      onSubmit={async (e) => {
        e.preventDefault()

        if (title.length === 0) return

        const newTodo = { title }

        try {
          const json = await createTodo({ newTodo })
          setTodos([...todos, json.data])
          setTitle("")
        } catch (error) {
          console.error(error.message)
        }
      }}
    >
      <input
        type="text"
        name="newtodo"
        id="newtodo"
        placeholder="Write a new TODO"
        className="bg-transparent w-full outline-none text-center"
        onChange={(e) => {
          setTitle(e.target.value)
        }}
        value={title}
      />
    </form>
  )
}

export default FormNewTodo
