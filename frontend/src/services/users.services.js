import { BACKEND_URL } from "../consts"
import { UnauthorizedError, UserExistsError } from "../libs/customErrors"
import { getToken } from "../libs/functions"

export async function loginService({ userInfo }) {
  const response = await fetch(`${BACKEND_URL}/login`, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(userInfo),
  })

  if (!response.ok) {
    throw new Error(`Error HTTP: ${response.status}`)
  }

  return await response.json()
}

export async function registerService({ register }) {
  const response = await fetch(`${BACKEND_URL}/register`, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(register),
  })

  if (!response.ok) {
    const message = `Error HTTP: ${response.status}`

    if(response.status === 409) throw new UserExistsError(message)

    throw new Error(message)
  }

  return await response.json()
}

export async function getUserData() {
  const token = getToken()

  const response = await fetch(`${BACKEND_URL}/users`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  if (!response.ok) {
    if(response.status === 401) {
      throw new UnauthorizedError(`Error HTTP: ${response.status}`)
    }
    throw new Error(`Error HTTP: ${response.status}`)
  }

  return await response.json()
}
