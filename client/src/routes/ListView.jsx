import { useState } from "react"
import Navbar from "../components/Navbar"
import { useEffect } from "react"
import { baseUrl } from "../App"
import { Navigate } from "react-router"

export default function ListView({ username, loggedIn }) {
  const [leads, setLeads] = useState([])

  useEffect(() => {
    const getLeads = async () => {
      const res = await fetch(baseUrl + "/leads", { method: "GET" })
      if (res.status === 200) {
        setLeads(await res.json())
      }
    }
    getLeads()
  }, [])

  if (!loggedIn) {
    return <Navigate to={"/login"} />
  }
  return (
    <div>
      <Navbar username={username} />
      <main className="p-8">
        <h1 className="font-bold text-2xl">List View</h1>
        <section className="grid gap-5 mt-5">
          {leads &&
            leads.map(
              ({
                _id,
                name,
                email,
                phone,
                leadSource,
                leadStatus,
                assignedTo,
              }) => (
                <div
                  key={_id}
                  className="bg-white shadow-md shadow-black/5 p-6 rounded-xl"
                >
                  <h3>Name: {name}</h3>
                  <p>E-Mail: {email}</p>
                  <p>Phone: {phone}</p>
                  <p>Lead Source: {leadSource}</p>
                  <p>Lead Status: {leadStatus}</p>
                  <p>Assigned to: {assignedTo}</p>
                </div>
              ),
            )}
        </section>
      </main>
    </div>
  )
}
