import supertest from "supertest"

import { app } from "../app.js"
import { getConnection } from "../database.js"
import { createToken } from "../libs/globalFunctions.js"

const api = supertest(app)

const url = "/api"

const userInfo = {
  email: "test@gmail.com",
  password: "123456",
  name: "test",
}

// describe("Server is running correctly", () => {
//   it("The server returns the routes", async () => {
//     await api.get(url).expect(200)
//   })
// })
//
// describe("POST /register", () => {
//   const urlRegister = `${url}/register`
//
//   describe("when passed email, password(>=6) and name", () => {
//     beforeEach(async () => {
//       const con = await getConnection()
//       await con.query("DELETE FROM users WHERE email LIKE ?", [userInfo.email])
//     })
//
//     test("should response with a 201 statusCode", async () => {
//       const response = await api.post(urlRegister).send(userInfo)
//       expect(response.statusCode).toBe(201)
//     })
//
//     test("should specify json as the content type in the http header", async () => {
//       const response = await api.post(urlRegister).send(userInfo)
//       expect(response.headers["content-type"]).toEqual(
//         expect.stringContaining("json")
//       )
//     })
//
//     test("should contain the token", async () => {
//       const response = await api.post(urlRegister).send(userInfo)
//       expect(response.body.data).toBeDefined()
//     })
//   })
//
//   describe("when the email, password or name is missing", () => {
//     test("should return a 400 statusCode", async () => {
//       const response = await api.post(urlRegister).send({
//         email: "test@gmail.com",
//         name: "test",
//       })
//       expect(response.statusCode).toBe(400)
//     })
//
//     test("should return a json object that contains an error message.", async () => {
//       const response = await api
//         .post(urlRegister)
//         .send({ email: userInfo.email })
//       expect(response.body.error).toBeDefined()
//     })
//
//     test("should specify json as the content type in the http header.", async () => {
//       const response = await api.post(urlRegister).send({
//         email: userInfo.email,
//       })
//       expect(response.headers["content-type"]).toEqual(
//         expect.stringContaining("json")
//       )
//     })
//   })
// })
//
// describe("POST /login", () => {
//   const loginUser = {
//     email: userInfo.email,
//     password: userInfo.password,
//   }
//
//   const loginURL = `${url}/login`
//
//   describe("when passed email and password correctly", () => {
//     test("should recive a 200 statusCode", async () => {
//       const response = await api.post(loginURL).send(loginUser)
//       expect(response.statusCode).toBe(200)
//     })
//
//     test("should specify json as the content-type in the header", async () => {
//       const response = await api.post(loginURL).send(loginUser)
//       expect(response.headers["content-type"]).toEqual(
//         expect.stringContaining("json")
//       )
//     })
//
//     test("should recive the user token", async () => {
//       const response = await api.post(loginURL).send(loginUser)
//       expect(response.body.data).toBeDefined()
//     })
//   })
//
//   describe("when passed email or password.", () => {
//     test("should recive a 400 statusCode", async () => {
//       const response = await api.post(loginURL).send({ email: loginUser.email })
//       expect(response.statusCode).toBe(400)
//     })
//
//     test("should specify json as the content-type in the header", async () => {
//       const response = await api.post(loginURL).send({ email: loginUser.email })
//       expect(response.headers["content-type"]).toEqual(
//         expect.stringContaining("json")
//       )
//     })
//
//     test("should recive the error message", async () => {
//       const response = await api.post(loginURL).send({ email: loginUser.email })
//       expect(response.body.error).toBeDefined()
//     })
//   })
// })

describe("GET /users", () => {
  const urlUser = `${url}/users`

  describe("when passed token", () => {
    let token
    beforeAll(async () => {
      const response = await api
        .post(`${url}/login`)
        .send({ email: userInfo.email, password: userInfo.password })
      token = response.body.data
    })

    test("should recive a 200 statusCode", async () => {
      const response = await api
        .get(urlUser)
        .set("Authorization", `Bearer ${token}`)
      expect(response.statusCode).toBe(200)
    })

    test("should specify json as the content-type in the header", async () => {
      const response = await api
        .get(urlUser)
        .set("Authorization", `Bearer ${token}`)
      expect(response.headers["content-type"]).toEqual(
        expect.stringContaining("json")
      )
    })

    test("should recive an user data", async () => {
      const response = await api
        .get(urlUser)
        .set("Authorization", `Bearer ${token}`)
      expect(response.body.data).toBeDefined()
    })
  })
  describe("when the token is incorrect or is missing", () => {
    const token = "asdf"
    test("should return a 401 statusCode", async () => {
      const response = await api
        .get(urlUser)
        .set("Authorization", `Bearer ${token}`)
      expect(response.statusCode).toBe(401)
    })
  })
})
