import { Lock } from "lucide-react";
import Auth from "@/components/admin/auth";
import { getUserFromRequest } from "@/lib/auth";
import { redirect } from "next/navigation";
import { generateMetadata } from "@/lib/metadata";
export const metadata = generateMetadata({
  title: "Noufel Benchabia - Admin Login",
  description:
    "Personal portfolio website of Noufel Benchabia, a frontend developer based in Algeria",
  url: process.env.NEXT_PUBLIC_SITE_URL,
});
export default async function page() {
  const admin = await getUserFromRequest();
  if (admin) {
    redirect("/admin/dashboard");
  }
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-200 via-gray-200 to-gray-200 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 flex items-center justify-center p-4">
      <div
        className="w-full max-w-md"
        style={{ opacity: 1, transform: "none" }}
      >
        <div className="rounded-lg text-card-foreground shadow-xl border-0 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm">
          <div className="flex flex-col space-y-1.5 p-6 text-center pb-6">
            <div
              className="mx-auto w-16 h-16 bg-indigo-600 rounded-full flex items-center justify-center mb-4"
              style={{ transform: "none" }}
            >
              <Lock className="text-white" />
            </div>
            <h3 className="tracking-tight text-2xl font-bold text-slate-800 dark:text-slate-200">
              Admin Login
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Access the admin dashboard to manage your portfolio
            </p>
          </div>
          <div className="p-6 pt-0">
            <Auth />
            <div className="mt-2 text-center"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
