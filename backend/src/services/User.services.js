import { getConnection } from "../database.js"
import { comparePasswords, hashedPassword } from "../libs/globalFunctions.js"

const ERROR_MESSAGES = {
  USER_NOT_EXISTS: "The email or password doesn't exists",
}

async function checkUserExists({ con, user_id }) {
  try {
    const [user] = await con.execute(
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

async function getOneUser({ id }) {
  try {
    const con = await getConnection()

    const [result] = await con.execute("SELECT * FROM users WHERE id LIKE ?", [
      id,
    ])

    if (result.length <= 0) throw new Error(ERROR_MESSAGES.USER_NOT_EXISTS)

    const user = result[0]

    return {
      id: user.id,
      name: user.name,
      email: user.email,
      created_at: user.created_at,
      updated_at: user.updated_at,
    }
  } catch (err) {
    console.log(err.message)
    if (err.message === ERROR_MESSAGES.USER_NOT_EXISTS)
      return { err: err.message }

    return { err: "Error in the SELECT user" }
  }
}

async function createUser({ email, password, name }) {
  try {
    const con = await getConnection()

    const password_hashed = await hashedPassword(password)

    const [{ insertId }] = await con.execute(
      "INSERT INTO users (email, password_hashed, name) VALUES (?,?,?)",
      [email, password_hashed, name]
    )

    return insertId
  } catch (err) {
    throw new Error("This email is already registered!!!")
  }
}

export { checkUserExists, getOneUser, createUser }
