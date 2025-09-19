import Link from "@/components/Link";
import { generateMetadata } from "@/lib/metadata";
export const metadata = generateMetadata({
  title: "Noufel Benchabia - Page Not Found",
  description:
    "Personal portfolio website of Noufel Benchabia, a frontend developer based in Algeria",
  url: process.env.NEXT_PUBLIC_SITE_URL,
});
export default function NotFound() {
  return (
    <div className="min-h-screen bg-gray-200 dark:bg-[#14161d] flex items-center justify-center">
      <div className="text-center px-4">
        <h1 className="text-6xl font-bold text-slate-800 dark:text-slate-200 mb-6">
          404
        </h1>
        <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-200 mb-4">
          Page Not Found
        </h2>
        <p className="text-gray-700 dark:text-gray-300 mb-8 max-w-md mx-auto">
          Sorry, the page you're looking for doesn't exist or has been moved.
        </p>
        <Link href="/">
          <button className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-md py-2 px-4">
            Back to Home
          </button>
        </Link>
      </div>
    </div>
  );
}
