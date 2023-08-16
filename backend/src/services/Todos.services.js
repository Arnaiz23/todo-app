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
  const todo = await prisma.todos.findFirst({
    where: {
      user_id: user.id,
      id: Number(id),
    },
  })

  if (!todo) throw new Error(ERROR_MESSAGES.TODO_USER_NOT_EXISTS)

  return todo
}

async function deleteTodoWithId({ id, user_id }) {
  try {
    const todoDelete = await prisma.todos.delete({
      where: {
        id: Number(id),
        user_id,
      },
    })

    return todoDelete
  } catch (error) {
    throw new Error(ERROR_MESSAGES.TODO_ID_NOT_EXISTS)
  }
}

async function updateTitleTodo({ id, title, user }) {
  try {
    const todoUpdated = await prisma.todos.update({
      where: {
        id: Number(id),
        user_id: user.id,
      },
      data: {
        title,
      },
    })

    return todoUpdated
  } catch (error) {
    throw new Error(ERROR_MESSAGES.SAVE_PROCESS)
  }
}

async function toggleCompletedTodos({ id, completed, user }) {
  try {
    const todoUpdated = await prisma.todos.update({
      where: {
        id: Number(id),
        user_id: user.id,
      },
      data: {
        completed,
      },
    })

    return todoUpdated
  } catch (error) {
    throw new Error(ERROR_MESSAGES.COMPLETED_SAME)
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
