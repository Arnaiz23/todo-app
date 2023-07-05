/* eslint-disable camelcase */
import { getConnection } from "../database.js"

const ERROR_MESSAGES = {
  TODO_USER_NOT_EXISTS: "This user doesn't have any todo with this id",
  TODO_ID_NOT_EXISTS: "Doesn't exists any todo with this id",
  SAVE_PROCESS: "Error in the save process",
  COMPLETED_SAME: "This todo already have this value in the completed field",
}

async function getAllTodos({ id }) {
  const con = await getConnection()
  const [rows] = await con.execute(`SELECT * FROM todos WHERE user_id LIKE ?`, [
    id,
  ])

  con.release()
  return rows
}

async function newTodo({ title, user }) {
  const con = await getConnection()

  const [result] = await con.execute(
    `INSERT INTO todos (title, user_id) VALUES (?, ?)`,
    [title, user.id]
  )

  const newId = result.insertId
  const row = await getTodoWithId({ id: newId, user })

  con.release()
  return row
}

async function getTodoWithId({ id, user }) {
  const con = await getConnection()
  const [row] = await con.execute(
    `SELECT * FROM todos WHERE id LIKE ? AND user_id LIKE ?`,
    [id, user.id]
  )

  if (row.length <= 0) throw new Error(ERROR_MESSAGES.TODO_USER_NOT_EXISTS)

  con.release()
  return row[0]
}

async function deleteTodoWithId({ id, user_id }) {
  const con = await getConnection()
  const [result] = await con.execute(
    `DELETE FROM todos WHERE id LIKE ? AND user_id LIKE ?`,
    [id, user_id]
  )

  if (result.affectedRows === 0) {
    throw new Error(ERROR_MESSAGES.TODO_ID_NOT_EXISTS)
  }

  con.release()
  return id
}

async function updateTitleTodo({ id, title, user }) {
  const con = await getConnection()
  const [data] = await con.execute(
    `UPDATE todos SET title = ? WHERE id LIKE ? AND user_id LIKE ?`,
    [title, id, user.id]
  )

  if (data.affectedRows === 0) {
    throw new Error(ERROR_MESSAGES.SAVE_PROCESS)
  }

  const row = await getTodoWithId({ id, user })

  con.release()
  return row
}

async function toggleCompletedTodos({ id, completed, user }) {
  const isCompleted = completed ? 1 : 0
  const con = await getConnection()
  const [outputs] = await con.execute(
    `UPDATE todos SET completed = ? WHERE id LIKE ? AND user_id LIKE ?`,
    [isCompleted, id, user.id]
  )

  if (outputs.changedRows === 0) {
    throw new Error(ERROR_MESSAGES.COMPLETED_SAME)
  }

  const row = await getTodoWithId({ id, user })

  con.release()
  return row
}

export {
  getAllTodos,
  newTodo,
  deleteTodoWithId,
  updateTitleTodo,
  toggleCompletedTodos,
  getTodoWithId,
}
