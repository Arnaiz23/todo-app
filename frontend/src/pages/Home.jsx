import { useEffect, useState } from "react"

import Header from "../components/Header.jsx"
import { getTodos } from "../services/todos.services.js"
import TodoItem from "../components/TodoItem.jsx"
import FormNewTodo from "../components/FormNewTodo.jsx"

const Home = () => {
  const login = localStorage.getItem("token") ? true : false

  const [todos, setTodos] = useState([])

  useEffect(() => {
    if (!localStorage.getItem("token")) return
    ;(async () => {
      try {
        const json = await getTodos()
        setTodos(json.data)
      } catch (error) {
        // TODO: handle the errors
        localStorage.removeItem("token")
        console.error(error.message)
      }
    })()
  }, [])

  return (
    <>
      <Header />
      <main className="flex justify-center items-center grow h-auto">
        {login ? (
          <section className="flex flex-col bg-black min-w-[40%] lg:min-w-[25rem]">
            <FormNewTodo todos={todos} updateTodos={setTodos} />
            <ul className="overflow-y-scroll max-h-[75vh]">
              {todos.map((todo) => (
                <TodoItem
                  key={todo.id}
                  completed={todo.completed}
                  title={todo.title}
                  id={todo.id}
                />
              ))}
            </ul>
            <footer className="py-2 px-4">
              <p className="text-sm">
                {todos.filter((todo) => todo.completed === 0).length} pending
                task
              </p>
            </footer>
          </section>
        ) : (
          <h2 className="text-3xl">Login and work with yours TODOS</h2>
        )}
      </main>
    </>
  )
}

export default Home
