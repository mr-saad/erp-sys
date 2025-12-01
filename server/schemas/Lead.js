import mongoose from "mongoose"

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
export default mongoose.model("Lead", LeadSchema)
