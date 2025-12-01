import { BellDot, LogOut, Search, Sidebar, User } from "lucide-react"
import { useState } from "react"

export default function Navbar({ setLoggedIn, username }) {
  const [showDropdown, setShowDropdown] = useState(false)
  return (
    <nav className="py-5 px-8 bg-white flex gap-5 justify-between items-center">
      <Sidebar
        onClick={() => {
          const aside = document.querySelector("aside"),
            main = document.querySelector(".main_container")
          aside.classList.toggle("hidden")
          main.classList.toggle("!grid-cols-1")
        }}
        className="cursor-pointer"
      />
      <div className="flex items-center">
        <div className="flex gap-5 mr-5">
          <Search className="cursor-pointer" />
          <BellDot className="cursor-pointer" />
        </div>
        <span className="text-[#ddd]">|</span>
        <div
          className="relative"
          onClick={() => setShowDropdown((prev) => !prev)}
        >
          <button className="p-2 cursor-pointer flex gap-2 rounded-md transition hover:outline-2 outline-[#D8EAFF]">
            <User /> {username}
          </button>
          {showDropdown && (
            <div className="mt-5 z-2 rounded-md p-4 absolute top-[70%] right-0 bg-white border border-[#ddd]">
              <button
                onClick={() => setLoggedIn(false)}
                className="flex gap-1 btn-danger"
              >
                <LogOut />
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  )
}
