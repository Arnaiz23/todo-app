import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

import { SECRET_KEY } from "../globalVariables.js"

export const comparePasswords = async (password, recivedPassword) => {
  return await bcrypt.compare(password, recivedPassword)
}

export async function hashedPassword(password) {
  return await bcrypt.hash(password, 10)
}

export async function createToken(payload, rememberTime) {
  return jwt.sign(payload, SECRET_KEY, { expiresIn: rememberTime })
}
