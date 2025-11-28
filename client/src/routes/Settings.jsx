import Navbar from "../components/Navbar"
import { Navigate } from "react-router"

export default function Settings({ username, loggedIn }) {
  if (!loggedIn) {
    return <Navigate to={"/login"} />
  }
  return (
    <div>
      <Navbar username={username} />
      <main className="p-8">
        <h1 className="font-bold text-2xl">Settings</h1>
      </main>
    </div>
  )
}
