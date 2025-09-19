import Link from "@/components/Link";
import Image from "next/image";
import { ArrowLeft, Calendar, Share2 } from "lucide-react";
import CategoryBadge from "@/components/category-badge";
import BlogModel from "@/lib/config/models/BlogModel";
import { unstable_cache } from "next/cache";
import { notFound } from "next/navigation";
import { ConnectDb } from "@/lib/config/db";
import { createDynamicMetadata } from "@/lib/metadata";
ConnectDb();
export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}) {
  // Fetch post data based on slug
  const { slug } = params;
  const post = await BlogModel.findOne({ slug });
  return createDynamicMetadata(
    `blogs/${params.slug}`,
    `Noufel Benchabia - ${post.title}`,
    post.excerpt
  );
}

export default async function BlogPost({
  params,
}: {
  params: { slug: string };
}) {
  const { slug } = await params;
  const getData = unstable_cache(
    async (slug: string) => {
      // Fetch data from the database
      const postData = await BlogModel.findOne({ slug: slug });
      return postData;
    },
    ["blog-post"],
    { revalidate: 60 * 5 }
  );
  const post = await getData(slug);
  if (!post) {
    notFound();
  }
  return (
    <main className="min-h-screen bg-gray-200 dark:bg-[#14161d]">
      <div className="">
        {/* Hero Section */}
        <div className="w-full h-[40vh] md:h-[50vh] relative">
          <Image
            src="/img/postimg.webp"
            alt={post.title}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-end">
            <div className="container mx-auto px-4 pb-12 max-sm:pb-4">
              <Link
                href="/blogs"
                className="inline-flex items-center max-sm:hidden text-white mb-4 hover:text-indigo-300 transition-colors"
              >
                <ArrowLeft className="mr-2 h-4 w-4" /> Back to Blogs
              </Link>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
                {post.title}
              </h1>
              <div className="flex flex-wrap items-center gap-4 text-white">
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 mr-1" /> {post.date}
                </div>
                <div className="flex flex-wrap gap-2">
                  {post.categories.map((category: any) => (
                    <CategoryBadge
                      key={category}
                      className="bg-indigo-600 text-neutral-200 dark:text-neutral-200"
                    >
                      {category}
                    </CategoryBadge>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Article Content */}
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-4xl mx-auto bg-white dark:bg-[#161b27] rounded-xl shadow-lg p-6 md:p-10">
            {/* Share Button */}
            <div className="flex justify-end mb-6">
              <button className="flex items-center border-2 gap-2 h-9 rounded-md px-3 bg-transparent border-indigo-600 text-indigo-600 hover:bg-indigo-100 dark:border-indigo-400 dark:text-indigo-400 dark:hover:bg-slate-800">
                <Share2 className="h-4 w-4" /> Share
              </button>
            </div>

            {/* Article Content */}
            <article className="prose prose-indigo dark:prose-invert max-w-none">
              <div dangerouslySetInnerHTML={{ __html: post.content }} />
            </article>

            {/* Tags */}
            <div className="mt-10 pt-6 border-t border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-bold text-slate-800 dark:text-slate-200 mb-3">
                Tags
              </h3>
              <div className="flex flex-wrap gap-2">
                {post.categories.map((category: any) => (
                  <CategoryBadge key={category}>{category}</CategoryBadge>
                ))}
              </div>
            </div>
          </div>
        </div>
        {/* Back to Blog */}
        <div className="container mx-auto px-4 pb-12 text-center">
          <Link href="/blogs">
            <button className="inline-flex items-center justify-center h-10 px-4 py-2 border-2 rounded-md bg-transparent hover:text-indigo-600 border-indigo-600 hover:bg-indigo-100 text-indigo-600 dark:border-indigo-400 dark:text-indigo-400 dark:hover:bg-slate-800">
              <ArrowLeft className="mr-2 h-4 w-4" /> Back to All Articles
            </button>
          </Link>
        </div>
      </div>
    </main>
  );
}
