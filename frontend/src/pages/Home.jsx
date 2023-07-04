import Header from "../components/Header.jsx"

const Home = () => {
  const title = "Prueba"
  const completed = true
  const login = localStorage.getItem("token") ? true : false
  const response = {
    data: [
      {
        id: 54,
        title: "Prueba",
        completed: 0,
        created_at: "2023-06-24T08:41:12.000Z",
        updated_at: "2023-06-24T08:41:12.000Z",
        user_id: 1,
      },
    ],
  }

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
              {response.data.map((todo) => (
                <li
                  key={todo}
                  className="flex justify-between items-center p-3 py-5 border-b border-b-white group"
                >
                  <input
                    type="checkbox"
                    checked={completed === 0 ? false : true}
                    onChange={() => {}}
                  />
                  <p>{title}</p>
                  <button className="invisible group-hover:visible">X</button>
                </li>
              ))}
            </ul>
            <footer className="py-2 px-4">
              <p className="text-sm">
                {response.data.filter((todo) => todo.completed === 0).length}{" "}
                pending task
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
