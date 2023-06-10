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
    const { rows } = await getAllTodos({ id: user.id })
    return res.status(200).json({ rows })
  } catch (err) {
    return res.sendStatus(500)
  }
})

todoRouter.get("/:id", verifyToken, async (req, res) => {
  const { id } = req.params
  const user = req.user

  try {
    const row = await getTodoWithId({ id, user })
    return res.status(200).json(row)
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
    const row = await newTodo({ title, user })
    return res.status(200).json(row)
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
      Error: "Title is required!!!",
    })

  try {
    const row = await updateTitleTodo({ id, title, user })

    return res.status(200).json(row)
  } catch (err) {
    return res.status(404).json({
      Error: "Error with the UPDATE title query of the todos table",
    })
  }
})

// Patch: update completed
todoRouter.patch("/:id", async (req, res) => {
  const { id } = req.params
  const { completed } = req.body

  if (typeof completed === "undefined")
    return res
      .status(400)
      .json({ Error: "The new completed field is required!!!" })

  if (typeof completed !== "boolean")
    return res.status(400).json({ Error: "The completed value isn't boolean" })

  const { row, err } = await toggleCompletedTodos({ id, completed })

  if (err) {
    return res.status(404).json({
      error: err,
    })
  }

  return res.status(200).json(row)
})

export { todoRouter }
