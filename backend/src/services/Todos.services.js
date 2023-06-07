import { getConnection } from "../database.js"
import { checkUserExists } from "./User.services.js"

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

async function newTodo({ title, user_id }) {
	try {
		if (typeof user_id === "undefined" || !user_id) {
			throw new Error("User_id is required")
		}
		const con = await getConnection()
		const userExists = await checkUserExists({ con, user_id })

		if (!userExists) {
			throw new Error("This user doesn't exists")
		}

		const [result] = await con.query(
			`INSERT INTO todos (title, user_id) VALUES (?, ?)`,
			[title, user_id]
		)

		const newId = result.insertId
		const { row } = await getTodoWithId({ id: newId })
		return { row }
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
		const [result] = await con.query(`DELETE FROM todos WHERE id LIKE ?`, [id])

		if (result.affectedRows === 0) {
			return { err: "Doesn't exists any TODO with this id" }
		}

		return { data: { id } }
	} catch (err) {
		console.log("Delete Todo with id: " + err)
		return { err: "Error with the DELETE query of the todos table" }
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

async function toggleCompletedTodos({ id, completed }) {
	try {
		const isCompleted = completed ? 1 : 0
		const con = await getConnection()
		const [outputs] = await con.query(
			`UPDATE todos SET completed = ? WHERE id LIKE ?`,
			[isCompleted, id]
		)
		if (outputs.changedRows === 0) {
			return {
				err: "This todo already have this value in the completed field",
			}
		}

		const { row } = await getTodoWithId({ id })

		return { row }
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
