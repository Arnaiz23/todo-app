import { Router } from "express"
import { getAllTodos } from "../controllers/controllers.js"

const router = Router()

router.get("/", (req, res) => {
	const routes = {
		"/todos": "Get all the TODOS",
	}

	return res.json(routes)
})

router.get("/todos", async (req, res) => {
	const rows = await getAllTodos()
	return res.json(rows)
})

export { router }
