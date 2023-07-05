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
    throw new Error(`Error HTTP: ${response.status}`)
  }
}

export async function createTodo({newTodo}) {
  const token = getToken()

  const response = await fetch(`${BACKEND_URL}/todos`, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
      "Authorization": `Bearer ${token}`
    },
    body: JSON.stringify(newTodo)
  })

  if(!response.ok) {
    throw new Error(`Error HTTP:  ${response.status}`)
  }

  return await response.json()
}

export async function changeCompleted ({ updatedObject, id }) {
  const token = getToken()

  const response = await fetch(`${BACKEND_URL}/todos/${id}`, {
    method: "PATCH",
    headers: {
      "Content-type": "application/json",
      "Authorization": `Bearer ${token}`
    },
    body: JSON.stringify(updatedObject)
  })

  if(!response.ok) {
    throw new Error(`Error HTTP: ${response.status}`)
  }

  return await response.json()
}
