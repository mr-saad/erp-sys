import Navbar from "../components/Navbar"
import LineChart from "../components/LineChart"
import RadialChart from "../components/RadialChart"
import PieChart from "../components/PieChart"
import { Navigate } from "react-router"

export default function Analytics({ username, loggedIn, setLoggedIn }) {
  if (!loggedIn) {
    return <Navigate to={"/"} />
  }
  return (
    <div>
      <Navbar username={username} setLoggedIn={setLoggedIn} />
      <main className="p-8">
        <div className="grid md:grid-cols-2 gap-10 mb-10">
          <RadialChart />
          <PieChart />
        </div>
        <div className="bg-white p-5 rounded-xl shadow-md shadow-black/5">
          <LineChart />
        </div>
      </main>
    </div>
  )
}
