import mongoose from "mongoose";
// Format function
function formatDate(date: Date): string {
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  }); // e.g., "May 15, 2023"
}
export interface IMESSAGES extends Document {
  name: string;
  email: string;
  subject: string;
  message: string;
  date: string; // formatted date
}
const MessagesSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  subject: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    default: () => formatDate(new Date()),
  },
});
const MessagesModel =
  mongoose.models.messeges ||
  mongoose.model<IMESSAGES>("messeges", MessagesSchema);
export default MessagesModel;
