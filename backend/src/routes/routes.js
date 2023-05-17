import { Router } from "express"
import {
  deleteTodoWithId,
  getTodoWithId,
  newTodo,
  toggleCompletedTodos,
  updateTitleTodo,
} from "../services/services.js"

const router = Router()

router.get("/", (_, res) => {
  const routes = [
    {
      method: "GET",
      route: "/todos/:id",
      description: "Get a TODO with id",
    },
    {
      method: "POST",
      route: "/todos",
      description: "Create a new TODO",
    },
    {
      method: "DELETE",
      route: "/todos/:id",
      description: "Delete a TODO",
    },
    {
      method: "PUT",
      route: "/todos/:id",
      description: "Update the title of a TODO",
    },
    {
      method: "PATCH",
      route: "/todos/:id",
      description: "Toggle the completed field of a TODO",
    },
  ]

  return res.json(routes)
})

router.get("/todos/:id", async (req, res) => {
  const { id } = req.params
  const { row, err } = await getTodoWithId({ id })

  if (err) {
    return res.status(404).json({
      Error: "Error with the SELECT query of the todos table",
    })
  }
  return res.status(200).json(row)
})

router.post("/todos", async (req, res) => {
  const { title } = req.body
  const { row, err } = await newTodo({ title })

  if (err) {
    return res.status(404).json({
      Error: "Error with the INSERT query of the todos table",
    })
  }

  return res.status(200).json(row)
})

router.delete("/todos/:id", async (req, res) => {
  const { id } = req.params

  const { data, err } = await deleteTodoWithId({ id })

  if (err) {
    return res.status(404).json({
      Error: err,
    })
  }

  return res.status(200).json({ data })
})

router.put("/todos/:id", async (req, res) => {
  const { id } = req.params
  const { title } = req.body

  const { row, err } = await updateTitleTodo({ id, title })

  if (err) {
    return res.status(404).json({
      Error: "Error with the UPDATE title query of the todos table",
    })
  }

  return res.status(200).json(row)
})

// Patch: update completed
router.patch("/todos/:id", async (req, res) => {
  const { id } = req.params
  const { completed } = req.body

  const { row, err } = await toggleCompletedTodos({ id, completed })

  if (err) {
    return res.status(404).json({
      error: err,
    })
  }

  return res.status(200).json(row)
})

export { router }
