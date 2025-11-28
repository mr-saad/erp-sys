import { useState } from "react"
import Navbar from "../components/Navbar"
import { useEffect } from "react"
import { baseUrl } from "../App"
import { Navigate } from "react-router"

export default function Leads({ username, loggedIn }) {
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
        <h1 className="text-2xl font-bold">Leads</h1>
        <div className="overflow-x-auto mt-5 bg-white shadow-md shadow-black/5 rounded-xl">
          <table className="w-full">
            <thead>
              <tr>
                <th>No.</th>
                <th>Name</th>
                <th>E-Mail</th>
                <th>Phone</th>
                <th>Lead Source</th>
                <th>Lead Status</th>
                <th>Assigned to</th>
              </tr>
            </thead>
            <tbody>
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
                    <tr key={_id}>
                      <td>
                        <input type="checkbox" className="accent-[#0178ff]" />
                      </td>
                      <td>{name}</td>
                      <td>{email}</td>
                      <td>{phone}</td>
                      <td>{leadSource}</td>
                      <td>{leadStatus}</td>
                      <td>{assignedTo}</td>
                    </tr>
                  ),
                )}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  )
}
