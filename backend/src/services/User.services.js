import { getConnection } from "../database.js"
import { comparePasswords, hashedPassword } from "../libs/globalFunctions.js"
import {
  DatabaseConnectionError,
  PropertyNotMatch,
} from "../libs/customErrors.js"

const ERROR_MESSAGES = {
  USER_NOT_EXISTS: "This user doesn't exists",
  USER_NOT_EXISTS_ID: "Doesn't exists any user with this id",
  EMAIL_EXISTS: "This email is already registered!!!",
  EMAIL_PASSWORD_NOT_MATCH: "The email or the password doesn't match"
}

async function checkUserExists({ con, userId }) {
  try {
    const [user] = await con.execute(
      `SELECT DISTINCT user_id FROM todos WHERE user_id LIKE ?`,
      [userId]
    )

    if (typeof user[0] === "undefined") {
      throw new Error(ERROR_MESSAGES.USER_NOT_EXISTS)
    }

    return true
  } catch (err) {
    console.log(err.message)
    return false
  }
}

async function getOneUser({ id }) {
  const con = await getConnection()

  const [result] = await con.execute("SELECT * FROM users WHERE id LIKE ?", [
    id,
  ])

  if (result.length <= 0)
    throw new PropertyNotMatch(ERROR_MESSAGES.USER_NOT_EXISTS_ID)

  const user = result[0]

  con.release()
  return {
    id: user.id,
    name: user.name,
    email: user.email,
    created_at: user.created_at,
    updated_at: user.updated_at,
  }
}

async function createUser({ email, password, name }) {
  try {
    const con = await getConnection()

    const passwordHashed = await hashedPassword(password)

    const [{ insertId }] = await con.execute(
      "INSERT INTO users (email, password_hashed, name) VALUES (?,?,?)",
      [email, passwordHashed, name]
    )

    con.release()
    return insertId
  } catch (err) {
    if (err instanceof DatabaseConnectionError) throw err
    throw new PropertyNotMatch(ERROR_MESSAGES.EMAIL_EXISTS, 409)
  }
}

async function loginUser({ email, password }) {
  const con = await getConnection()
  const [rows] = await con.execute("SELECT * FROM users WHERE email LIKE ?", [
    email,
  ])

  const user = rows[0]

  if (!user) throw new PropertyNotMatch(ERROR_MESSAGES.EMAIL_PASSWORD_NOT_MATCH)

  const match = await comparePasswords(password, user.password_hashed)

  if (!match) {
    throw new PropertyNotMatch(ERROR_MESSAGES.EMAIL_PASSWORD_NOT_MATCH)
  }

  con.release()
  return { user }
}

export { checkUserExists, getOneUser, createUser, loginUser }
