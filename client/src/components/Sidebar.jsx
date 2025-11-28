import {
  LayoutDashboard,
  LayoutList,
  LogIn,
  LogOut,
  PieChart,
  Settings,
  User,
} from "lucide-react"
import { Link, useLocation } from "react-router"

export default function Sidebar({ loggedIn, setLoggedIn }) {
  const { pathname } = useLocation()

  return (
    <aside className="p-8 bg-white md:min-h-screen">
      <h1 className="text-3xl font-bold mb-5">Revatix</h1>
      <ul>
        <li>
          <Link
            className={`${pathname === "/" ? "text-[#0178ff]" : ""}`}
            to="/"
          >
            <LayoutDashboard /> Dashboard
          </Link>
          <ul className="pl-5 ml-3 border-l border-[#0178FF] sub">
            <li>
              <Link
                className={`${
                  pathname === "/analytics" ? "text-[#0178ff]" : ""
                }`}
                to="/analytics"
              >
                <PieChart /> Analytics
              </Link>
            </li>
            <li>
              <Link
                className={`${pathname === "/leads" ? "text-[#0178ff]" : ""}`}
                to="/leads"
              >
                <User /> Leads
              </Link>
            </li>
            <li>
              <Link
                className={`${
                  pathname === "/list-view" ? "text-[#0178ff]" : ""
                }`}
                to="/list-view"
              >
                <LayoutList /> List View
              </Link>
            </li>
          </ul>
        </li>
        <li>
          <Link
            className={`${pathname === "/settings" ? "text-[#0178ff]" : ""}`}
            to="/settings"
          >
            <Settings /> Settings
          </Link>
        </li>
        {loggedIn ? (
          <li>
            <Link onClick={() => setLoggedIn(false)} to="#">
              <LogOut />
              Logout
            </Link>
          </li>
        ) : (
          <li>
            <Link
              className={`${pathname === "/login" ? "text-[#0178ff]" : ""}`}
              to="/login"
            >
              <LogIn />
              Login
            </Link>
          </li>
        )}
      </ul>
    </aside>
  )
}
