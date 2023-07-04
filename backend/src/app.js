import express from "express"
import cors from "cors"
import morgan from "morgan"
import swaggerUiExpress from "swagger-ui-express"

import { todoRouter } from "./routes/Todos.routes.js"
import { usersRouter } from "./routes/User.routes.js"
import swaggerDocument from "../swagger.json" assert { type: "json" }

const app = express()

app.use(cors())
app.use(express.json())
app.use(morgan("dev"))

app.use(
  "/docs",
  swaggerUiExpress.serve,
  swaggerUiExpress.setup(swaggerDocument)
)
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

app.use("/api", todoRouter)
app.use("/api", usersRouter)

export { app }
