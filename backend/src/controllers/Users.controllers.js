import { createToken } from "../libs/globalFunctions.js"
import { createUser, getOneUser, loginUser } from "../services/User.services.js"
import { PropertyRequiredError } from "../libs/customErrors.js"

export async function login(req, res) {
  const { email, password, remember } = req.body

  try {
    if (!email) throw new PropertyRequiredError("email")
    if (!password) throw new PropertyRequiredError("password")

    const { user } = await loginUser({ email, password })

    let rememberTime

    remember ? (rememberTime = "1d") : (rememberTime = "2h")

    const payload = { id: user.id, name: user.name, email: user.email }
    const token = await createToken(payload, rememberTime)

    return res.status(200).json({ data: token })
  } catch (err) {
    return res.status(err.statusCode).json({ error: err.message })
  }
}

export async function registerNewUser(req, res) {
  const { email, password, name } = req.body

  try {
    if (!email) throw new PropertyRequiredError("email")
    if (!password) throw new PropertyRequiredError("password")
    if (!name) throw new PropertyRequiredError("name")

    const newUserId = await createUser({ email, password, name })

    const payload = { id: newUserId, name, email }

    const token = await createToken(payload, "2h")

    return res.status(201).json({ data: token })
  } catch (err) {
    return res.status(err.statusCode).json({ error: err.message })
  }
}

export async function getUserData(req, res) {
  const user = req.user

  try {
    const data = await getOneUser({ id: user.id })

    return res.status(200).json({ data })
  } catch (err) {
    return res.status(err.statusCode).json({ error: err.message })
  }
}
