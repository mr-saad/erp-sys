import {
  Grid2X2,
  LayoutDashboard,
  LayoutList,
  LogIn,
  LogOut,
  PieChart,
  Settings,
  User,
  Users,
} from "lucide-react"
import { Link, useLocation } from "react-router"

export default function Sidebar({ loggedIn }) {
  const { pathname } = useLocation()

  return (
    <aside className="px-8 py-5 bg-white md:min-h-screen">
      <Link to={"/dashboard"}>
        <h1 className="text-3xl font-bold mb-5 text-[#0178ff]">Revatix</h1>
      </Link>
      <ul>
        <li>
          <Link
            className={`${pathname === "/dashboard" ? "text-[#0178ff]" : ""}`}
            to="/dashboard"
          >
            <LayoutDashboard /> Dashboard
          </Link>
          <ul className="pl-5 ml-3 border-l border-[#0178FF] sub">
            <li>
              <Link
                className={`${
                  pathname === "/dashboard/analytics" ? "text-[#0178ff]" : ""
                }`}
                to="/dashboard/analytics"
              >
                <PieChart /> Analytics
              </Link>
            </li>
            <li>
              <Link
                className={`${
                  pathname === "/dashboard/leads" ? "text-[#0178ff]" : ""
                }`}
                to="/dashboard/leads"
              >
                <User /> Leads
              </Link>
            </li>
            <li>
              <Link
                className={`${
                  pathname === "/dashboard/customers" ? "text-[#0178ff]" : ""
                }`}
                to="/dashboard/customers"
              >
                <Users /> Customers
              </Link>
            </li>
            <li>
              <Link
                className={`${
                  pathname === "/dashboard/products" ? "text-[#0178ff]" : ""
                }`}
                to="/dashboard/products"
              >
                <Grid2X2 /> Products
              </Link>
            </li>
            <li>
              <Link
                className={`${
                  pathname === "/dashboard/list-view" ? "text-[#0178ff]" : ""
                }`}
                to="/dashboard/list-view"
              >
                <LayoutList /> List View
              </Link>
            </li>
          </ul>
        </li>
        <li>
          <Link
            className={`${
              pathname === "/dashboard/settings" ? "text-[#0178ff]" : ""
            }`}
            to="/dashboard/settings"
          >
            <Settings /> Settings
          </Link>
        </li>
        {/* {!loggedIn && (
          <li>
            <Link
              className={`${pathname === "/login" ? "text-[#0178ff]" : ""}`}
              to="/login"
            >
              <LogIn />
              Login
            </Link>
          </li>
        )} */}
      </ul>
    </aside>
  )
}
