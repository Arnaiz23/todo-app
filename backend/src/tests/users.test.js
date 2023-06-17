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

describe("POST /register", () => {
  const newUser = {
    email: "test@gmail.com",
    password: "123456",
    name: "test",
  }

  const urlRegister = `${url}/register`

  describe("when passed email, password(>=6) and name", () => {
    test("should response with a 201 statusCode", async () => {
      const response = await api.post(urlRegister).send(newUser)
      expect(response.statusCode).toBe(201)
    })

    test("should specify json as the content type in the http header", async () => {
      const response = await api.post(urlRegister).send(newUser)
      expect(response.headers["content-type"]).toEqual(
        expect.stringContaining("json")
      )
    })

    test("should contain the token", async () => {
      const response = await api.post(urlRegister).send(newUser)
      expect(response.body.data).toBeDefined()
    })
  })

  describe("when the email, password or name is missing", () => {
    test("should return a 400 statusCode", async () => {
      const response = await api.post(urlRegister).send({
        email: "test@gmail.com",
        name: "test",
      })
      expect(response.statusCode).toBe(400)
    })

    // test("should return a json object that contains an error message.", async () => {})

    test("should specify json as the content type in the http header.", async () => {
      const response = await api.post(urlRegister).send({
        email: "test@gmail.com",
      })
      expect(response.headers["content-type"]).toEqual(
        expect.stringContaining("json")
      )
    })
  })
})
