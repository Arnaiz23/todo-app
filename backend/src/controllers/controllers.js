import { getConnection } from "../database.js"

async function getAllTodos() {
	try {
		const con = await getConnection()
		const [rows] = await con.query(`SELECT * FROM todos`)
		// const query = await pool.query(`SELECT * FROM todos`)
		// return res.json(rows)
		return rows
	} catch (err) {
		console.log(err)
		return
		// return res.json({
		// 	status: "error",
		// })
	}
}

export { getAllTodos }
