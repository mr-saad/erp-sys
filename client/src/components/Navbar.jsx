import { BellDot, Search, User } from "lucide-react"

export default function Navbar({ username }) {
  return (
    <nav className="p-8 bg-white flex gap-5 md:justify-end items-center">
      <div className="flex gap-5">
        <Search className="cursor-pointer" />
        <BellDot className="cursor-pointer" />
      </div>
      <span className="text-[#ddd]">|</span>
      <button className="p-2 cursor-pointer flex gap-2 rounded-md transition hover:outline-2 outline-[#D8EAFF]">
        <User /> {username}
      </button>
    </nav>
  )
}
