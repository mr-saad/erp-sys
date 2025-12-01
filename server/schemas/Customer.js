import mongoose from "mongoose"

const CustomerSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: Number, required: true },
    address: { type: String, required: true },
    category: { type: String, required: true, enum: ["Retail", "Wholesale"] },
    type: { type: String, required: true, enum: ["Individual", "Business"] },
    status: {
      type: String,
      required: true,
      enum: ["Active", "Inactive", "New"],
    },
  },
  { timestamps: true },
)
export default mongoose.model("Customer", CustomerSchema)
