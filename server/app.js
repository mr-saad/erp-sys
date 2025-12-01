import express from "express"
import mongoose from "mongoose"
import cors from "cors"
import Lead from "./schemas/Lead.js"
import Product from "./schemas/Product.js"
import Customer from "./schemas/Customer.js"
import User from "./schemas/User.js"

const app = express()
mongoose.connect(
  "mongodb+srv://sxvd:rvtxerpsys@cluster0.p7ptlxi.mongodb.net/?appName=Cluster0",
)

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
  if (found._id) res.status(200).send({ user: found })
  else res.status(500).send("Unauthorized")
})

// leads
app.post("/delete-leads", async (req, res) => {
  try {
    const leadPromises = req.body.selectedLeads.map((lead) =>
      Lead.findByIdAndDelete(lead),
    )
    await Promise.all(leadPromises)
    res.status(200).send(await Lead.find())
  } catch (error) {
    res.status(400).send(error.message)
    throw new Error(error.message)
  }
})
app.post("/create-lead", async (req, res) => {
  try {
    await new Lead(req.body).save()
    res.status(200).send(await Lead.find())
  } catch (error) {
    res.status(400).send(error.message)
    throw new Error(error.message)
  }
})
app.get("/leads", async (req, res) => {
  try {
    const leads = await Lead.find()
    res.status(200).send(leads)
  } catch (error) {
    res.status(400).send(error.message)
    throw new Error(error.message)
  }
})

// products
app.post("/create-product", async (req, res) => {
  try {
    await new Product(req.body).save()
    res.status(200).send(await Product.find())
  } catch (error) {
    res.status(400).send(error.message)
    throw new Error(error.message)
  }
})
app.post("/delete-products", async (req, res) => {
  try {
    const productPromises = req.body.selectedProducts.map((product) =>
      Product.findByIdAndDelete(product),
    )
    await Promise.all(productPromises)
    res.status(200).send(await Product.find())
  } catch (error) {
    res.status(400).send(error.message)
    throw new Error(error.message)
  }
})
app.get("/products", async (req, res) => {
  try {
    const products = await Product.find()
    res.status(200).send(products)
  } catch (error) {
    res.status(400).send(error.message)
    throw new Error(error.message)
  }
})

// customers
app.post("/create-customer", async (req, res) => {
  try {
    await new Customer(req.body).save()
    res.status(200).send(await Customer.find())
  } catch (error) {
    res.status(400).send(error.message)
    throw new Error(error.message)
  }
})
app.post("/delete-customers", async (req, res) => {
  try {
    const customerPromises = req.body.selectedCustomers.map((customer) =>
      Customer.findByIdAndDelete(customer),
    )
    await Promise.all(customerPromises)
    res.status(200).send(await Customer.find())
  } catch (error) {
    res.status(400).send(error.message)
    throw new Error(error.message)
  }
})
app.get("/customers", async (req, res) => {
  try {
    const customers = await Customer.find()
    res.status(200).send(customers)
  } catch (error) {
    res.status(400).send(error.message)
    throw new Error(error.message)
  }
})

app.listen(4000, () => {
  console.log("Listening on 4000")
})
