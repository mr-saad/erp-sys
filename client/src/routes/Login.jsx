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
      console.log(data)
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
    return <Navigate to={"/"} />
  }
  return (
    <main className="bg-[#F5FAFF] p-8">
      <h1 className="font-bold text-3xl">Login</h1>
      <form onSubmit={onSubmit} className="max-w-md">
        <div className="mb-5">
          <label htmlFor="username">Username</label>
          <input required type="text" name="username" id="username" />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input required type="password" name="password" id="password" />
        </div>
        <button className="btn mt-5">Login</button>
      </form>
      <p>Sample Users</p>
      <p>username: saad, password: sk@12345</p>
      <p>username: poweruser, password: power@12345</p>
    </main>
  )
}
