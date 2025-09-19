"use client";
import { Code } from "lucide-react";
import { useEffect, useState } from "react";

const skillsData = [
  // Column 1 - Frontend Technologies
  [
    { name: "React", category: "Frontend" },
    { name: "Next.js", category: "Framework" },
    { name: "TypeScript", category: "Language" },
    { name: "JavaScript", category: "Language" },
    { name: "HTML5", category: "Markup" },
    { name: "CSS3", category: "Styling" },
    { name: "Tailwind CSS", category: "Framework" },
    { name: "Redux", category: "State Management" },
    { name: "Bootstrap", category: "Framework" },
    { name: "Material-UI", category: "Component Library" },
    { name: "jQuery", category: "Library" },
    { name: "Responsive Design", category: "Design" },
    { name: "Cross-Browser Compatibility", category: "Testing" },
    { name: "Accessibility", category: "Standards" },
    { name: "SEO Best Practices", category: "Marketing" },
  ],
  // Column 2 - Tools & Libraries
  [
    { name: "Framer Motion", category: "Animation" },
    { name: "Three.js", category: "3D Graphics" },
    { name: "D3.js", category: "Data Visualization" },
    { name: "Chart.js", category: "Charts" },
    { name: "Webpack", category: "Bundler" },
    { name: "Vite", category: "Build Tool" },
    { name: "Stripe", category: "Payments" },
    { name: "JWT", category: "Authentication" },
    { name: "OAuth", category: "Authentication" },
    { name: "SWR", category: "Data Fetching" },
    { name: "React Query", category: "Data Fetching" },
  ],
  // Column 3 - Backend & Database
  [
    { name: "Node.js", category: "Runtime" },
    { name: "Express.js", category: "Backend" },
    { name: "MongoDB", category: "Database" },
    { name: "PostgreSQL", category: "Database" },
    { name: "Prisma", category: "ORM" },
    { name: "REST API", category: "API" },
    { name: "Vercel", category: "Deployment" },
    { name: "Netlify", category: "Deployment" },
    { name: "Git", category: "Version Control" },
  ],
];

const SkillCard = ({
  skill,
}: {
  skill: { name: string; category: string };
}) => (
  <div className="bg-white dark:bg-slate-800 rounded-lg p-4 shadow-md border border-gray-200 dark:border-slate-700 min-h-[80px] flex flex-col justify-center items-center text-center mb-4 hover:shadow-lg transition-shadow duration-300">
    <h3 className="font-semibold text-slate-800 dark:text-slate-200 text-sm mb-1">
      {skill.name}
    </h3>
    <span className="text-xs bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 px-2 py-1 rounded-full">
      {skill.category}
    </span>
  </div>
);

const MarqueeColumn = ({
  skills,
  direction = "up",
  speed = 50,
}: {
  skills: { name: string; category: string }[];
  direction?: "up" | "down";
  speed?: number;
}) => {
  const [duplicatedSkills, setDuplicatedSkills] = useState<
    { name: string; category: string }[]
  >([]);

  useEffect(() => {
    // Duplicate the skills array to create seamless loop
    setDuplicatedSkills([...skills, ...skills]);
  }, [skills]);

  return (
    <div className="relative h-[600px] overflow-hidden">
      <div
        className={`flex flex-col ${
          direction === "up" ? "animate-marquee-up" : "animate-marquee-down"
        }`}
        style={{
          animationDuration: `${speed}s`,
          animationTimingFunction: "linear",
          animationIterationCount: "infinite",
        }}
      >
        {duplicatedSkills.map((skill, index) => (
          <SkillCard key={`${skill.name}-${index}`} skill={skill} />
        ))}
      </div>
    </div>
  );
};

export default function SkillsMarquee() {
  return (
    <section className="py-20 w-full rounded-lg dark:from-slate-900 dark:to-slate-800">
      <div className="container w-full mx-auto px-4">
        <div className="flex items-center gap-2 mb-6">
          <Code className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
          <h2 className="text-2xl font-bold text-slate-800 dark:text-neutral-200">
            Skills & Technologies
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full mx-auto">
          <div className="relative w-full">
            <div className="absolute top-0 left-0 right-0 h-20 bg-gradient-to-b from-white to-transparent dark:from-slate-900 dark:to-transparent z-10 pointer-events-none"></div>
            <div className="absolute bottom-0 left-0 right-0 h-20 w-full bg-gradient-to-t from-white to-transparent dark:from-slate-900 dark:to-transparent z-10 pointer-events-none"></div>
            <MarqueeColumn skills={skillsData[0]} direction="up" speed={60} />
          </div>

          <div className="relative max-sm:hidden">
            <div className="absolute top-0 left-0 right-0 h-20 bg-gradient-to-b from-white to-transparent dark:from-slate-900 dark:to-transparent z-10 pointer-events-none"></div>
            <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-white to-transparent dark:from-slate-900 dark:to-transparent z-10 pointer-events-none"></div>
            <MarqueeColumn skills={skillsData[1]} direction="down" speed={55} />
          </div>

          <div className="relative max-sm:hidden">
            <div className="absolute top-0 left-0 right-0 h-20 bg-gradient-to-b from-white to-transparent dark:from-slate-900 dark:to-transparent z-10 pointer-events-none"></div>
            <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-white to-transparent dark:from-slate-900 dark:to-transparent z-10 pointer-events-none"></div>
            <MarqueeColumn skills={skillsData[2]} direction="up" speed={65} />
          </div>
        </div>
      </div>
    </section>
  );
}
