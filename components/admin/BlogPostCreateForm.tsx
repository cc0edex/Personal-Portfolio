import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
interface BlogPost {
  _id: string;
  title: string;
  excerpt: string;
  date: string;
  slug: string;
  categories: string[];
  content: string;
}
export default function BlogPostCreateForm({
  post,
  onClose,
  onSave,
}: {
  post: BlogPost | null;
  onClose: () => void;
  onSave: () => void;
}) {
  const editorRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [Data, setData] = useState({
    title: post?.title || "",
    excerpt: post?.excerpt || "",
    date: post?.date || "",
    content: post?.content || "",
    categories: post?.categories.join(", ") || "",
  });
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData();
    formData.append("title", Data.title);
    formData.append("excerpt", Data.excerpt);
    formData.append("content", Data.content);
    formData.append("date", Data.date);
    formData.append("categories", Data.categories);
    const response = await fetch("/api/blogs", {
      method: "POST",
      body: formData,
    });
    if (response.ok) {
      await console.log("Blog Created");
      onSave();
    } else {
      await console.log("Blog NOT Created");
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="title">Title</Label>
        <Input
          id="title"
          name="title"
          value={Data.title}
          onChange={handleChange}
          placeholder="Post title"
          className="dark:bg-transparent dark:border-2 dark:border-gray-700"
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="excerpt">Excerpt</Label>
        <Textarea
          id="excerpt"
          name="excerpt"
          value={Data.excerpt}
          onChange={handleChange}
          placeholder="Brief description of the post"
          className="dark:bg-transparent dark:border-2 dark:border-gray-700"
          rows={3}
          required
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="categories">Categories</Label>
          <Input
            id="categories"
            name="categories"
            className="dark:bg-transparent dark:border-2 dark:border-gray-700"
            value={Data.categories}
            onChange={handleChange}
            placeholder="React, JavaScript, Web Development"
          />
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="content">Content</Label>
        <Textarea
          id="content"
          name="content"
          className="dark:bg-transparent dark:border-2 dark:border-gray-700"
          value={Data.content}
          onChange={handleChange}
          placeholder="Write your blog post content here..."
          rows={10}
          required
        />
      </div>

      <div className="flex justify-end gap-2 pt-4">
        <Button
          type="button"
          variant="outline"
          className="dark:bg-neutral-200 dark:text-slate-900"
          onClick={onClose}
        >
          Cancel
        </Button>
        <Button
          type="submit"
          disabled={loading}
          className="bg-indigo-600 hover:bg-indigo-700 text-neutral-200"
        >
          {loading ? "Saving..." : "Create Post"}
        </Button>
      </div>
    </form>
  );
}
