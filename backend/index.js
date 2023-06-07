import express from "express"
import dotenv from "dotenv"
import cors from "cors"

import { todoRouter } from "./src/routes/Todos.routes.js"

dotenv.config()

const app = express()
const PORT = process.env.BACKEND_PORT || 3000

app.use(cors())
app.use(express.json())

app.get("/api/", (_, res) => {
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

app.use("/api/todos", todoRouter)

app.listen(PORT, () => {
	console.log(`The server is listening in the port: ${PORT}`)
})
