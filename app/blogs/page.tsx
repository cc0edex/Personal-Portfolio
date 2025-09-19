import PostCard from "@/components/PostCard";
import BlogModel from "@/lib/config/models/BlogModel";
import { unstable_cache } from "next/cache";
import { generateMetadata } from "@/lib/metadata";
export const metadata = generateMetadata({
  title: "Noufel Benchabia - Blogs",
  description:
    "Personal portfolio website of Noufel Benchabia, a frontend developer based in Algeria",
  url: process.env.NEXT_PUBLIC_SITE_URL,
});
export default async function Blog() {
  const getData = unstable_cache(
    async () => {
      // Fetch data from the database
      return await BlogModel.find({});
    },
    ["blog-posts"],
    { revalidate: 60 }
  );
  const posts = await getData();
  return (
    <main className="min-h-screen bg-gray-200 dark:bg-[#14161d]">
      <div className="opacity-0 animate-fade-in">
        {/* Blog Header */}
        <div className="container mx-auto px-4 pt-24 text-center">
          <h1 className="text-4xl sm:text-5xl font-bold text-slate-800 dark:text-neutral-200 mb-8 mt-10 relative inline-block">
            Thoughts & Articles
            <div className="w-40 sm:w-70 mx-auto mt-4 h-[7px] bg-indigo-700 rounded-full"></div>
          </h1>

          <p className="max-w-2xl mx-auto text-gray-700 dark:text-gray-300 mb-12">
            I write about web development, design trends, and my experiences as
            a frontend developer. Here are some of my recent articles.
          </p>
        </div>
        {/* Blog Posts Grid */}
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {posts.map((post, index) => (
              <PostCard key={post._id} post={post} index={index} />
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
