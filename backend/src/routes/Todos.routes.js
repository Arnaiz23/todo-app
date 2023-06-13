import { Router } from "express"

import { verifyToken } from "../middleweares/middleweares.js"
import {
  createNewTodo,
  deleteTodo,
  getAllTodosOfUser,
  getTodoWithIdOfUser,
  updateTodo,
  updateTodoCompleted,
} from "../controllers/Todos.controllers.js"

const todoRouter = Router()

todoRouter.get("/todos", verifyToken, getAllTodosOfUser)

todoRouter.get("/todos/:id", verifyToken, getTodoWithIdOfUser)

todoRouter.post("/todos", verifyToken, createNewTodo)

todoRouter.delete("/todos/:id", verifyToken, deleteTodo)

todoRouter.put("/todos/:id", verifyToken, updateTodo)

// Patch: update completed
todoRouter.patch("/todos/:id", verifyToken, updateTodoCompleted)

export { todoRouter }
