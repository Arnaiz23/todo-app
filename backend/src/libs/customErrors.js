export class PropertyRequiredError extends Error {
  constructor(property) {
    super("Property missing: " + property)
    this.name = "PropertyRequiredError"
    this.property = property
    this.statusCode = 400
  }
}

export class PropertyNotMatch extends Error {
  constructor(message, statusCode = 404) {
    super(message)
    this.name = "PropertyNotMatch"
    this.statusCode = statusCode
  }
}

export class DatabaseConnectionError extends Error {
  constructor(message) {
    super(message)
    this.name = "DatabaseConnectionError"
    this.statusCode = 500
  }
}
