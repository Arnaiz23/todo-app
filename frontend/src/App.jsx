import { Route } from "wouter"

import "./App.css"
import Home from "./pages/Home.jsx"
import Login from "./pages/Login.jsx"
import Register from "./pages/Register"

function App() {

  return (
    <div className="bg-zinc-800 text-white h-screen flex flex-col">
      <Route path="/">
        <Home />
      </Route>
      <Route path="/login">
        <Login />
      </Route>
      <Route path="/register">
        <Register />
      </Route>
    </div>
  )
}

export default App
