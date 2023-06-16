import { Router } from "express"
import { verifyToken } from "../middleweares/middleweares.js"

import {
  getUserData,
  login,
  registerNewUser,
} from "../controllers/Users.controllers.js"
import { loginSchema, registerSchema } from "../schemas/user.schema.js"
import { validateSchema } from "../middleweares/validator.middleweare.js"

const usersRouter = Router()

usersRouter.get("/login", validateSchema(loginSchema), login)

usersRouter.post("/register", validateSchema(registerSchema), registerNewUser)

usersRouter.get("/users", verifyToken, getUserData)

export { usersRouter }
