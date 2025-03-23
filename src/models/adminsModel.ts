import mongoose from "mongoose";

const adminsSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
  },
});

const Admin = mongoose.models.admins || mongoose.model("admins", adminsSchema);

export default Admin;
