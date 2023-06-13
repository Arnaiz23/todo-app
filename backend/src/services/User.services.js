import { getConnection } from "../database.js"
import { comparePasswords, hashedPassword } from "../libs/globalFunctions.js"
import {
  DatabaseConnectionError,
  PropertyNotMatch,
} from "../libs/customErrors.js"

const ERROR_MESSAGES = {
  USER_NOT_EXISTS: "Doesn't exists any user with this id",
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

    if (result.length <= 0)
      throw new PropertyNotMatch(ERROR_MESSAGES.USER_NOT_EXISTS)

    const user = result[0]

    return {
      id: user.id,
      name: user.name,
      email: user.email,
      created_at: user.created_at,
      updated_at: user.updated_at,
    }
  } catch (err) {
    throw err
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
    if (err instanceof DatabaseConnectionError) throw err
    throw new PropertyNotMatch("This email is already registered!!!", 409)
  }
}

async function loginUser({ email, password }) {
  try {
    const con = await getConnection()
    const [rows] = await con.execute("SELECT * FROM users WHERE email LIKE ?", [
      email,
    ])

    const user = rows[0]

    if (!user) throw new PropertyNotMatch("This email doesn't exists")

    const match = await comparePasswords(password, user.password_hashed)

    if (!match) {
      throw new PropertyNotMatch("The passwords doesn't match")
    }

    return { user }
  } catch (err) {
    throw err
  }
}

export { checkUserExists, getOneUser, createUser, loginUser }
