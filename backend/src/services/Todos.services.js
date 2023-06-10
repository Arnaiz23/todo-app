import { getConnection } from "../database.js"

async function getAllTodos({ id }) {
  try {
    const con = await getConnection()
    const [rows] = await con.query(`SELECT * FROM todos WHERE user_id LIKE ?`, [
      id,
    ])
    return rows
  } catch (err) {
    console.log("Get todos " + err)
    return { err }
  }
}

async function newTodo({ title, user }) {
  try {
    if (typeof user.id === "undefined" || !user.id) {
      throw new Error("User_id is required")
    }
    const con = await getConnection()

    const [result] = await con.query(
      `INSERT INTO todos (title, user_id) VALUES (?, ?)`,
      [title, user.id]
    )

    const newId = result.insertId
    const row = await getTodoWithId({ id: newId, user })

    return row
  } catch (err) {
    // TODO. Maybe create customs Errors because is neccessary the err.name for the ifs conditions
    if (err.message === "User_id is required") {
      return { err: err.message }
    }
    if (err.message === "This user doesn't exists") {
      return { err: err.message }
    }
    console.log("Insert todo " + err.message)
    return { err: "Error with the INSERT query of the todos table" }
  }
}

async function getTodoWithId({ id, user }) {
  try {
    const con = await getConnection()
    const [row] = await con.query(
      `SELECT * FROM todos WHERE id LIKE ? AND user_id LIKE ?`,
      [id, user.id]
    )
    return row
  } catch (err) {
    console.log("Get Todo with id: " + err)
    return { err }
  }
}

async function deleteTodoWithId({ id, user_id }) {
  try {
    const con = await getConnection()
    const [result] = await con.query(
      `DELETE FROM todos WHERE id LIKE ? AND user_id LIKE ?`,
      [id, user_id]
    )

    if (result.affectedRows === 0) {
      // throw new Error("doesn't exists any todo with this id")
      return { err: "doesn't exists any todo with this id" }
    }

    return id
  } catch (err) {
    console.log("Delete Todo with id: " + err)
    return { err: "Error with the DELETE query of the todos table" }
  }
}

async function updateTitleTodo({ id, title, user }) {
  try {
    const con = await getConnection()
    const [data] = await con.query(
      `UPDATE todos SET title = ? WHERE id LIKE ? AND user_id LIKE ?`,
      [title, id, user.id]
    )

    if (data.affectedRows == 0) {
      return { err: "No UPDATE" }
    }

    const row = await getTodoWithId({ id, user })

    return row
  } catch (err) {
    console.log("Update Todo with id: " + err)
    return { err }
  }
}

async function toggleCompletedTodos({ id, completed, user }) {
  try {
    const isCompleted = completed ? 1 : 0
    const con = await getConnection()
    const [outputs] = await con.query(
      `UPDATE todos SET completed = ? WHERE id LIKE ? AND user_id LIKE ?`,
      [isCompleted, id, user.id]
    )
    if (outputs.changedRows === 0) {
      return {
        err: "This todo already have this value in the completed field",
      }
    }

    const row = await getTodoWithId({ id, user })

    return row
  } catch (err) {
    console.log("Patch Todo with id: " + err)
    return { err: "Error with the PATCH query of the todos table" }
  }
}

export {
  getAllTodos,
  newTodo,
  deleteTodoWithId,
  updateTitleTodo,
  toggleCompletedTodos,
  getTodoWithId,
}
