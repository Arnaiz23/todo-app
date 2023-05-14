import { Router } from "express"
import { pool } from "../database.js"

const router = Router()

router.get("/", (req, res) => {
	res.send("Hello World!!")
})

router.get("/test", async (req, res) => {
	const query = await pool.query(`SELECT * FROM todos`)
	res.json(query)
})

export { router }
