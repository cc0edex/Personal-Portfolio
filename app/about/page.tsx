import Image from "next/image";
import Link from "@/components/Link";
import { Code, Briefcase, GraduationCap, Heart } from "lucide-react";
import SettingsModel from "@/lib/config/models/SettingsModel";
import AboutModel from "@/lib/config/models/AboutModel";
import { unstable_cache } from "next/cache";
import { generateMetadata } from "@/lib/metadata";
import SkillsMarquee from "@/components/SkillsMarquee";
export const metadata = generateMetadata({
  title: "Noufel Benchabia - About",
  description:
    "Personal portfolio website of Noufel Benchabia, a frontend developer based in Algeria",
  url: process.env.NEXT_PUBLIC_SITE_URL,
});
export default async function About() {
  const getData = unstable_cache(
    async () => {
      // Fetch data from the database
      const settingData = await SettingsModel.find({});
      const aboutData = await AboutModel.find({});
      return { settingData, aboutData };
    },
    ["settings", "about"],
    { revalidate: 60 }
  );
  const { settingData, aboutData } = await getData();
  const { name, about, profileImg } = settingData[0];
  const { skills, Experiences, Educations, interests } = aboutData[0];
  return (
    <main className="min-h-screen bg-gray-200 dark:bg-[#14161d]">
      <div className="opacity-0 animate-fade-in">
        {/* About Header */}
        <div className="container mx-auto px-4 pt-24 text-center"></div>

        {/* About Content */}
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-4xl mx-auto">
            {/* Bio Section */}
            <div className="bg-white dark:bg-[#161b27] rounded-2xl border-[0.5px] border-transparent dark:border-[0.5px] dark:border-gray-800  shadow-lg p-8 mb-12">
              <div className="flex flex-col md:flex-row gap-8 items-center md:items-start">
                <div className="w-48 h-48 relative rounded-full overflow-hidden flex-shrink-0 border-4 border-indigo-300 dark:border-indigo-400">
                  <Image
                    src={profileImg.url || "/placeholder.svg"}
                    alt="Profile"
                    width={192}
                    height={192}
                    priority={true}
                    className="object-cover h-[15rem]"
                  />
                </div>
                <div className="text-center w-full md:text-left">
                  <h2 className="text-2xl font-bold text-slate-800 dark:text-neutral-200 mb-4">
                    {name}
                  </h2>

                  <div dangerouslySetInnerHTML={{ __html: about }} />
                </div>
              </div>
            </div>
            {/* Skills Section */}
            {/* <div className="mb-12">
              <div className="flex items-center gap-2 mb-6">
                <Code className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
                <h2 className="text-2xl font-bold text-slate-800 dark:text-neutral-200">
                  Skills & Technologies
                </h2>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {skills.map((skill: any, index: number) => (
                  <div
                    key={index}
                    className="bg-white dark:bg-slate-800 rounded-lg p-3 text-center shadow-sm border border-indigo-100 dark:border-slate-700"
                  >
                    <span className="text-gray-700 dark:text-gray-300">
                      {skill.name}
                    </span>
                  </div>
                ))}
              </div>
            </div> */}
            <SkillsMarquee />

            {/* Experience Section */}
            <div className="mb-12">
              <div className="flex items-center gap-2 mb-6">
                <Briefcase className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
                <h2 className="text-2xl font-bold text-slate-800 dark:text-neutral-200">
                  Work Experience
                </h2>
              </div>

              <div className="space-y-8">
                {Experiences.map((exp: any, index: any) => {
                  return (
                    <div
                      className="bg-white dark:bg-[#161b27] rounded-xl p-6 shadow-md border-l-4 border-indigo-600"
                      key={index}
                    >
                      <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-2">
                        <h3 className="text-xl font-bold text-slate-800 dark:text-neutral-200">
                          {exp.title}
                        </h3>
                        <span className="text-indigo-600 dark:text-indigo-400 text-sm font-medium">
                          {exp.startDate} -{" "}
                          {exp.current ? "Present" : exp.endDate}
                        </span>
                      </div>

                      <p className="text-gray-600 dark:text-gray-400 text-sm mb-3">
                        {exp.company} • {exp.location}
                      </p>
                      <div
                        className="text-gray-700 dark:text-gray-300 mb-4"
                        dangerouslySetInnerHTML={{
                          __html: exp.description,
                        }}
                      ></div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Education Section */}
            <div className="mb-12">
              <div className="flex items-center gap-2 mb-6">
                <GraduationCap className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
                <h2 className="text-2xl font-bold text-slate-800 dark:text-neutral-200">
                  Education
                </h2>
              </div>

              <div className="space-y-6">
                {Educations.map((edu: any, index: any) => (
                  <div
                    key={index}
                    className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-md border-l-4 border-indigo-600"
                  >
                    <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-2">
                      <h3 className="text-xl font-bold text-slate-800 dark:text-neutral-200">
                        {edu.degree}
                      </h3>
                      <span className="text-indigo-600 dark:text-indigo-400 text-sm font-medium">
                        {edu.startDate} -{" "}
                        {edu.current ? "Present" : edu.endDate}
                      </span>
                    </div>

                    <p className="text-gray-600 dark:text-gray-400 text-sm mb-3">
                      {edu.school} • {edu.location}
                    </p>

                    <p className="text-gray-700 dark:text-gray-300">
                      {edu.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Interests Section */}
            <div className="mb-12">
              <div className="flex items-center gap-2 mb-6">
                <Heart className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
                <h2 className="text-2xl font-bold text-slate-800  dark:text-neutral-200">
                  Interests & Hobbies
                </h2>
              </div>

              <div className="bg-white dark:bg-[#161b27] rounded-xl border-[0.5px] border-transparent dark:border-[0.5px] dark:border-gray-800  p-6 shadow-md">
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  When I'm not coding, you can find me:
                </p>
                <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300">
                  {interests.map((interest: any, index: any) => {
                    return <li key={index}>{interest.interest}</li>;
                  })}
                </ul>
              </div>
            </div>

            {/* CTA Section */}
            <div className="text-center bg-indigo-200 dark:bg-slate-800 rounded-xl p-8 shadow-md">
              <h2 className="text-2xl font-bold text-slate-800 dark:text-neutral-200 mb-4">
                Let's Work Together
              </h2>
              <p className="text-gray-700 dark:text-gray-300 mb-6 max-w-2xl mx-auto">
                I'm always open to discussing new projects, creative ideas, or
                opportunities to be part of your vision.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link href="/contact">
                  <button className="bg-indigo-600 hover:bg-indigo-700 text-sm font-medium ring-offset-background text-neutral-200 h-10 py-2 rounded-md px-8 transition hover:scale-110 ease-in-out duration-300">
                    Contact Me
                  </button>
                </Link>
                <Link href="/projects">
                  <button className="bg-transparent border-2 text-sm font-medium ring-offset-background h-10 py-2 rounded-md border-indigo-600 text-indigo-600 hover:bg-transparent hover:text-indigo-600 dark:text-neutral-200 transition hover:scale-110 ease-in-out duration-300 px-6">
                    View Projects
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
