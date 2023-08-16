// import { createPool } from "mysql2"
import dotenv from "dotenv"
import { PrismaClient } from "@prisma/client";

import { DatabaseConnectionError } from "./libs/customErrors.js"

dotenv.config()

const ERROR_MESSAGE = {
  DATABASE_CONNECTION: "Error with the database connection",
}

// const pool = createPool({
//   host: process.env.MYSQL_HOST,
//   user: process.env.MYSQL_USER,
//   password: process.env.MYSQL_PASSWORD,
//   database: process.env.MYSQL_DATABASE,
//   port: process.env.MYSQL_PORT,
// }).promise()
//
// async function getConnection() {
//   try {
//     const connection = await pool.getConnection()
//     return connection
//   } catch (err) {
//     throw new DatabaseConnectionError(ERROR_MESSAGE.DATABASE_CONNECTION)
//   }
// }
//
// export { getConnection }

export const prisma = global.prisma || new PrismaClient();

if (process.env.NODE !== "production") global.prisma = prisma;
