import { PORT } from "./src/globalVariables.js"
import { app } from "./src/app.js"

app.listen(PORT, () => {
  console.log(`The server is listening in the port: http://localhost:${PORT}`)
  console.log(`API Documentation: http://localhost:${PORT}/docs`)
})
