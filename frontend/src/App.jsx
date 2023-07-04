import { Route } from "wouter"

import "./App.css"
import Home from "./pages/Home.jsx"

function App() {

  return (
    <div className="bg-zinc-800 text-white h-screen flex flex-col">
      <Route path="/">
        <Home />
      </Route>
      <Route path="/login">
        <h1>Login</h1>
      </Route>
    </div>
  )
}

export default App
