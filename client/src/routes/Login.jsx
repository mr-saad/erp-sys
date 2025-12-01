import { Navigate, useNavigate } from "react-router"
import { baseUrl } from "../App"

export default function Login({ setUsername, setLoggedIn, loggedIn }) {
  const navigate = useNavigate()
  const onSubmit = async (e) => {
    e.preventDefault()
    const formData = new FormData(e.target)
    const res = await fetch(baseUrl + "/login", {
      method: "POST",
      body: JSON.stringify(Object.fromEntries(formData)),
      headers: {
        "Content-Type": "application/json",
      },
    })
    if (res.status === 200) {
      const data = await res.json()
      setUsername(data.user.username)
      setLoggedIn(true)
      navigate("/", {
        replace: true,
      })
    } else {
      alert(await res.text())
    }
  }

  if (loggedIn) {
    return <Navigate to={"/dashboard"} />
  }
  return (
    <main className="bg-[#F5FAFF] p-8">
      <div className="bg-white p-8 max-w-md mx-auto shadow-md shadow-black/5 rounded-xl">
        <h1 className="font-bold text-3xl mb-5">Login</h1>
        <form onSubmit={onSubmit} className="max-w-md">
          <div className="mb-5">
            <label htmlFor="username">Username</label>
            <input
              required
              type="text"
              placeholder="john"
              name="username"
              id="username"
            />
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input required type="password" name="password" id="password" />
          </div>
          <button className="btn mt-5">Login</button>
        </form>
      </div>
      <div className="bg-white p-8 max-w-md mx-auto shadow-md shadow-black/5 rounded-xl mt-5">
        <p>Sample Users</p>
        <p>username: saad, password: sk@12345</p>
        <p>username: poweruser, password: power@12345</p>
      </div>
    </main>
  )
}
