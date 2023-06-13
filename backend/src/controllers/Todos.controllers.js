import {
  deleteTodoWithId,
  getAllTodos,
  getTodoWithId,
  newTodo,
  toggleCompletedTodos,
  updateTitleTodo,
} from "../services/Todos.services.js"
import { PropertyRequiredError } from "../libs/customErrors.js"

export async function getAllTodosOfUser(req, res) {
  const user = req.user

  try {
    const data = await getAllTodos({ id: user.id })
    return res.status(200).json({ data })
  } catch (err) {
    return res.status(err.statusCode).json({ error: err.message })
  }
}

export async function getTodoWithIdOfUser(req, res) {
  const { id } = req.params
  const user = req.user

  try {
    const data = await getTodoWithId({ id, user })

    return res.status(200).json({ data })
  } catch (err) {
    return res.status(404).json({
      error: err.message,
    })
  }
}

export async function createNewTodo(req, res) {
  const { title } = req.body
  const user = req.user

  try {
    if (!title) throw new PropertyRequiredError("title")

    const data = await newTodo({ title, user })

    return res.status(201).json({ data })
  } catch (err) {
    return res.status(err.statusCode).json({
      error: err.message,
    })
  }
}

export async function deleteTodo(req, res) {
  const { id } = req.params
  const user = req.user

  try {
    const data = await deleteTodoWithId({ id, user_id: user.id })

    return res.status(200).json({ data })
  } catch (err) {
    return res.status(404).json({
      error: err.message,
    })
  }
}

export async function updateTodo(req, res) {
  const { id } = req.params
  const { title } = req.body
  const user = req.user

  try {
    if (!title) throw new PropertyRequiredError("title")

    const data = await updateTitleTodo({ id, title, user })

    return res.status(200).json({ data })
  } catch (err) {
    const statusCode = err.statusCode ? err.statusCode : 500
    return res.status(statusCode).json({
      error: err.message,
    })
  }
}

export async function updateTodoCompleted(req, res) {
  const { id } = req.params
  const { completed } = req.body
  const user = req.user

  try {
    if (!completed && typeof completed !== "boolean")
      throw new PropertyRequiredError("completed")

    if (typeof completed !== "boolean")
      return res
        .status(400)
        .json({ error: "The completed value isn't boolean" })

    const data = await toggleCompletedTodos({ id, completed, user })

    return res.status(200).json({ data })
  } catch (err) {
    const statusCode = err.statusCode ? err.statusCode : 404
    return res.status(statusCode).json({
      error: err.message,
    })
  }
}
