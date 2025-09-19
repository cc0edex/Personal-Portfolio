import CategoryBadge from "@/components/category-badge";
import { ArrowRight } from "lucide-react";
import Link from "./Link";
export default function PostCard({
  index,
  post,
}: {
  index: Number;
  post: any;
}) {
  return (
    <div className="bg-indigo-200 dark:bg-[#161b27] rounded-xl border-[0.5px] border-transparent dark:border-[0.5px] dark:border-gray-800 overflow-hidden shadow-md transition-all duration-300 hover:shadow-lg hover:-translate-y-2">
      <div className="p-4 md:p-5 lg:p-6">
        <div className="text-xs text-indigo-600 dark:text-indigo-400 font-medium mb-2 md:mb-2 lg:mb-3">
          {post.date}
        </div>
        <h3 className="text-lg md:text-lg lg:text-xl font-bold text-slate-800 dark:text-slate-200 mb-2 md:mb-2 lg:mb-3">
          {post.title}
        </h3>
        <p className="text-sm md:text-sm lg:text-base text-gray-700 dark:text-gray-300 mb-3 md:mb-3 lg:mb-4 line-clamp-3">
          {post.excerpt}
        </p>
        <div className="flex flex-wrap gap-2 mb-4">
          {post.categories.map((category: any) => (
            <CategoryBadge key={category}>{category}</CategoryBadge>
          ))}
        </div>
        <Link
          href={`/blogs/${post.slug}`}
          className="inline-flex items-center text-slate-800 dark:text-neutral-200 font-semibold hover:text-indigo-700 dark:hover:text-indigo-300 text-sm md:text-sm lg:text-base"
        >
          Read more{" "}
          <ArrowRight className="ml-1 h-3 w-3 md:h-3 lg:h-4 md:w-3 lg:w-4" />
        </Link>
      </div>
    </div>
  );
}
