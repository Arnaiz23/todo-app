import { getConnection } from "../database.js"

// TODOS

async function getAllTodos() {
  try {
    const con = await getConnection()
    const [rows] = await con.query(`SELECT * FROM todos`)
    return { rows }
  } catch (err) {
    console.log("Get todos " + err)
    return { err }
  }
}

async function newTodo({ title }) {
  try {
    const con = await getConnection()
    const [result] = await con.query(`INSERT INTO todos (title) VALUES (?)`, [
      title,
    ])

    const newId = result.insertId
    const { row } = await getTodoWithId({ id: newId })
    return { row }
  } catch (err) {
    console.log("Insert todo " + err)
    return { err }
  }
}

async function getTodoWithId({ id }) {
  try {
    const con = await getConnection()
    const [row] = await con.query(`SELECT * FROM todos WHERE id=?`, [id])
    return { row }
  } catch (err) {
    console.log("Get Todo with id: " + err)
    return { err }
  }
}

async function deleteTodoWithId({ id }) {
  try {
    const con = await getConnection()
    const data = await con.query(`DELETE FROM todos WHERE id LIKE ?`, [id])
    return { data }
  } catch (err) {
    console.log("Delete Todo with id: " + err)
    return { err }
  }
}

async function updateTitleTodo({ id, title }) {
  try {
    const con = await getConnection()
    const [data] = await con.query(
      `UPDATE todos SET title = ? WHERE id LIKE ?`,
      [title, id]
    )

    if (data.affectedRows == 0) {
      return { err: "No UPDATE" }
    }

    const { row } = await getTodoWithId({ id })

    return { row }
  } catch (err) {
    console.log("Update Todo with id: " + err)
    return { err }
  }
}

export { getAllTodos, newTodo, deleteTodoWithId, updateTitleTodo }
