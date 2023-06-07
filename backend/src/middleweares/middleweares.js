import jwt from "jsonwebtoken"

import { SECRET_KEY } from "../globalVariables.js"

export const verifyToken = (req, res, next) => {
	try {
		const authorization = req.headers.authorization

		const token = authorization.split(" ")[1]

		jwt.verify(token, SECRET_KEY)

		next()
	} catch (err) {
		console.log(err.message)
		return res.sendStatus(401)
	}
}
