import supertest from "supertest"
import { app } from "../app.js"
import { getConnection } from "../database.js"

const api = supertest(app)

const url = "/api/todos"
let token

beforeAll(async () => {
  const response = await api.post("/api/login").send({
    email: "test@gmail.com",
    password: "123456",
  })
  token = response.body.data
})

// describe("GET /todos get all todos", () => {
//   describe("when return all the todos", () => {
//     test("should return a 200 status code", async () => {
//       const response = await api
//         .get(url)
//         .set("Authorization", `Bearer ${token}`)
//       expect(response.statusCode).toBe(200)
//     })
//     test("should return the array of todos", async () => {
//       const response = await api
//         .get(url)
//         .set("Authorization", `Bearer ${token}`)
//       expect(response.body.data).toBeDefined()
//     })
//   })
//
//   describe("when the token is missing", () => {
//     test("should return a 401 statusCode", async () => {
//       const response = await api.get(url)
//       expect(response.statusCode).toBe(401)
//     })
//   })
// })

describe("POST /todos create new todo", () => {
  const newTodo = { title: "Testing the app" }

  describe("when recive the title and token", () => {
    beforeEach(async () => {
      const con = await getConnection()
      await con.execute(`DELETE FROM todos WHERE title LIKE ?`, [newTodo.title])
    })

    test("should revice a 201 statusCode", async () => {
      const response = await api
        .post(url)
        .send(newTodo)
        .set("Authorization", `Bearer ${token}`)
      expect(response.statusCode).toBe(201)
    })
    test("should revice the data", async () => {
      const response = await api
        .post(url)
        .send(newTodo)
        .set("Authorization", `Bearer ${token}`)
      expect(response.body.data).toBeDefined()
    })
  })
  describe("when the title or token is missing", () => {
    test("should revice a 401 statusCode if the token is missing", async () => {
      const response = await api.post(url).send(newTodo)
      expect(response.statusCode).toBe(401)
    })
    test("should revice the error if the title is missing", async () => {
      const response = await api
        .post(url)
        .send({})
        .set("Authorization", `Bearer ${token}`)
      expect(response.body.error).toBeDefined()
    })
  })
})

let todos = []
beforeAll(async () => {
  const response = await api.get(url).set("Authorization", `Bearer ${token}`)
  todos = response.body.data
})

describe("GET /todos/:id get one todo", () => {
  describe("when the server return the todo", () => {
    test("should return a 200 statusCode", async () => {
      const id = todos[0].id
      const response = await api
        .get(`${url}/${id}`)
        .set("Authorization", `Bearer ${token}`)
      expect(response.statusCode).toBe(200)
    })
    test("should return a todo", async () => {
      const response = await api
        .get(`${url}/${todos[0]?.id}`)
        .set("Authorization", `Bearer ${token}`)
      expect(response.body.data).toBeDefined()
    })
  })

  describe("when the token is missing", () => {
    test("should return a 401 statusCode", async () => {
      const response = await api.get(`${url}/${todos[0]?.id}`)
      expect(response.statusCode).toBe(401)
    })
  })
})

describe("PUT /todos/:id update the title of a todo", () => {
  describe("when the user send the token and the title", () => {
    test("should return a 200 statusCode", async () => {
      const response = await api
        .put(`${url}/${todos[0].id}`)
        .send({ title: "Update" })
        .set("Authorization", `Bearer ${token}`)
      expect(response.statusCode).toBe(200)
    })
    test("should return data of the todo", async () => {
      const response = await api
        .put(`${url}/${todos[0].id}`)
        .send({ title: "Update" })
        .set("Authorization", `Bearer ${token}`)
      expect(response.body.data).toBeDefined()
    })
  })

  describe("when the user not send the token or the title", () => {
    test("should return a 401 statusCode if the token missing", async () => {
      const response = await api
        .put(`${url}/${todos[0].id}`)
        .send({ title: "Update" })
      expect(response.statusCode).toBe(401)
    })
    test("should return error of the todo if the title missing", async () => {
      const response = await api
        .put(`${url}/${todos[0].id}`)
        .send()
        .set("Authorization", `Bearer ${token}`)
      expect(response.body.error).toBeDefined()
    })
  })
})

describe("PATCH /todos/:id update the completed field of a todo", () => {
  describe("when the user send the token and the completed", () => {
    test("should return a 200 statusCode", async () => {
      const response = await api
        .patch(`${url}/${todos[0].id}`)
        .send({ completed: true })
        .set("Authorization", `Bearer ${token}`)
      expect(response.statusCode).toBe(200)
    })
    test("should return data of the todo", async () => {
      const response = await api
        .patch(`${url}/${todos[0].id}`)
        .send({ completed: false })
        .set("Authorization", `Bearer ${token}`)
      expect(response.body.data).toBeDefined()
    })
  })

  describe("when the user not send the token or the completed", () => {
    test("should return a 401 statusCode if the token missing", async () => {
      const response = await api
        .patch(`${url}/${todos[0].id}`)
        .send({ completed: true })
      expect(response.statusCode).toBe(401)
    })
    test("should return error of the todo if the completed missing", async () => {
      const response = await api
        .patch(`${url}/${todos[0].id}`)
        .send()
        .set("Authorization", `Bearer ${token}`)
      expect(response.body.error).toBeDefined()
    })
  })
})

describe("DELETE /todos/:id delete the todo", () => {
  describe("when the user send the token", () => {
    test("should return a 204 statusCode", async () => {
      const response = await api
        .delete(`${url}/${todos[0].id}`)
        .set("Authorization", `Bearer ${token}`)
      expect(response.statusCode).toBe(204)
    })
    test("should return data of the todo", async () => {
      const response = await api
        .delete(`${url}/${todos[0].id}`)
        .set("Authorization", `Bearer ${token}`)
      expect(response.body.data).toBeDefined()
    })
  })

  describe("when the user not send the token", () => {
    test("should return a 401 statusCode", async () => {
      const response = await api
        .delete(`${url}/${todos[0].id}`)
        .set("Authorization", `Bearer ${token}`)
      expect(response.statusCode).toBe(401)
    })
  })
})
