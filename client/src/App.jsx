import { Routes, Route } from "react-router"
import Sidebar from "./components/Sidebar"
import Footer from "./components/Footer"
import Dashboard from "./routes/Dashboard"
import Analytics from "./routes/Analytics"
import Leads from "./routes/Leads"
import ListView from "./routes/ListView"
import Settings from "./routes/Settings"
import Products from "./routes/Products"
import Customers from "./routes/Customers"
import Login from "./routes/Login"
import { useState } from "react"
import { QueryClientProvider } from "@tanstack/react-query"
import queryClient from "./utils/queryClient"

export const baseUrl = "http://localhost:4000"

function App() {
  const [username, setUsername] = useState("")
  const [loggedIn, setLoggedIn] = useState(false)
  return (
    <QueryClientProvider client={queryClient}>
      <Routes>
        <Route
          path="/"
          element={
            <Login
              loggedIn={loggedIn}
              setLoggedIn={setLoggedIn}
              setUsername={setUsername}
            />
          }
        />
        <Route
          path="/dashboard/*"
          element={
            <Dash
              setLoggedIn={setLoggedIn}
              loggedIn={loggedIn}
              username={username}
            />
          }
        />
        <Route path="*" element={<b className="text-3xl">404</b>} />
      </Routes>
    </QueryClientProvider>
  )
}

export default App

function Dash({ loggedIn, setLoggedIn, username }) {
  return (
    <>
      <div className="grid md:grid-cols-[auto_1fr] main_container">
        <Sidebar loggedIn={loggedIn} setLoggedIn={setLoggedIn} />
        <Routes>
          <Route path="/">
            <Route
              index
              element={
                <Dashboard
                  loggedIn={loggedIn}
                  setLoggedIn={setLoggedIn}
                  username={username}
                />
              }
            />
            <Route
              path="analytics"
              element={
                <Analytics
                  loggedIn={loggedIn}
                  setLoggedIn={setLoggedIn}
                  username={username}
                />
              }
            />
            <Route
              path="leads"
              element={
                <Leads
                  loggedIn={loggedIn}
                  setLoggedIn={setLoggedIn}
                  username={username}
                />
              }
            />
            <Route
              path="customers"
              element={
                <Customers
                  loggedIn={loggedIn}
                  setLoggedIn={setLoggedIn}
                  username={username}
                />
              }
            />
            <Route
              path="products"
              element={
                <Products
                  loggedIn={loggedIn}
                  setLoggedIn={setLoggedIn}
                  username={username}
                />
              }
            />
            <Route
              path="list-view"
              element={
                <ListView
                  loggedIn={loggedIn}
                  setLoggedIn={setLoggedIn}
                  username={username}
                />
              }
            />
          </Route>
          <Route
            path="settings"
            element={
              <Settings
                loggedIn={loggedIn}
                setLoggedIn={setLoggedIn}
                username={username}
              />
            }
          />
          <Route path="*" element={<b className="text-3xl">404</b>} />
        </Routes>
      </div>
      <Footer />
    </>
  )
}
