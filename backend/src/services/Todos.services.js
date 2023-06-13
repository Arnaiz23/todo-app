import { getConnection } from "../database.js"

async function getAllTodos({ id }) {
  try {
    const con = await getConnection()
    const [rows] = await con.execute(
      `SELECT * FROM todos WHERE user_id LIKE ?`,
      [id]
    )
    return rows
  } catch (err) {
    throw err
  }
}

async function newTodo({ title, user }) {
  try {
    const con = await getConnection()

    const [result] = await con.execute(
      `INSERT INTO todos (title, user_id) VALUES (?, ?)`,
      [title, user.id]
    )

    const newId = result.insertId
    const row = await getTodoWithId({ id: newId, user })

    return row
  } catch (err) {
    throw err
  }
}

async function getTodoWithId({ id, user }) {
  try {
    const con = await getConnection()
    const [row] = await con.execute(
      `SELECT * FROM todos WHERE id LIKE ? AND user_id LIKE ?`,
      [id, user.id]
    )

    if (row.length <= 0)
      throw new Error("This user doesn't have any todo with this id")

    return row[0]
  } catch (err) {
    throw err
  }
}

async function deleteTodoWithId({ id, user_id }) {
  try {
    const con = await getConnection()
    const [result] = await con.execute(
      `DELETE FROM todos WHERE id LIKE ? AND user_id LIKE ?`,
      [id, user_id]
    )

    if (result.affectedRows === 0) {
      throw new Error("doesn't exists any todo with this id")
    }

    return id
  } catch (err) {
    throw err
  }
}

async function updateTitleTodo({ id, title, user }) {
  try {
    const con = await getConnection()
    const [data] = await con.execute(
      `UPDATE todos SET title = ? WHERE id LIKE ? AND user_id LIKE ?`,
      [title, id, user.id]
    )

    if (data.affectedRows == 0) {
      throw new Error("Error in the save process")
    }

    const row = await getTodoWithId({ id, user })

    return row
  } catch (err) {
    throw err
  }
}

async function toggleCompletedTodos({ id, completed, user }) {
  try {
    const isCompleted = completed ? 1 : 0
    const con = await getConnection()
    const [outputs] = await con.execute(
      `UPDATE todos SET completed = ? WHERE id LIKE ? AND user_id LIKE ?`,
      [isCompleted, id, user.id]
    )

    if (outputs.changedRows === 0) {
      throw new Error(
        "This todo already have this value in the completed field"
      )
    }

    const row = await getTodoWithId({ id, user })

    return row
  } catch (err) {
    throw err
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
