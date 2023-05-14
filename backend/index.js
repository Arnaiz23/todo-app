import express from "express"
import dotenv from "dotenv"
import cors from "cors"

dotenv.config()

const app = express()
const PORT = process.env.BACKEND_PORT

app.use(cors())

app.listen(PORT, () => {
	console.log(`The server is listening in the port: ${PORT}`)
})
