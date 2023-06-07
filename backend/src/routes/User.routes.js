import { Router } from "express"
import jwt from "jsonwebtoken"

import { getOneUser } from "../services/User.services.js"
import { SECRET_KEY } from "../globalVariables.js"
import { verifyToken } from "../middleweares/middleweares.js"

const usersRouter = Router()

usersRouter.get("/login", async (req, res) => {
	const { email, password, remember } = req.body

	if (!email || !password)
		return res
			.status(400)
			.json({ error: "The email or password field is required!!!" })

	const { user, err } = await getOneUser({ email, password })

	if (err) return res.status(404).json({ error: err })

	let rememberTime

	remember ? (rememberTime = "1d") : (rememberTime = "2h")

	const payload = { name: user.name, email: user.email }
	const token = jwt.sign(payload, SECRET_KEY, { expiresIn: rememberTime })

	return res.json({ token })
})

usersRouter.get("/", verifyToken, async (req, res) => {
	return res.sendStatus(200)
})

export { usersRouter }
