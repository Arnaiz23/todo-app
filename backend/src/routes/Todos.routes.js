import { Router } from "express"

import {
  deleteTodoWithId,
  getAllTodos,
  getTodoWithId,
  newTodo,
  toggleCompletedTodos,
  updateTitleTodo,
} from "../services/Todos.services.js"
import { verifyToken } from "../middleweares/middleweares.js"

const todoRouter = Router()

todoRouter.get("/", verifyToken, async (req, res) => {
  const user = req.user

  try {
    const data = await getAllTodos({ id: user.id })
    return res.status(200).json({ data })
  } catch (err) {
    return res.sendStatus(500)
  }
})

todoRouter.get("/:id", verifyToken, async (req, res) => {
  const { id } = req.params
  const user = req.user

  try {
    const data = await getTodoWithId({ id, user })

    return res.status(200).json({ data })
  } catch (err) {
    return res.status(404).json({
      error: "Error with the SELECT query of the todos table",
    })
  }
})

todoRouter.post("/", verifyToken, async (req, res) => {
  const { title } = req.body
  const user = req.user

  try {
    const data = await newTodo({ title, user })

    return res.status(200).json({ data })
  } catch (err) {
    return res.status(404).json({
      error: err,
    })
  }
})

todoRouter.delete("/:id", verifyToken, async (req, res) => {
  const { id } = req.params
  const user = req.user

  try {
    const data = await deleteTodoWithId({ id, user_id: user.id })

    return res.status(200).json({ data })
  } catch (err) {
    return res.status(404).json({
      error: err,
    })
  }
})

todoRouter.put("/:id", verifyToken, async (req, res) => {
  const { id } = req.params
  const { title } = req.body
  const user = req.user

  if (!title)
    return res.status(400).json({
      error: "Title is required!!!",
    })

  try {
    const data = await updateTitleTodo({ id, title, user })

    return res.status(200).json({ data })
  } catch (err) {
    return res.status(404).json({
      error: "Error with the UPDATE title query of the todos table",
    })
  }
})

// Patch: update completed
todoRouter.patch("/:id", verifyToken, async (req, res) => {
  const { id } = req.params
  const { completed } = req.body
  const user = req.user

  if (typeof completed === "undefined")
    return res
      .status(400)
      .json({ error: "The new completed field is required!!!" })

  if (typeof completed !== "boolean")
    return res.status(400).json({ Error: "The completed value isn't boolean" })

  try {
    const data = await toggleCompletedTodos({ id, completed, user })

    return res.status(200).json({ data })
  } catch (err) {
    return res.status(404).json({
      error: err,
    })
  }
})

export { todoRouter }
