import mongoose from "mongoose";
const AdminSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});
const AdminModel =
  mongoose.models.admin || mongoose.model("admin", AdminSchema);
export default AdminModel;
