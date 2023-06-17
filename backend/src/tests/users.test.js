import supertest from "supertest"
import { app } from "../app.js"

const api = supertest(app)

const url = "/api"

const tokens = {
  adrian:
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibmFtZSI6ImFkcmlhbiIsImVtYWlsIjoiYWRyaWFuQGdtYWlsLmNvbSIsImlhdCI6MTY4Njk5Nzc4MiwiZXhwIjoxNjg3MDA0OTgyfQ.iVioOYuuJHN9fqXMbuLHod_D50Vci6gi8GRXFlNlSYQ",
}

describe("Server is running correctly", () => {
  it("The server returns the routes", async () => {
    await api.get(url).expect(200)
  })
})

describe("Users routes", () => {
  it("Create new user. Correct data. Only work the first time or if the user doesn't exists.", async () => {
    const newUser = {
      email: "test@gmail.com",
      password: "123456",
      name: "test",
    }

    const response = await api.post(`${url}/register`).send(newUser)
    expect(response.statusCode).toBe(201)
  })

  it("Create new user. Incorrect data. Password with length less than 6.", async () => {
    const newUser = {
      email: "test10@gmail.com",
      password: "test",
      name: "test",
    }

    await api.post(`${url}/register`).send(newUser).expect(400)
  })
})
