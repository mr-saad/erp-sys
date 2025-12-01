import { useQuery } from "@tanstack/react-query"
import { baseUrl } from "../App"

export default function ListViewSection({ title, url }) {
  const { data, isPending, error, isError } = useQuery({
    queryKey: [url],
    queryFn: async () => {
      const res = await fetch(baseUrl + `/${url}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      })
      if (!res.ok) {
        throw new Error(await res.text())
      }
      return res.json()
    },
  })

  const keys = Object.keys((data && data[0]) || {})
  keys.shift()
  keys.pop()
  keys.pop()
  keys.pop()
  return (
    <section className="min-w-0">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">{title}</h1>
      </div>
      <div className="mt-5 p-8 bg-white shadow-md shadow-black/5 rounded-xl">
        <input type="text" placeholder="Search" className="px-4 py-2 mb-5" />
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="capitalize">
                {keys && keys.map((key) => <th key={key}>{key}</th>)}
              </tr>
            </thead>
            <tbody>
              {data &&
                (data.length > 0 ? (
                  data.map((record) => {
                    const values = Object.values(record)
                    values.shift()
                    values.pop()
                    values.pop()
                    values.pop()
                    return (
                      <tr key={record._id}>
                        {values.map((item) => (
                          <td key={item}>{item}</td>
                        ))}
                      </tr>
                    )
                  })
                ) : (
                  <tr>
                    <td>No Records</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>

        {isPending && <p className="my-5">Loading</p>}
        {isError && <p className="my-5 text-red-600">Error: {error.message}</p>}
      </div>
    </section>
  )
}
