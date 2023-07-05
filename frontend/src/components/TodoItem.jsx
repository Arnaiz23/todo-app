import { deleteTodo } from "../services/todos.services"

const TodoItem = ({ id, completed, title }) => {
  const handleDelete = async () => {
    try {
      await deleteTodo({ id })
      // TODO: return the new array to the context
    } catch (error) {
      console.error(error.message)
    }
  }

  return (
    <li className="flex justify-between items-center p-3 py-5 border-b border-b-white group">
      <input
        type="checkbox"
        checked={completed === 0 ? false : true}
        onChange={() => {}}
      />
      <p>{title}</p>
      <button className="invisible group-hover:visible" onClick={handleDelete}>
        X
      </button>
    </li>
  )
}

export default TodoItem
