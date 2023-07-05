import { BACKEND_URL } from "../consts.js"
import { getToken } from "../libs/functions.js"

export async function getTodos() {
  const token = getToken()
  const response = await fetch(`${BACKEND_URL}/todos`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  if (!response.ok) {
    throw new Error(`Error HTTP: ${response.status}`)
  }

  return await response.json()
}

export async function deleteTodo({ id }) {
  const token = getToken()

  if (!token) throw new Error("Token is missing")

  const response = await fetch(`${BACKEND_URL}/todos/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  if (!response.ok) {
    throw new Error("Error HTTP: ", response.status)
  }
}
