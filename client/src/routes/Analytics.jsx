import {
  BadgeIndianRupee,
  EllipsisVertical,
  LineChart,
  TrendingUp,
  User,
} from "lucide-react"
import Navbar from "../components/Navbar"
import IndexLineChart from "../components/LineChart"
import { Navigate } from "react-router"

export default function Analytics({ username, loggedIn }) {
  if (!loggedIn) {
    return <Navigate to={"/login"} />
  }
  return (
    <div>
      <Navbar username={username} />
      <main className="p-8">
        <div className="grid gap-8 md:grid-cols-3">
          <div className="rounded-xl bg-white shadow-md shadow-black/5">
            <div className="flex gap-2 p-6">
              <span className="p-3 rounded-xl border border-[#81BCFF]">
                <TrendingUp color="#81BCFF" />
              </span>
              <div>
                <h2 className="text-xl font-bold">Total Sales</h2>
                <p className="text-[#707070]">1.65 &gt; 2.68</p>
              </div>
              <EllipsisVertical
                className="ml-auto cursor-pointer"
                color="#707070"
              />
            </div>
            <hr className="border-[#eee]" />
            <div className="flex justify-between items-center p-6">
              <span className="text-xl font-bold">46.2%</span>
              <LineChart className="cursor-pointer" />
            </div>
          </div>
          <div className="rounded-xl bg-white shadow-md shadow-black/5">
            <div className="flex gap-2 p-6">
              <span className="p-3 rounded-xl border border-[#81BCFF]">
                <BadgeIndianRupee color="#81BCFF" />
              </span>
              <div>
                <h2 className="text-xl font-bold">Total Expenses</h2>
                <p className="text-[#707070]">₹20,000 &lt; ₹9,000</p>
              </div>
              <EllipsisVertical
                className="ml-auto cursor-pointer"
                color="#707070"
              />
            </div>
            <hr className="border-[#eee]" />
            <div className="flex justify-between items-center p-6">
              <span className="text-xl font-bold">66.2%</span>
              <LineChart className="cursor-pointer" />
            </div>
          </div>
          <div className="rounded-xl bg-white shadow-md shadow-black/5 md:row-span-2">
            <div className="flex gap-2 p-6">
              <div>
                <h2 className="text-xl font-bold">Lead Status By Owner</h2>
                <p className="text-[#707070]">Saad Khatri</p>
              </div>
              <EllipsisVertical
                className="ml-auto cursor-pointer"
                color="#707070"
              />
            </div>
            <hr className="border-[#eee]" />
            <div className="p-6">
              <div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="inline-block p-3 rounded-full border border-[#81BCFF]">
                      <User color="#81BCFF" />
                    </span>
                    <span>John Doe</span>
                  </div>
                  <span className="px-4 py-1 rounded-xl text-white bg-[#0178ff]">
                    36
                  </span>
                </div>
                <progress max={100} value={36} className="w-full h-1">
                  36
                </progress>
                <hr className="border-[#eee] my-2" />
              </div>
              <div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="inline-block p-3 rounded-full border border-[#81BCFF]">
                      <User color="#81BCFF" />
                    </span>
                    <span>Ezio Auditore</span>
                  </div>
                  <span className="px-4 py-1 rounded-xl text-white bg-[#0178ff]">
                    64
                  </span>
                </div>
                <progress max={100} value={64} className="w-full h-1">
                  64
                </progress>
                <hr className="border-[#eee] my-2" />
              </div>
              <div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="inline-block p-3 rounded-full border border-[#81BCFF]">
                      <User color="#81BCFF" />
                    </span>
                    <span>Federico Auditore</span>
                  </div>
                  <span className="px-4 py-1 rounded-xl text-white bg-[#0178ff]">
                    24
                  </span>
                </div>
                <progress max={100} value={24} className="w-full h-1">
                  24
                </progress>
              </div>
            </div>
          </div>
          <div className="rounded-xl p-6 bg-white shadow-md shadow-black/5 md:row-start-2 md:col-span-2">
            <IndexLineChart />
          </div>
        </div>
      </main>
    </div>
  )
}
