import { useMutation, useQuery } from "@tanstack/react-query"
import Navbar from "../components/Navbar"
import { baseUrl } from "../App"
import { Plus } from "lucide-react"
import { useState } from "react"
import queryClient from "../utils/queryClient"
import { Navigate } from "react-router"

export default function Products({ username, loggedIn, setLoggedIn }) {
  const { data, isPending, error, isError } = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const res = await fetch(baseUrl + "/products", {
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
    mutationFn: async (selectedProducts) => {
      const res = await fetch(baseUrl + "/delete-products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ selectedProducts }),
      })
      if (!res.ok) {
        throw new Error(await res.text())
      }
      return res.json()
    },
    onSuccess: (data) => {
      queryClient.setQueryData(["products"], data)
      setSelectedProducts([])
    },
  })

  const [showProductModal, setShowProductModal] = useState(false)
  const [selectedProducts, setSelectedProducts] = useState([])

  const handleSelect = (e) => {
    if (e.target.checked)
      setSelectedProducts((prev) => [...prev, e.target.getAttribute("dataid")])
    else
      setSelectedProducts((prev) =>
        prev.filter((id) => id !== e.target.getAttribute("dataid")),
      )
  }

  const ProductOps = () => {
    if (selectedProducts.length > 0) mutation.mutate(selectedProducts)
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
            <h1 className="text-2xl font-bold">Products</h1>
            <button
              onClick={() => setShowProductModal(true)}
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
                          const products = document.querySelectorAll("[dataid]")
                          if (e.target.checked) {
                            ;[...products].forEach((ld) => (ld.checked = true))
                            setSelectedProducts(
                              [...products].map((ld) =>
                                ld.getAttribute("dataid"),
                              ),
                            )
                          } else {
                            ;[...products].forEach((ld) => (ld.checked = false))
                            setSelectedProducts([])
                          }
                        }}
                        type="checkbox"
                        className="accent-[#0178ff] cursor-pointer"
                      />
                    </th>
                    <th>Name</th>
                    <th>Category</th>
                    <th>Price</th>
                    <th>SKU</th>
                    <th>Brand</th>
                    <th>Stock</th>
                    <th>Description</th>
                  </tr>
                </thead>
                <tbody>
                  {data &&
                    (data.length > 0 ? (
                      data.map(
                        ({
                          _id,
                          name,
                          category,
                          price,
                          sku,
                          brand,
                          stock,
                          description,
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
                            <td>{category}</td>
                            <td>{price}</td>
                            <td>
                              <span className="px-4 text-nowrap py-1 rounded-full bg-[#0178ff] text-white">
                                {sku}
                              </span>
                            </td>
                            <td>{brand}</td>
                            <td>{stock}</td>
                            <td>{description}</td>
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
                disabled={selectedProducts.length === 0}
                onClick={ProductOps}
                className="btn-danger mt-5 disabled:opacity-50"
              >
                Delete
              </button>
            )}
            {isPending && <p className="my-5">Loading</p>}
            {isError && (
              <p className="my-5 text-red-600">Error: {error.message}</p>
            )}
            {mutation.isPending && <p className="my-5">Deleting Products</p>}
            {mutation.isError && (
              <p className="my-5 text-red-600">Error: {error.message}</p>
            )}
          </div>
        </section>
      </main>
      {showProductModal && (
        <ProductModal setShowProductModal={setShowProductModal} />
      )}
    </div>
  )
}

function ProductModal({ setShowProductModal }) {
  const { mutate, isPending, error, isError } = useMutation({
    mutationFn: async (formData) => {
      const res = await fetch(baseUrl + "/create-Product", {
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
      queryClient.setQueryData(["products"], data)
      setShowProductModal(false)
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
        if (e.target === e.currentTarget) setShowProductModal(false)
      }}
      className="fixed z-3 grid items-center bg-black/20 top-0 left-0 w-full h-full"
    >
      <section className="shadow-md shadow-black/5 bg-white rounded-xl p-8 mb-10 max-w-md mx-auto">
        <h2 className="mb-5 text-xl font-bold">Create Product</h2>
        <form onSubmit={onSubmit}>
          <div className="grid gap-5 md:grid-cols-2 mb-5">
            <div>
              <label htmlFor="name">Name</label>
              <input
                id="name"
                name="name"
                type="text"
                required
                minLength={4}
                maxLength={20}
              />
            </div>
            <div>
              <label htmlFor="category">Category</label>
              <input id="category" name="category" type="text" required />
            </div>
            <div>
              <label htmlFor="price">Price</label>
              <input id="price" name="price" type="number" required />
            </div>
            <div>
              <label htmlFor="sku">SKU</label>
              <input id="sku" name="sku" type="text" required />
            </div>
            <div>
              <label htmlFor="brand">Brand</label>
              <input id="brand" name="brand" type="text" required />
            </div>
            <div>
              <label htmlFor="stock">Stock</label>
              <input id="stock" name="stock" type="number" required />
            </div>
            <div>
              <label htmlFor="description">Description</label>
              <input
                id="description"
                name="description"
                type="text"
                required
                maxLength={50}
              />
            </div>
          </div>
          <button disabled={isPending} className="btn disabled:opacity-50">
            Create
          </button>
        </form>
        {isPending && <p className="my-5">Creating Product</p>}
        {isError && <p className="my-5 text-red-600">Error: {error.message}</p>}
      </section>
    </div>
  )
}
