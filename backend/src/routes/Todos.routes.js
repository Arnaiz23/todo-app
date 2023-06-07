import { Router } from "express"
import {
	deleteTodoWithId,
	getTodoWithId,
	newTodo,
	toggleCompletedTodos,
	updateTitleTodo,
} from "../services/Todos.services.js"

const todoRouter = Router()

todoRouter.get("/todos/:id", async (req, res) => {
	const { id } = req.params
	const { row, err } = await getTodoWithId({ id })

	if (err) {
		return res.status(404).json({
			Error: "Error with the SELECT query of the todos table",
		})
	}
	return res.status(200).json(row)
})

todoRouter.post("/todos", async (req, res) => {
	const { title, user_id } = req.body
	const { row, err } = await newTodo({ title, user_id })

	if (err) {
		return res.status(404).json({
			Error: err,
		})
	}

	return res.status(200).json(row)
})

todoRouter.delete("/todos/:id", async (req, res) => {
	const { id } = req.params

	const { data, err } = await deleteTodoWithId({ id })

	if (err) {
		return res.status(404).json({
			Error: err,
		})
	}

	return res.status(200).json({ data })
})

todoRouter.put("/todos/:id", async (req, res) => {
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
todoRouter.patch("/todos/:id", async (req, res) => {
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

export { todoRouter }
