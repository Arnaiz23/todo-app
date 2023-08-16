/* eslint-disable camelcase */
import { prisma } from "../database.js"
import { DatabaseConnectionError } from "../libs/customErrors.js"

const ERROR_MESSAGES = {
  TODO_USER_NOT_EXISTS: "This user doesn't have any todo with this id",
  TODO_ID_NOT_EXISTS: "Doesn't exists any todo with this id",
  SAVE_PROCESS: "Error in the save process",
  COMPLETED_SAME: "This todo already have this value in the completed field",
}

async function getAllTodos({ id }) {
  const todos = await prisma.todos.findMany({
    where: {
      user_id: id,
    },
  })

  return todos
}

async function newTodo({ title, user }) {
  try {
    const newTodo = await prisma.todos.create({
      data: {
        title,
        user_id: user.id,
      },
    })

    return newTodo
  } catch (error) {
    throw new DatabaseConnectionError(ERROR_MESSAGES.SAVE_PROCESS)
  }
}

async function getTodoWithId({ id, user }) {
  const row = []

  if (row.length <= 0) throw new Error(ERROR_MESSAGES.TODO_USER_NOT_EXISTS)

  return row[0]
}

async function deleteTodoWithId({ id, user_id }) {
  const result = {}

  if (result.affectedRows === 0) {
    throw new Error(ERROR_MESSAGES.TODO_ID_NOT_EXISTS)
  }

  return id
}

async function updateTitleTodo({ id, title, user }) {
  const data = {}

  if (data.affectedRows === 0) {
    throw new Error(ERROR_MESSAGES.SAVE_PROCESS)
  }

  const row = await getTodoWithId({ id, user })

  return row
}

async function toggleCompletedTodos({ id, completed, user }) {
  const isCompleted = completed ? 1 : 0
  const outputs = {}

  if (outputs.changedRows === 0) {
    throw new Error(ERROR_MESSAGES.COMPLETED_SAME)
  }

  const row = await getTodoWithId({ id, user })

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
