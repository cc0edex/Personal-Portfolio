import Link from "@/components/Link";
import TypeWriter from "@/components/TypeWriter";
import ProjectCard from "@/components/ProjectCard";
import PostCard from "@/components/PostCard";
import HandIcon from "@/components/HandIcon";
import SettingsModel from "@/lib/config/models/SettingsModel";
import ProjectsModel from "@/lib/config/models/ProjectsModel";
import BlogModel from "@/lib/config/models/BlogModel";
import { unstable_cache } from "next/cache";
import { generateMetadata } from "@/lib/metadata";
export const metadata = generateMetadata({
  title: "Noufel Benchabia - Home",
  description:
    "Personal portfolio website of Noufel Benchabia, a frontend developer based in Algeria",
  url: process.env.NEXT_PUBLIC_SITE_URL,
});
const getData = unstable_cache(
  async () => {
    // Fetch data from the database
    const settings = await SettingsModel.find({});
    const projects = await ProjectsModel.find({});
    const posts = await BlogModel.find({});
    return { settings, projects, posts };
  },
  ["settings", "projects", "posts"],
  { revalidate: 60 }
);
export default async function Home() {
  const { settings, projects, posts } = await getData();
  const { name, bio, cvLink } = {
    name: settings[0].name,
    bio: settings[0].bio,
    cvLink: settings[0].cvLink,
  };
  return (
    <main className="min-h-screen bg-gray-200 dark:bg-[#14161d]">
      {/* Grid pattern - only visible in dark mode */}
      <div className="absolute inset-0 opacity-0 dark:opacity-10 pointer-events-none animate-pulse2">
        <div className="absolute inset-0 bg-grid-pattern"></div>
      </div>
      {/* Hero Section */}
      <div className="bg-gradient-to-b from-violet-200 via-fuchsia-100 to-gray-200 dark:from-[#262137] dark:via-[#333459] dark:to-[#14161d] min-h-screen mx-auto px-4 pt-40 pb-20 md:pb-24 lg:pb-32 text-center">
        <div className="opacity-0 animate-fade-in">
          <div className="flex items-center justify-center gap-2 mb-2 md:mb-3 lg:mb-4 text-slate-800 dark:text-neutral-200">
            <HandIcon />
            <p className="text-lg md:text-lg lg:text-3xl mb-8 transition duration-300">
              Hey there! I&apos;m
            </p>
          </div>
          <h1 className="text-5xl sm:text-6xl transition duration-300 md:text-7xl lg:text-8xl text-shadow-light dark:text-shadow-dark font-[family-name:var(--font-dancing-script)] font-bold text-slate-800 dark:text-neutral-200 mb-4 md:mb-6 lg:mb-8 leading-tight">
            <TypeWriter words={name} />
          </h1>
          <div className="max-w-2xl mx-auto">
            <p className=" text-gray-700 dark:text-gray-300 mb-6 px-2 transition duration-300">
              {bio}
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 md:gap-4">
              <Link href="/contact">
                <button className="bg-indigo-600 hover:bg-indigo-700 text-white h-10 py-2 rounded-md transition hover:scale-110 ease-in-out duration-300  px-6 md:px-7 lg:px-8 w-full sm:w-auto">
                  Let&apos;s talk
                </button>
              </Link>
              <Link href={cvLink} target="_blank">
                <button className="border-2 border-indigo-600 bg-transparent text-sm font-medium ring-offset-background text-indigo-600 h-10 py-2 rounded-md hover:bg-transparent hover:text-indigo-600 dark:text-neutral-200 transition hover:scale-110 ease-in-out duration-300  px-4 md:px-5 lg:px-6 mt-3 sm:mt-0 w-full sm:w-auto">
                  Download CV
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
      {/* Featured Projects Section */}
      <section className="container bg-gray-200 dark:bg-[#14161d] mx-auto px-4 py-12 md:py-16 lg:py-20">
        <div className="text-center mb-8 md:mb-10 lg:mb-12">
          <h2 className="text-3xl md:text-3xl lg:text-5xl font-bold text-slate-800 dark:text-neutral-200 mb-3 md:mb-3 lg:mb-4">
            Featured Projects
          </h2>
          <p className="max-w-2xl mx-auto text-sm md:text-base lg:text-base text-gray-700 dark:text-gray-300 px-2">
            Here are some of my recent projects that showcase my skills and
            expertise in frontend development.
          </p>
        </div>
        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-6 lg:gap-8">
          {projects
            .filter((project) => project.featured)
            .slice(-3)
            .map((project, index) => (
              <ProjectCard key={project._id} project={project} index={index} />
            ))}
        </div>

        <div className="text-center mt-8 md:mt-10 lg:mt-12">
          <Link href="/projects">
            <button className="border-2 border-indigo-600 bg-transparent text-sm font-medium ring-offset-background text-indigo-600 h-10 py-2 rounded-md hover:bg-transparent hover:text-indigo-600 dark:text-neutral-200 dark:hover:bg-transparent transition hover:scale-110 ease-in-out duration-300 px-6 md:px-7 lg:px-8 w-full sm:w-auto">
              View All Projects
            </button>
          </Link>
        </div>
      </section>

      {/* Recent Posts Section */}
      <section className="container mx-auto px-4 py-12 md:py-16 lg:py-20 bg-gray-200 dark:bg-[#14161d]">
        <div className="text-center mb-8 md:mb-10 lg:mb-12">
          <h2 className="text-3xl md:text-3xl lg:text-5xl font-bold text-slate-800 dark:text-neutral-200 mb-3 md:mb-3 lg:mb-4">
            Recent Posts
          </h2>
          <p className="max-w-2xl mx-auto text-sm md:text-base lg:text-base text-gray-700 dark:text-gray-300 px-2">
            I write about web development, design trends, and my experiences as
            a frontend developer.
          </p>
        </div>
        {/* Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-6 lg:gap-8 mx-auto">
          {posts.slice(-6).map((post, index) => (
            <PostCard key={post._id} post={post} index={index} />
          ))}
        </div>

        <div className="text-center mt-8 md:mt-10 lg:mt-12">
          <Link href="/blogs">
            <button className="border-2 border-indigo-600 bg-transparent text-sm font-medium ring-offset-background text-indigo-600 h-10 py-2 rounded-md hover:bg-transparent hover:text-indigo-600 dark:text-neutral-200 dark:hover:bg-transparent transition hover:scale-110 ease-in-out duration-300 px-6 md:px-7 lg:px-8 w-full sm:w-auto">
              View All Posts
            </button>
          </Link>
        </div>
      </section>
    </main>
  );
}
