import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
interface Skill {
  uniqId: string;
  name: string;
  category: string;
}
export default function SkillEditForm({
  skill,
  onClose,
  onSave,
}: {
  skill: Skill | null;
  onClose: () => void;
  onSave: (data: Partial<Skill>) => void;
}) {
  const [Data, setData] = useState({
    uniqId: skill?.uniqId,
    name: skill?.name || "",
    category: skill?.category || "",
  });
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
      <div className="space-y-2">
        <Label htmlFor="name">Skill name</Label>
        <Input
          id="name"
          name="name"
          value={Data.name}
          onChange={handleChange}
          placeholder=""
          className="dark:bg-transparent dark:border-2 dark:border-gray-700"
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="category">category</Label>
        <select
          name="category"
          className="px-3 py-2 w-full border rounded-md"
          value={Data.category}
          onChange={(e) => setData({ ...Data, category: e.target.value })}
        >
          <option value="Frontend">Frontend</option>
          <option value="Backend">Backend</option>
          <option value="Language">Language</option>
          <option value="Database">Database</option>
          <option value="Tool">Tool</option>
          <option value="Styling">Styling</option>
        </select>
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
          Edit Skill
        </Button>
      </div>
    </form>
  );
}
