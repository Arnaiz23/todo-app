import bcrypt from "bcrypt"

import { getConnection } from "../database.js"

const ERROR_MESSAGES = {
	USER_NOT_EXISTS: "The email or password doesn't exists",
}

async function checkUserExists({ con, user_id }) {
	try {
		const [user] = await con.query(
			`SELECT DISTINCT user_id FROM todos WHERE user_id LIKE ?`,
			[user_id]
		)

		if (typeof user[0] === "undefined") {
			throw new Error("This user doesn't exists")
		}

		return true
	} catch (err) {
		console.log(err.message)
		return false
	}
}

async function getOneUser({ email, password }) {
	try {
		const con = await getConnection()

		const [result] = await con.query("SELECT * FROM users WHERE email LIKE ?", [
			email,
		])

		if (result.length <= 0) throw new Error(ERROR_MESSAGES.USER_NOT_EXISTS)

		const user = result[0]

		const compared = await comparePasswords(password, user.password_hashed)

		if (!compared) throw new Error(ERROR_MESSAGES.USER_NOT_EXISTS)

		return { user }
	} catch (err) {
		console.log(err.message)
		if (err.message === ERROR_MESSAGES.USER_NOT_EXISTS)
			return { err: err.message }

		return { err: "Error in the SELECT user" }
	}
}

export { checkUserExists, getOneUser }

const comparePasswords = async (password, recivedPassword) => {
	return await bcrypt.compare(password, recivedPassword)
}
