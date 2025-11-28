import { Routes, Route } from "react-router"
import Sidebar from "./components/Sidebar"
import Footer from "./components/Footer"
import Dashboard from "./routes/Dashboard"
import Analytics from "./routes/Analytics"
import Leads from "./routes/Leads"
import ListView from "./routes/ListView"
import Settings from "./routes/Settings"
import Login from "./routes/Login"
import { useState } from "react"

export const baseUrl = "http://localhost:4000"
function App() {
  const [username, setUsername] = useState("")
  const [loggedIn, setLoggedIn] = useState(false)
  return (
    <>
      <div className="grid md:grid-cols-[auto_1fr]">
        <Sidebar loggedIn={loggedIn} setLoggedIn={setLoggedIn} />
        <Routes>
          <Route path="/">
            <Route
              index
              element={<Dashboard loggedIn={loggedIn} username={username} />}
            />
            <Route
              path="analytics"
              element={<Analytics loggedIn={loggedIn} username={username} />}
            />
            <Route
              path="leads"
              element={<Leads loggedIn={loggedIn} username={username} />}
            />
            <Route
              path="list-view"
              element={<ListView loggedIn={loggedIn} username={username} />}
            />
          </Route>
          <Route
            path="settings"
            element={<Settings loggedIn={loggedIn} username={username} />}
          />
          <Route
            path="login"
            element={
              <Login
                setLoggedIn={setLoggedIn}
                loggedIn={loggedIn}
                setUsername={setUsername}
              />
            }
          />
        </Routes>
      </div>
      <Footer />
    </>
  )
}

export default App
