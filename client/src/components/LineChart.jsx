import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts"

// #region Sample data
const data = [
  {
    name: "A",
    uv: 300,
    pv: 240,
    amt: 2400,
  },
  {
    name: "B",
    uv: 200,
    pv: 86,
    amt: 2400,
  },
  {
    name: "C",
    uv: 300,
    pv: 239,
    amt: 2400,
  },
  {
    name: "D",
    uv: 300,
    pv: 180,
    amt: 2400,
  },
  {
    name: "E",
    uv: 478,
    pv: 390,
    amt: 2400,
  },
  {
    name: "F",
    uv: 289,
    pv: 180,
    amt: 2400,
  },
]

// #endregion

export default function IndexLineChart() {
  return (
    <LineChart
      style={{
        width: "100%",
        aspectRatio: 1.618,
        maxWidth: 800,
        margin: "auto",
      }}
      responsive
      data={data}
    >
      <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
      <XAxis dataKey="name" />
      <YAxis width="auto" />
      <Line type="bump" dataKey="uv" stroke="#8884d8" />
      <Line type="bump" dataKey="pv" stroke="#82ca9d" />
    </LineChart>
  )
}
