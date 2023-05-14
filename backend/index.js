import express from "express"
import dotenv from "dotenv"
import cors from "cors"

import { router } from "./src/routes/routes.js"

dotenv.config()

const app = express()
const PORT = process.env.BACKEND_PORT || 3000

app.use(cors())
app.use(express.json())
app.use("/api", router)

app.listen(PORT, () => {
	console.log(`The server is listening in the port: ${PORT}`)
})
