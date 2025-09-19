import { useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
interface Experience {
  uniqId: string;
  title: string;
  company: string;
  location: string;
  startDate: string;
  endDate: string;
  current: boolean;
  description: string;
}
export default function ExperienceCreateForm({
  experience,
  onClose,
  onSave,
}: {
  experience: Experience | null;
  onClose: () => void;
  onSave: (data: Partial<Experience>) => void;
}) {
  const [key, SetKey] = useState<string[]>([]);
  const [Data, setData] = useState({
    uniqId: experience?.uniqId || crypto.randomUUID(),
    title: experience?.title || "",
    company: experience?.company || "",
    location: experience?.location || "",
    startDate: experience?.startDate || "",
    endDate: experience?.endDate || "",
    current: experience?.current || false,
    description: experience?.description || "",
  });
  const handleAddKeyProject = (e: React.FormEvent) => {
    console.log(key);
  };
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({ ...Data });
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="title">Job Title</Label>
          <Input
            id="title"
            name="title"
            value={Data.title}
            onChange={handleChange}
            placeholder=""
            className="dark:bg-transparent dark:border-2 dark:border-gray-700"
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="company">Company</Label>
          <Input
            id="company"
            name="company"
            value={Data.company}
            onChange={handleChange}
            placeholder=""
            className="dark:bg-transparent dark:border-2 dark:border-gray-700"
            required
          />
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="location">Location</Label>
        <Input
          id="location"
          name="location"
          value={Data.location}
          onChange={handleChange}
          placeholder=""
          className="dark:bg-transparent dark:border-2 dark:border-gray-700"
          required
        />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="startDate">Start Date</Label>
          <Input
            id="startDate"
            name="startDate"
            value={Data.startDate}
            onChange={handleChange}
            className="dark:bg-transparent dark:border-2 dark:border-gray-700"
            placeholder=""
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="endDate">End Date</Label>
          <Input
            id="endDate"
            name="endDate"
            value={Data.endDate}
            onChange={handleChange}
            disabled={Data.current}
            className="dark:bg-transparent dark:border-2 dark:border-gray-700"
            placeholder=""
          />
        </div>
      </div>
      <div className="flex items-center space-x-2">
        <input
          type="checkbox"
          id="exp-current"
          checked={Data.current}
          onChange={(e) =>
            setData({
              ...Data,
              current: e.target.checked,
              endDate: e.target.checked ? "" : Data.endDate,
            })
          }
          className="rounded border-gray-300"
        />
        <Label htmlFor="exp-current">I currently work here</Label>
      </div>
      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          name="description"
          value={Data.description}
          onChange={handleChange}
          placeholder="Describe your studies, achievements, relevant coursework..."
          className="dark:bg-transparent dark:border-2 dark:border-gray-700"
          rows={10}
          required
        />
      </div>
      <div className="flex justify-end gap-2 pt-4">
        <Button
          type="button"
          variant="outline"
          className="dark:bg-neutral-100 dark:text-slate-900"
          onClick={onClose}
        >
          Cancel
        </Button>
        <Button
          type="submit"
          className="bg-indigo-600 hover:bg-indigo-700 text-neutral-200"
        >
          Add Experience
        </Button>
      </div>
    </form>
  );
}
