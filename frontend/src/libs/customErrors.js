export class UnauthorizedError extends Error {
  constructor(message) {
    super(message)
    this.name = "UnauthorizedError"
    this.statusCode = 401
  }
}

export class UserExistsError extends Error {
  constructor(message) {
    super(message)
    this.name = "UserExistsError"
    this.statusCode = 409
  }
}
