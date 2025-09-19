import { useState } from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
interface Interests {
  uniqId: string;
  interest: string;
}
export default function InterestsCreateForm({
  interest,
  onClose,
  onSave,
}: {
  interest: Interests | null;
  onClose: () => void;
  onSave: (data: Partial<Interests>) => void;
}) {
  const [Data, setData] = useState({
    uniqId: interest?.uniqId || crypto.randomUUID(),
    interest: interest?.interest || "",
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
        <Label htmlFor="interest">Interests Or Hobbies</Label>
        <Input
          id="interest"
          name="interest"
          value={Data.interest}
          onChange={handleChange}
          placeholder=""
          className="dark:bg-transparent dark:border-2 dark:border-gray-700"
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
          Add Interest
        </Button>
      </div>
    </form>
  );
}
