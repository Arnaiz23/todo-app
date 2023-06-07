import express from "express"
import cors from "cors"

import { todoRouter } from "./src/routes/Todos.routes.js"
import { usersRouter } from "./src/routes/User.routes.js"
import { PORT } from "./src/globalVariables.js"

const app = express()

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
		{
			method: "GET",
			route: "/users/login",
			description: "Login and return the user token",
		},
		{
			method: "GET",
			route: "/users",
			description: "Get the user data with the token",
		},
	]

	return res.json(routes)
})

app.use("/api/todos", todoRouter)
app.use("/api/users", usersRouter)

app.listen(PORT, () => {
	console.log(`The server is listening in the port: ${PORT}`)
})
