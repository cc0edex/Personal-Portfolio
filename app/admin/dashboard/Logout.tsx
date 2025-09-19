"use client";
import { LogOut } from "lucide-react";
import { useRouter } from "next/navigation";

export default function Logout() {
  const router = useRouter();

  async function handleLogout() {
    // Call API to clear cookie
    await fetch("/api/admin/logout", { method: "POST" });

    // Redirect user to login page (or homepage)
    router.refresh();
  }

  return (
    <button
      onClick={handleLogout}
      className="flex items-center absolute right-4 gap-2 border-red-200 text-red-600 hover:bg-red-50 dark:border-red-800 dark:text-red-400 dark:hover:bg-red-900/20 bg-transparent"
    >
      <LogOut className="h-4 w-4" />
      Logout
    </button>
  );
}
