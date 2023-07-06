import { BACKEND_URL } from "../consts"
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
    throw new Error(`Error HTTP: ${response.status}`)
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
    throw new Error(`Error HTTP: ${response.status}`)
  }

  return await response.json()
}
