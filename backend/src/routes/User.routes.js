import { Router } from "express"
import { verifyToken } from "../middleweares/middleweares.js"

import {
  getUserData,
  login,
  registerNewUser,
} from "../controllers/Users.controllers.js"

const usersRouter = Router()

usersRouter.get("/login", login)

usersRouter.post("/register", registerNewUser)

usersRouter.get("/users", verifyToken, getUserData)

export { usersRouter }
