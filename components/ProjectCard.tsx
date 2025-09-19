import { Github, ExternalLink } from "lucide-react";
import Image from "next/image";
export default function ProjectCard({
  index,
  project,
}: {
  index: Number;
  project: any;
}) {
  return (
    <div
      key={project.id}
      className="bg-white dark:bg-[#161b27] border-[0.5px] border-transparent dark:border-[0.5px] dark:border-gray-800 rounded-xl overflow-hidden shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
      style={{ animationDelay: `${0.1 * Number(index)}s` }}
    >
      <div className="relative h-64 overflow-hidden">
        <Image
          src={project.image.url || "/placeholder.svg"}
          alt={project.title}
          width={600}
          height={400}
          priority
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
        />
        {project.featured && (
          <div className="absolute top-4 right-4 bg-indigo-600 text-white text-xs font-bold px-3 py-1 rounded-full">
            Featured
          </div>
        )}
      </div>
      <div className="p-6">
        <h3 className="text-2xl font-bold text-slate-800 dark:text-slate-200 mb-3">
          {project.title}
        </h3>
        <p className="text-gray-700 dark:text-gray-300 mb-6">
          {project.description}
        </p>

        <div className="flex flex-wrap gap-2 mb-6">
          {project.tags.map((tag: any) => (
            <span
              key={tag}
              className="text-xs bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 px-2 py-1 rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="flex gap-2">
          <button className="bg-indigo-600 text-sm font-medium ring-offset-background rounded-sm px-4 h-10 py-2 hover:bg-indigo-700 text-white">
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center"
            >
              <ExternalLink className="mr-2 h-4 w-4" /> Live Demo
            </a>
          </button>
          <button className="border-2 border-indigo-600 text-sm bg-violet-50 font-medium ring-offset-background rounded-sm px-4 h-10 py-2 text-indigo-600 hover:bg-indigo-100 dark:border-indigo-400 dark:bg-transparent dark:text-indigo-400 dark:hover:bg-slate-800">
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center"
            >
              <Github className="mr-2 h-4 w-4" /> Source Code
            </a>
          </button>
        </div>
      </div>
    </div>
  );
}
