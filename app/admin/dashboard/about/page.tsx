import AboutManager from "@/components/admin/AboutManager";
import { getUserFromRequest } from "@/lib/auth";
import { redirect } from "next/navigation";
import { generateMetadata } from "@/lib/metadata";
export const metadata = generateMetadata({
  title: "Noufel Benchabia - Admin Dashboard",
  description:
    "Personal portfolio website of Noufel Benchabia, a frontend developer based in Algeria",
  url: process.env.NEXT_PUBLIC_SITE_URL,
});
export default async function page() {
  const admin = await getUserFromRequest();
  if (!admin) {
    redirect("/admin");
  }
  return (
    <div className="flex w-full p-6">
      <AboutManager />
    </div>
  );
}
