import { useEffect, useState } from "react"

import Header from "../components/Header.jsx"
import { getTodos } from "../services/todos.services.js"

const Home = () => {
  const login = localStorage.getItem("token") ? true : false

  const [todos, setTodos] = useState([])

  useEffect(() => {
    if (!localStorage.getItem("token")) return

    ;(async () => {
      const json = await getTodos()
      setTodos(json.data)
    })()
  }, [])

  return (
    <>
      <Header />
      <main className="flex justify-center items-center grow h-auto">
        {login ? (
          <section className="flex flex-col bg-black min-w-[40%] lg:min-w-[25rem]">
            <input
              type="text"
              name="newtodo"
              id="newtodo"
              placeholder="Write a new TODO"
              className="bg-transparent p-3 text-center outline-none text-xl text-slate-400"
            />
            <ul className="overflow-y-scroll max-h-[75vh]">
              {todos.map((todo) => (
                <li
                  key={todo.id}
                  className="flex justify-between items-center p-3 py-5 border-b border-b-white group"
                >
                  <input
                    type="checkbox"
                    checked={todo.completed === 0 ? false : true}
                    onChange={() => {}}
                  />
                  <p>{todo.title}</p>
                  <button className="invisible group-hover:visible">X</button>
                </li>
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
