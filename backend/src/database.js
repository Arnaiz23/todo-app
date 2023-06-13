import { createPool } from "mysql2"
import dotenv from "dotenv"
dotenv.config()

import { DatabaseConnectionError } from "./libs/customErrors.js"

const pool = createPool({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
}).promise()

async function getConnection() {
  try {
    const connection = await pool.getConnection()
    return connection
  } catch (err) {
    throw new DatabaseConnectionError("Error with the database connection")
  }
}

export { getConnection }
