import express from "express"
import mongoose from "mongoose"
import cors from "cors"

const app = express()
mongoose.connect(
  "mongodb+srv://sxvd:rvtxerpsys@cluster0.p7ptlxi.mongodb.net/?appName=Cluster0",
)

const LeadSchema = new mongoose.Schema(
  {
    name: String,
    email: String,
    phone: Number,
    leadSource: String,
    leadStatus: String,
    assignedTo: String,
  },
  { timestamps: true },
)
const UserSchema = new mongoose.Schema({
  username: String,
  email: String,
  password: String,
})

const Lead = mongoose.model("Lead", LeadSchema)
const User = mongoose.model("User", UserSchema)

app.use(express.json())
app.use(cors())

app.post("/create-user", async (req, res) => {
  const create = await new User(req.body).save()
  if (create._id) res.status(200).send("User Created")
  else res.status(500).send("Error creating User")
})

app.post("/login", async (req, res) => {
  const found = await User.findOne({
    username: req.body.username,
  })
  console.log(found)
  if (found._id) res.status(200).send({ user: found })
  else res.status(500).send("Unauthorized")
})

app.post("/create-lead", async (req, res) => {
  const create = await new Lead(req.body).save()
  if (create._id) res.status(200).send("Inserted")
  else res.status(500).send("Error creating lead")
})
app.get("/leads", async (req, res) => {
  const leads = await Lead.find()
  res.status(200).send(leads)
})

app.listen(4000, () => {
  console.log("Listening on 4000")
})
