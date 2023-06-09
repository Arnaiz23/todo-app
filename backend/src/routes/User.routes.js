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

  try {
    const { user } = await getOneUser({ email, password })

    let rememberTime

    remember ? (rememberTime = "1d") : (rememberTime = "2h")

    const payload = { id: user.id, name: user.name, email: user.email }
    const token = jwt.sign(payload, SECRET_KEY, { expiresIn: rememberTime })

    return res.json({ token })
  } catch (err) {
    return res.status(404).json({ error: err })
  }
})

usersRouter.get("/", verifyToken, async (req, res) => {
  return res.sendStatus(200)
})

export { usersRouter }
