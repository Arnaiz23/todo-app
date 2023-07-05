import { BACKEND_URL } from "../consts"

export async function loginService({login}) {
  try {
    const response = await fetch(`${BACKEND_URL}/login`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(login),
    })

    if (!response.ok) {
      throw new Error(`Error HTTP: ${response.status}`)
    }

    return await response.json()
  } catch (error) {
    console.error(error.message)
  }
}
