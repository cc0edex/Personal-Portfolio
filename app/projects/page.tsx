import ProjectCard from "@/components/ProjectCard";
import ProjectsModel from "@/lib/config/models/ProjectsModel";
import { unstable_cache } from "next/cache";
import { generateMetadata } from "@/lib/metadata";
export const metadata = generateMetadata({
  title: "Noufel Benchabia - Projects",
  description:
    "Personal portfolio website of Noufel Benchabia, a frontend developer based in Algeria",
  url: process.env.NEXT_PUBLIC_SITE_URL,
});
export default async function Projects() {
  const getData = unstable_cache(
    async () => {
      // Fetch data from the database
      return await ProjectsModel.find({});
    },
    ["projects"],
    { revalidate: 60 }
  );
  const projects = await getData();
  return (
    <main className="min-h-screen bg-gray-200 dark:bg-[#14161d]">
      <div className="opacity-0 animate-fade-in">
        {/* Projects Header */}
        <div className="container mx-auto px-4 pt-24 text-center">
          <h1 className="text-4xl sm:text-5xl font-bold text-slate-800 dark:text-neutral-200 mb-8 mt-10 relative inline-block">
            Projects & Work
            <div className="w-40 sm:w-70 mx-auto mt-4 h-[7px] bg-indigo-700 rounded-full"></div>
          </h1>

          <p className="max-w-2xl mx-auto text-gray-700 dark:text-gray-300 mb-12">
            Here's a collection of my recent projects. Each project represents a
            unique challenge and showcases different skills and technologies.
          </p>
        </div>

        {/* Projects Grid */}
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-6xl mx-auto">
            {projects.map((project, index) => (
              <ProjectCard key={project._id} project={project} index={index} />
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
