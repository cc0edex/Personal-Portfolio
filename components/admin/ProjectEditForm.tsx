import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
interface Project {
  _id: string;
  title: string;
  description: string;
  tags: string[];
  liveUrl?: string;
  githubUrl?: string;
  featured: boolean;
}
export default function ProjectEditForm({
  project,
  onClose,
  onSave,
}: {
  project: Project | null;
  onClose: () => void;
  onSave: () => void;
}) {
  const [Data, setData] = useState({
    _id: project?._id || "",
    title: project?.title || "",
    description: project?.description || "",
    tags: project?.tags.join(", ") || "",
    liveUrl: project?.liveUrl || "",
    githubUrl: project?.githubUrl || "",
    featured: project?.featured || false,
  });
  const [image, setImage] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData();
    formData.append("_id", Data._id);
    formData.append("title", Data.title);
    formData.append("description", Data.description);
    if (image) {
      formData.append("image", image);
    }
    formData.append("tags", Data.tags);
    formData.append("liveUrl", Data.liveUrl);
    formData.append("githubUrl", Data.githubUrl);
    formData.append("featured", Data.featured ? "true" : "false");
    const response = await fetch("/api/projects", {
      method: "PUT",
      body: formData,
    });
    if (response.ok) {
      await console.log("Project Edited");
    } else {
      await console.log("Project NOT Edited");
    }
    onSave();
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
        <Label htmlFor="title">Project Title</Label>
        <Input
          id="title"
          name="title"
          value={Data.title}
          onChange={handleChange}
          placeholder="My Awesome Project"
          className="dark:bg-transparent dark:border-2 dark:border-gray-700"
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          name="description"
          value={Data.description}
          onChange={handleChange}
          placeholder="Brief description of your project"
          className="dark:bg-transparent dark:border-2 dark:border-gray-700"
          rows={3}
          required
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="liveUrl">Live Demo URL</Label>
          <Input
            id="liveUrl"
            name="liveUrl"
            value={Data.liveUrl}
            onChange={handleChange}
            className="dark:bg-transparent dark:border-2 dark:border-gray-700"
            placeholder="https://myproject.com"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="githubUrl">GitHub URL</Label>
          <Input
            id="githubUrl"
            name="githubUrl"
            value={Data.githubUrl}
            onChange={handleChange}
            className="dark:bg-transparent dark:border-2 dark:border-gray-700"
            placeholder="https://github.com/username/repo"
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="image">Project Image</Label>
        <Input
          id="image"
          name="image"
          type="file"
          accept="image/*"
          onChange={(e) => setImage(e.target.files?.[0] || null)}
          className="dark:bg-transparent dark:border-2 dark:border-gray-700"
          placeholder="https://example.com/project-image.jpg"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="tags">Technologies Used</Label>
        <Input
          id="tags"
          name="tags"
          value={Data.tags}
          onChange={handleChange}
          className="dark:bg-transparent dark:border-2 dark:border-gray-700"
          placeholder="React, TypeScript, Tailwind CSS"
        />
      </div>

      <div className="flex items-center space-x-2">
        <Switch
          checked={Data.featured}
          onCheckedChange={(checked) =>
            setData((prev) => ({ ...prev, featured: checked }))
          }
          className="data-[state=checked]:bg-indigo-600"
        />
        <Label>Featured Project</Label>
      </div>

      <div className="flex justify-end gap-2 pt-4">
        <Button
          type="button"
          onClick={onClose}
          variant="outline"
          className="dark:bg-neutral-100 dark:text-slate-900"
        >
          Cancel
        </Button>
        <Button
          type="submit"
          disabled={loading}
          className="bg-indigo-600 hover:bg-indigo-700 text-neutral-200"
        >
          {loading ? "Saving..." : "Edit Project"}
        </Button>
      </div>
    </form>
  );
}
