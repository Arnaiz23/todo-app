import { createPool } from "mysql2"

console.log(process.env.MYSQL_USER)

const pool = createPool({
	host: process.env.MYSQL_HOST,
	user: process.env.MYSQL_USER,
	password: process.env.MYSQL_PASSWORD,
	database: process.env.MYSQL_DATABASE,
}).promise()

export { pool }
