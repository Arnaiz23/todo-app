import { z } from "zod"

export const todoTitleSchema = z.object({
  title: z.string({
    required_error: "Title is required",
  }),
})

export const todoCompletedSchema = z.object({
  completed: z.boolean({
    required_error: "Completed is required",
  }),
})
