import { BACKEND_URL } from "../consts.js"

function getToken() {
  return localStorage.getItem("token")
}

export async function getTodos() {
  try {
    const token = getToken()
    const response = await fetch(`${BACKEND_URL}/todos`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

    if (!response.ok) {
      throw new Error("Error HTTP: ", response.status)
    }

    return await response.json()
  } catch (error) {
    console.error(error.message)
  }
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
