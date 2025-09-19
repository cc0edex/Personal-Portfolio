import mongoose from "mongoose";
// Format function
function formatDate(date: Date): string {
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  }); // e.g., "May 15, 2023"
}

export interface IProject extends Document {
  title: string;
  description: string;
  image: { url: string; public_id: string };
  tags: string[];
  liveUrl: string;
  githubUrl: string;
  featured: boolean;
  createdAt: string; // formatted date
}
const Schema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    url: { type: String, required: true },
    public_id: { type: String, required: true },
  },
  tags: {
    type: [String],
    required: true,
  },
  liveUrl: {
    type: String,
    required: true,
  },
  githubUrl: {
    type: String,
    required: true,
  },
  featured: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: String,
    default: () => formatDate(new Date()),
  },
});
const ProjectsModel =
  mongoose.models.projects || mongoose.model<IProject>("projects", Schema);
export default ProjectsModel;
