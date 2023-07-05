import { BACKEND_URL } from "../consts.js"

export async function getTodos() {
  try {
    const token = localStorage.getItem("token")
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
