import Navbar from "../components/Navbar"
import ListViewSection from "../components/ListViewSection"

export default function ListView({ username, loggedIn, setLoggedIn }) {
  if (!loggedIn) {
    return <Navigate to={"/"} />
  }
  return (
    <div>
      <Navbar username={username} setLoggedIn={setLoggedIn} />
      <main className="p-8">
        <div className="grid gap-10">
          <ListViewSection title={"Leads"} url={"leads"} />
          <ListViewSection title={"Customers"} url={"customers"} />
          <ListViewSection title={"Products"} url={"products"} />
        </div>
      </main>
    </div>
  )
}
