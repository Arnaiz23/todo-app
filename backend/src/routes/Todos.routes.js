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
import { validateSchema } from "../middleweares/validator.middleweare.js"
import {
  todoCompletedSchema,
  todoTitleSchema,
} from "../schemas/todos.schema.js"

const todoRouter = Router()

todoRouter.get("/todos", verifyToken, getAllTodosOfUser)

todoRouter.get("/todos/:id", verifyToken, getTodoWithIdOfUser)

todoRouter.post(
  "/todos",
  verifyToken,
  validateSchema(todoTitleSchema),
  createNewTodo
)

todoRouter.delete("/todos/:id", verifyToken, deleteTodo)

todoRouter.put(
  "/todos/:id",
  verifyToken,
  validateSchema(todoTitleSchema),
  updateTodo
)

// Patch: update completed
todoRouter.patch(
  "/todos/:id",
  verifyToken,
  validateSchema(todoCompletedSchema),
  updateTodoCompleted
)

export { todoRouter }
