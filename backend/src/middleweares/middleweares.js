import jwt from "jsonwebtoken"

import { SECRET_KEY } from "../globalVariables.js"

export const verifyToken = (req, res, next) => {
  try {
    const authorization = req.headers.authorization

    const token = authorization.split(" ")[1]

    const payload = jwt.verify(token, SECRET_KEY)

    req.user = payload

    next()
  } catch (err) {
    return res.sendStatus(401)
  }
}
