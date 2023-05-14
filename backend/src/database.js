import { createPool } from "mysql2"
import dotenv from "dotenv"
dotenv.config()

const pool = createPool({
	host: process.env.MYSQL_HOST,
	user: process.env.MYSQL_USER,
	password: process.env.MYSQL_PASSWORD,
	database: process.env.MYSQL_DATABASE,
}).promise()

async function getConnection() {
	try {
		const connection = await pool.getConnection()
		console.log("Connected to MySQL")
		return connection
	} catch (err) {
		console.log("Error connection")
		console.log(err)
	}
}

export { getConnection }
