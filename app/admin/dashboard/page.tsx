import {
  FileText,
  FolderOpen,
  Eye,
  MessageSquare,
  X,
  Users2Icon,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getUserFromRequest } from "@/lib/auth";
import { redirect } from "next/navigation";
import Link from "@/components/Link";
import BlogModel from "@/lib/config/models/BlogModel";
import ProjectsModel from "@/lib/config/models/ProjectsModel";
import MessagesModel from "@/lib/config/models/MessagesModel";
import { generateMetadata } from "@/lib/metadata";
export const metadata = generateMetadata({
  title: "Noufel Benchabia - Admin Dashboard",
  description:
    "Personal portfolio website of Noufel Benchabia, a frontend developer based in Algeria",
  url: process.env.NEXT_PUBLIC_SITE_URL,
});
export default async function page() {
  const admin = await getUserFromRequest();
  const Blogs = await BlogModel.find({});
  const Projects = await ProjectsModel.find({});
  const messages = await MessagesModel.find({});
  if (!admin) {
    redirect("/admin");
  }
  const stats = [
    {
      title: "Total Blog Posts",
      value: Blogs.length,
      icon: FileText,
      color: "bg-blue-500",
    },
    {
      title: "Total Projects",
      value: Projects.length,
      icon: FolderOpen,
      color: "bg-green-500",
    },
    {
      title: "Featured Projects",
      value: Projects.filter((project) => project.featured).length,
      icon: Eye,
      color: "bg-purple-500",
    },
    {
      title: "Messages",
      value: messages.length,
      icon: MessageSquare,
      color: "bg-purple-500",
    },
  ];

  return (
    <>
      <div className="flex w-full">
        {/* Main Content */}
        <main className="w-full p-4 md:p-6 bg-gray-100 dark:bg-[#14161d]">
          <div>
            {/* Overview Tab */}
            <div className="space-y-4 md:space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6">
                {stats.map((stat, index) => (
                  <div key={stat.title}>
                    <Card className="hover:shadow-lg transition-shadow duration-300 dark:bg-[#161b27]">
                      <CardContent className="p-4 md:p-6">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-xs md:text-sm font-medium text-slate-600 dark:text-slate-400">
                              {stat.title}
                            </p>
                            <p className="text-xl md:text-2xl font-bold text-slate-800 dark:text-slate-200">
                              {stat.value}
                            </p>
                          </div>
                          <div
                            className={`p-2 md:p-3 rounded-full ${stat.color}`}
                          >
                            <stat.icon className="h-4 w-4 md:h-6 md:w-6 text-white" />
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                ))}
              </div>
              {/* Quick Actions */}
              <div>
                <Card className="dark:bg-[#161b27]">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg md:text-xl">
                      Quick Actions
                    </CardTitle>
                    <CardDescription className="text-sm">
                      Common tasks and shortcuts
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
                      <Link
                        href="/admin/dashboard/blogs"
                        className="h-16 md:h-20 flex flex-col items-center rounded-lg justify-center gap-2 bg-indigo-100 hover:bg-indigo-300 dark:bg-indigo-900/30 dark:hover:bg-indigo-700/80"
                      >
                        <span className="flex flex-col items-center justify-center gap-2">
                          <FileText className="h-5 w-5 md:h-6 md:w-6" />
                          <span className="text-sm">Blog Posts</span>
                        </span>
                      </Link>

                      <Link
                        href="/admin/dashboard/projects"
                        className="h-16 md:h-20 flex flex-col items-center rounded-lg justify-center gap-2 bg-indigo-100 hover:bg-indigo-300 dark:bg-indigo-900/30 dark:hover:bg-indigo-700/80"
                      >
                        <span className="flex flex-col items-center justify-center gap-2">
                          <FolderOpen className="h-5 w-5 md:h-6 md:w-6" />
                          <span className="text-sm">Projects</span>
                        </span>
                      </Link>
                      <Link
                        href="/admin/dashboard/about"
                        className="h-16 md:h-20 flex flex-col items-center rounded-lg justify-center gap-2 bg-indigo-100 hover:bg-indigo-300 dark:bg-indigo-900/30 dark:hover:bg-indigo-700/80"
                      >
                        <span className="flex flex-col items-center justify-center gap-2">
                          <Users2Icon className="h-5 w-5 md:h-6 md:w-6" />
                          <span className="text-sm">About</span>
                        </span>
                      </Link>
                      <Link
                        href="/admin/dashboard/messages"
                        className="h-16 md:h-20 flex flex-col items-center rounded-lg justify-center gap-2 bg-indigo-100 hover:bg-indigo-300 dark:bg-indigo-900/30 dark:hover:bg-indigo-700/80"
                      >
                        <span className="flex flex-col items-center justify-center gap-2">
                          <MessageSquare className="h-5 w-5 md:h-6 md:w-6" />
                          <span className="text-sm">Messages</span>
                        </span>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
