import { changeCompleted, deleteTodo } from "../services/todos.services"

const TodoItem = ({ id, completed, title, todos, updateTodos }) => {
  const handleDelete = async () => {
    try {
      await deleteTodo({ id })
      // TODO: return the new array to the context
      const todosUpdated = todos.filter((item) => item.id !== id)
      updateTodos(todosUpdated)
    } catch (error) {
      console.error(error.message)
    }
  }

  return (
    <li className="flex justify-between items-center p-3 py-5 border-b border-b-white group">
      <input
        type="checkbox"
        defaultChecked={completed === 0 ? false : true}
        onChange={async (e) => {
          // console.log(e.target.checked)
          const updatedObject = { completed: e.target.checked }

          try {
            await changeCompleted({ updatedObject, id })
            const todosUpdated = todos.map((todo) => {
              if (todo.id === id) {
                const newValue = e.target.checked
                todo.completed =  newValue ? 1 : 0
              }
              return todo
            })
            updateTodos(todosUpdated)
          } catch (error) {
            e.target.checked = !e.target.checked
            console.error(error.message)
          }
        }}
      />
      <p>{title}</p>
      <button className="invisible group-hover:visible" onClick={handleDelete}>
        X
      </button>
    </li>
  )
}

export default TodoItem
