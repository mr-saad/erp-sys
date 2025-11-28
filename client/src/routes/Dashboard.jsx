import Navbar from "../components/Navbar"
import { baseUrl } from "../App"
import { Navigate } from "react-router"

export default function Dashboard({ loggedIn, username }) {
  console.log(loggedIn)
  if (!loggedIn) {
    return <Navigate to={"/login"} />
  }
  const onSubmit = async (e) => {
    e.preventDefault()
    const formData = new FormData(e.target)
    const res = await fetch(baseUrl + "/create-lead", {
      method: "POST",
      body: JSON.stringify(Object.fromEntries(formData)),
      headers: {
        "Content-Type": "application/json",
      },
    })
    if (res.status === 200) {
      alert("Lead Created")
      e.target.reset()
    }
  }
  return (
    <div>
      <Navbar username={username} />
      <main className="p-8">
        <section className="shadow-md shadow-black/5 bg-white rounded-xl p-8">
          <h2 className="mb-5 text-xl font-bold">Create Lead</h2>
          <form onSubmit={onSubmit}>
            <div className="grid gap-5 md:grid-cols-3 mb-5">
              <div>
                <label htmlFor="name">Name</label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="John"
                  required
                  minLength={4}
                  maxLength={20}
                />
              </div>
              <div>
                <label htmlFor="email">E-Mail</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="john@gmail.com"
                  required
                />
              </div>
              <div>
                <label htmlFor="phone">Phone</label>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  placeholder=""
                  required
                  minLength={10}
                  maxLength={10}
                />
              </div>
              <div>
                <label htmlFor="leadSource">Lead Source</label>
                <input
                  id="leadSource"
                  name="leadSource"
                  type="text"
                  placeholder=""
                  required
                />
              </div>
              <div>
                <label htmlFor="leadStatus">Lead Status</label>
                <input
                  id="leadStatus"
                  name="leadStatus"
                  type="text"
                  placeholder=""
                  required
                />
              </div>
              <div>
                <label htmlFor="assigned">Assgined to</label>
                <input
                  id="assigned"
                  name="assignedTo"
                  type="text"
                  placeholder="Doe"
                  required
                  minLength={4}
                  maxLength={20}
                />
              </div>
            </div>
            <button className="btn">Create</button>
          </form>
        </section>
      </main>
    </div>
  )
}
