import { prisma } from "../database.js"
import { comparePasswords, hashedPassword } from "../libs/globalFunctions.js"
import {
  DatabaseConnectionError,
  PropertyNotMatch,
} from "../libs/customErrors.js"

const ERROR_MESSAGES = {
  USER_NOT_EXISTS: "This user doesn't exists",
  USER_NOT_EXISTS_ID: "Doesn't exists any user with this id",
  EMAIL_EXISTS: "This email is already registered!!!",
  EMAIL_PASSWORD_NOT_MATCH: "The email or the password doesn't match",
}

async function getOneUser({ id }) {
  const user = prisma.users.findFirst({
    where: {
      id,
    },
  })

  console.log(user)

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
    const passwordHashed = await hashedPassword(password)

    const insertId = ""

    return insertId
  } catch (err) {
    if (err instanceof DatabaseConnectionError) throw err
    throw new PropertyNotMatch(ERROR_MESSAGES.EMAIL_EXISTS, 409)
  }
}

async function loginUser({ email, password }) {
  const user = await prisma.users.findFirst({
    where: {
      email
    }
  })

  if (!user) throw new PropertyNotMatch(ERROR_MESSAGES.EMAIL_PASSWORD_NOT_MATCH)

  const match = await comparePasswords(password, user.password_hashed)

  if (!match) {
    throw new PropertyNotMatch(ERROR_MESSAGES.EMAIL_PASSWORD_NOT_MATCH)
  }

  return { user }
}

export { getOneUser, createUser, loginUser }
