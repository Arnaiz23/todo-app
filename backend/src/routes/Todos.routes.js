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

todoRouter.get("/:id", async (req, res) => {
  const { id } = req.params
  const { row, err } = await getTodoWithId({ id })

  if (err) {
    return res.status(404).json({
      Error: "Error with the SELECT query of the todos table",
    })
  }
  return res.status(200).json(row)
})

todoRouter.post("/", async (req, res) => {
  const { title, user_id } = req.body
  const { row, err } = await newTodo({ title, user_id })

  if (err) {
    return res.status(404).json({
      Error: err,
    })
  }

  return res.status(200).json(row)
})

todoRouter.delete("/:id", async (req, res) => {
  const { id } = req.params

  const { data, err } = await deleteTodoWithId({ id })

  if (err) {
    return res.status(404).json({
      Error: err,
    })
  }

  return res.status(200).json({ data })
})

todoRouter.put("/:id", async (req, res) => {
  const { id } = req.params
  const { title } = req.body

  if (!title)
    return res.status(400).json({
      Error: "Title is required!!!",
    })

  const { row, err } = await updateTitleTodo({ id, title })

  if (err) {
    return res.status(404).json({
      Error: "Error with the UPDATE title query of the todos table",
    })
  }

  return res.status(200).json(row)
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
