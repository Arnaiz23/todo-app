import { Router } from "express"
import {
  deleteTodoWithId,
  getAllTodos,
  newTodo,
  updateTitleTodo,
} from "../services/services.js"

const router = Router()

router.get("/", (req, res) => {
  const routes = [
    {
      method: "GET",
      route: "/todos",
      description: "Get all the TODOS",
    },
    {
      method: "POST",
      route: "/todos",
      description: "Create a new TODO",
    },
  ]

  return res.json(routes)
})

router.get("/todos", async (req, res) => {
  const { rows, err } = await getAllTodos()

  if (err) {
    return res.status(404).json({
      Error: "Error with the SELECT query of the todos table",
    })
  }
  return res.status(200).json(rows)
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
      Error: "Error with the DELETE query of the todos table",
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

export { router }
