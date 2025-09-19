import mongoose from "mongoose";
// Format function
function formatDate(date: Date): string {
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    }); // e.g., "May 15, 2023"
  }
  
  export interface IBlog extends Document {
    title: string;
    excerpt: string;
    date: string; // formatted date
    slug: string;
    categories: string[];
    content: string;
  }
  
const Schema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    excerpt: {
        type: String,
        required: true,
    },
    date: {
        type: String,
        default: () => formatDate(new Date()),
    },
    slug: {
        type: String,
        required: true,
    },
    categories: {
        type: [String],
        required: true,
    },
    content: {
        type: String,
        required: true,
    }
})
const BlogModel = mongoose.models.blogs || mongoose.model<IBlog>('blogs', Schema);
export default BlogModel;