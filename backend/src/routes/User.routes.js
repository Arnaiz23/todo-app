import { Router } from "express"
import { createToken } from "../libs/globalFunctions.js"
import { verifyToken } from "../middleweares/middleweares.js"

import { createUser, getOneUser } from "../services/User.services.js"

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
    const token = await createToken(payload, rememberTime)

    return res.json({ data: token })
  } catch (err) {
    return res.status(404).json({ error: err })
  }
})

usersRouter.post("/register", async (req, res) => {
  const { email, password, name } = req.body

  if (!email || !password || !name)
    return res
      .status(400)
      .json({ error: "The email, password and name fields are required!!!" })

  try {
    const newUserId = await createUser({ email, password, name })

    const payload = { id: newUserId, name, email }

    const token = await createToken(payload, "2h")

    return res.status(201).json({ data: token })
  } catch (err) {
    return res.status(409).json({ error: err.message })
  }
})

usersRouter.get("/users", verifyToken, async (req, res) => {
  const user = req.user

  try {
    const data = await getOneUser({ id: user.id })

    return res.status(200).json({ data })
  } catch (err) {
    return res.status(404).json({ error: err })
  }
})

export { usersRouter }
