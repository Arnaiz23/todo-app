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
		const { row } = await getTodoWithId(newId)
		return { row }
	} catch (err) {
		console.log("Insert todo " + err)
		return { err }
	}
}

async function getTodoWithId(id) {
	try {
		const con = await getConnection()
		const [row] = await con.query(`SELECT * FROM todos WHERE id=?`, [id])
		return { row }
	} catch (err) {
		console.log("Get Todo with id: " + err)
		return { err }
	}
}

export { getAllTodos, newTodo }
