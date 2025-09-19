import { Facebook, Github, Linkedin, Twitter } from "lucide-react";
import SettingsModel from "@/lib/config/models/SettingsModel";
export default async function Footer() {
  const data = await SettingsModel.find({});
  const { name, facebookUrl, githubUrl, linkedinUrl, twitterUrl } = {
    name: data[0].name,
    facebookUrl: data[0].facebookUrl,
    githubUrl: data[0].githubUrl,
    linkedinUrl: data[0].linkedinUrl,
    twitterUrl: data[0].twitterUrl,
  };
  return (
    <footer className="bg-white dark:bg-[#161b27] absolute w-full transition duration-300">
      <span className="text-[1rem] flex justify-center items-center gap-1 text-center text-slate-900 dark:text-neutral-200 transition duration-300 mt-16">
        Made with love by{" "}
        <span className=" text-indigo-600 text-xl font-[family-name:var(--font-dancing-script)]">
          {name}
        </span>
      </span>
      <p className="text-center text-gray-500 dark:text-gray-400 mt-4 transition duration-300">
        © 2025-present, All Rights Reserved.
      </p>
      <div
        id="socials-media"
        className="flex justify-center text-slate-800 dark:text-neutral-200 gap-8 mt-10 mb-16 transition duration-300"
      >
        <a
          href={facebookUrl || ""}
          className=" flex gap-2 items-center text-md hover:text-indigo-700 hover:scale-110 ease-in-out duration-300"
        >
          <Facebook className="size-6" />
          <span className="max-sm:hidden">facebook</span>
        </a>
        <a
          href={githubUrl || ""}
          className=" flex gap-2 items-center text-md hover:text-indigo-700 hover:scale-110 ease-in-out duration-300"
        >
          <Github className="size-6" />
          <span className="max-sm:hidden">Github</span>
        </a>
        <a
          href={linkedinUrl || ""}
          className=" flex gap-2 items-center text-md hover:text-indigo-700 hover:scale-110 ease-in-out duration-300"
        >
          <Linkedin className="size-6" />
          <span className="max-sm:hidden">Linkedin</span>
        </a>
        <a
          href={twitterUrl || ""}
          className=" flex gap-2 items-center text-md hover:text-indigo-700 hover:scale-110 ease-in-out duration-300"
        >
          <Twitter className="size-6" />
          <span className="max-sm:hidden">Twitter</span>
        </a>
      </div>
    </footer>
  );
}
