import { useMutation, useQuery } from "@tanstack/react-query"
import Navbar from "../components/Navbar"
import { baseUrl } from "../App"
import { Plus } from "lucide-react"
import { useState } from "react"
import queryClient from "../utils/queryClient"
import { Navigate } from "react-router"

export default function Customers({ username, loggedIn, setLoggedIn }) {
  const { data, isPending, error, isError } = useQuery({
    queryKey: ["customers"],
    queryFn: async () => {
      const res = await fetch(baseUrl + "/customers", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      })
      if (!res.ok) {
        throw new Error(await res.text())
      }
      return res.json()
    },
  })
  const mutation = useMutation({
    mutationFn: async (selectedCustomers) => {
      const res = await fetch(baseUrl + "/delete-customers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ selectedCustomers }),
      })
      if (!res.ok) {
        throw new Error(await res.text())
      }
      return res.json()
    },
    onSuccess: (data) => {
      queryClient.setQueryData(["customers"], data)
      setSelectedCustomers([])
      document.querySelector(".allCheck").checked = false
    },
  })

  const [showCustomerModal, setShowCustomerModal] = useState(false)
  const [selectedCustomers, setSelectedCustomers] = useState([])

  const handleSelect = (e) => {
    if (e.target.checked)
      setSelectedCustomers((prev) => [...prev, e.target.getAttribute("dataid")])
    else
      setSelectedCustomers((prev) =>
        prev.filter((id) => id !== e.target.getAttribute("dataid")),
      )
  }

  const customerOps = () => {
    if (selectedCustomers.length > 0) mutation.mutate(selectedCustomers)
  }
  if (!loggedIn) {
    return <Navigate to={"/"} />
  }
  return (
    <div className="min-w-0">
      <Navbar username={username} setLoggedIn={setLoggedIn} />
      <main className="p-8">
        <section>
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold">Customers</h1>
            <button
              onClick={() => setShowCustomerModal(true)}
              className="btn flex gap-1"
            >
              <Plus />
              Add
            </button>
          </div>
          <div className="mt-5 p-8 bg-white shadow-md shadow-black/5 rounded-xl">
            <input
              type="text"
              placeholder="Search"
              className="px-4 py-2 mb-5"
            />
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr>
                    <th>
                      <input
                        onChange={(e) => {
                          const customers =
                            document.querySelectorAll("[dataid]")
                          if (e.target.checked) {
                            ;[...customers].forEach((ld) => (ld.checked = true))
                            setSelectedCustomers(
                              [...customers].map((ld) =>
                                ld.getAttribute("dataid"),
                              ),
                            )
                          } else {
                            ;[...customers].forEach(
                              (ld) => (ld.checked = false),
                            )
                            setSelectedCustomers([])
                          }
                        }}
                        type="checkbox"
                        className="accent-[#0178ff] cursor-pointer allCheck"
                      />
                    </th>
                    <th>Name</th>
                    <th>E-Mail</th>
                    <th>Phone</th>
                    <th>Address</th>
                    <th>Category</th>
                    <th>Type</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {data &&
                    (data.length > 0 ? (
                      data.map(
                        ({
                          _id,
                          name,
                          email,
                          phone,
                          address,
                          category,
                          type,
                          status,
                        }) => (
                          <tr key={_id}>
                            <td>
                              <input
                                onChange={handleSelect}
                                type="checkbox"
                                dataid={_id}
                                className="accent-[#0178ff] cursor-pointer"
                              />
                            </td>
                            <td>{name}</td>
                            <td>{email}</td>
                            <td>{phone}</td>
                            <td>{address}</td>
                            <td>{category}</td>
                            <td>{type}</td>
                            <td>
                              <span className="px-4 py-1 rounded-full bg-[#0178ff] text-white">
                                {status}
                              </span>
                            </td>
                          </tr>
                        ),
                      )
                    ) : (
                      <tr>
                        <td>No Records</td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
            {data && data.length > 0 && (
              <button
                disabled={selectedCustomers.length === 0}
                onClick={customerOps}
                className="btn-danger mt-5 disabled:opacity-50"
              >
                Delete
              </button>
            )}
            {isPending && <p className="my-5">Loading</p>}
            {isError && (
              <p className="my-5 text-red-600">Error: {error.message}</p>
            )}
            {mutation.isPending && <p className="my-5">Deleting Customers</p>}
            {mutation.isError && (
              <p className="my-5 text-red-600">
                Error: {mutation.error.message}
              </p>
            )}
          </div>
        </section>
      </main>
      {showCustomerModal && (
        <CustomerModal setShowCustomerModal={setShowCustomerModal} />
      )}
    </div>
  )
}

function CustomerModal({ setShowCustomerModal }) {
  const { mutate, isPending, error, isError } = useMutation({
    mutationFn: async (formData) => {
      const res = await fetch(baseUrl + "/create-customer", {
        method: "POST",
        body: JSON.stringify(Object.fromEntries(formData)),
        headers: {
          "Content-Type": "application/json",
        },
      })
      if (!res.ok) {
        throw new Error(await res.text())
      }
      return res.json()
    },
    onSuccess: (data) => {
      queryClient.setQueryData(["customers"], data)
      setShowCustomerModal(false)
    },
  })

  const onSubmit = async (e) => {
    e.preventDefault()
    const formData = new FormData(e.target)
    mutate(formData)
  }
  return (
    <div
      onClick={(e) => {
        if (e.target === e.currentTarget) setShowCustomerModal(false)
      }}
      className="fixed z-3 grid items-center bg-black/20 top-0 left-0 w-full h-full"
    >
      <section className="shadow-md shadow-black/5 bg-white rounded-xl p-8 mb-10 max-w-md mx-auto">
        <h2 className="mb-5 text-xl font-bold">Create Customer</h2>
        <form onSubmit={onSubmit}>
          <div className="grid gap-5 md:grid-cols-2 mb-5">
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
                placeholder="1234567890"
                required
                minLength={10}
                maxLength={10}
              />
            </div>
            <div>
              <label htmlFor="address">Address</label>
              <input id="address" name="address" type="text" required />
            </div>
            <div>
              <label htmlFor="category">Category</label>
              <select id="category" name="category" required>
                <option value="Retail">Retail</option>
                <option value="Wholesale">Wholesale</option>
              </select>
            </div>
            <div>
              <label htmlFor="type">Type</label>
              <select id="type" name="type" required>
                <option value="Individual">Individual</option>
                <option value="Business">Business</option>
              </select>
            </div>
            <div>
              <label htmlFor="status">Status</label>
              <select id="status" name="status" required>
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
                <option value="New">New</option>
              </select>
            </div>
          </div>
          <button disabled={isPending} className="btn disabled:opacity-50">
            Create
          </button>
        </form>
        {isPending && <p className="my-5">Creating Customer</p>}
        {isError && <p className="my-5 text-red-600">Error: {error.message}</p>}
      </section>
    </div>
  )
}
