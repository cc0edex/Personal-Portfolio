import {
  Mail,
  Phone,
  MapPin,
  Github,
  Linkedin,
  Twitter,
  Facebook,
} from "lucide-react";
import ContactForm from "@/components/ContactForm";
import SettingsModel from "@/lib/config/models/SettingsModel";
import { unstable_cache } from "next/cache";
import { generateMetadata } from "@/lib/metadata";
export const metadata = generateMetadata({
  title: "Noufel Benchabia - Contact",
  description:
    "Personal portfolio website of Noufel Benchabia, a frontend developer based in Algeria",
  url: process.env.NEXT_PUBLIC_SITE_URL,
});
export default async function Contact() {
  const getData = unstable_cache(
    async () => {
      // Fetch data from the database
      return await SettingsModel.find({});
    },
    ["settings"],
    { revalidate: 60 }
  );
  const data = await getData();
  const contact = {
    email: data[0].email,
    phone: data[0].phone,
    location: data[0].location,
    githubUrl: data[0].githubUrl,
    linkedinUrl: data[0].linkedinUrl,
    twitterUrl: data[0].twitterUrl,
    facebookUrl: data[0].facebookUrl,
  };
  return (
    <main className="min-h-screen bg-gray-200 dark:bg-[#14161d]">
      <div className="opacity-0 animate-fade-in">
        {/* Contact Header */}
        <div className="container mx-auto px-4 pt-24 text-center">
          <h1 className="text-[45px]  text-slate-800 dark:text-neutral-200 mb-4 transition duration-300 font-bold text-center">
            Ready to take your digital
            <br />
            experience to the
            <span className="text-indigo-700 font-extrabold"> NEXT </span>level?
          </h1>

          <p className="max-w-2xl text-xl mx-auto text-gray-700 dark:text-gray-300 mb-12">
            Don't be shy and message me now.
          </p>
        </div>

        {/* Contact Content */}
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-col lg:flex-row gap-12">
              {/* Contact Info */}
              <div className="lg:w-1/3">
                <div className="bg-white dark:bg-[#161b27] rounded-xl p-8 shadow-lg mb-8 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
                  <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-200 mb-6">
                    Contact Information
                  </h2>

                  <div className="space-y-6">
                    <div className="flex items-start">
                      <div className="bg-indigo-100 dark:bg-indigo-900/30 p-3 rounded-full mr-4">
                        <Mail className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                          Email
                        </p>
                        <span className="text-slate-800 dark:text-slate-200 font-medium">
                          {contact.email}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-start">
                      <div className="bg-indigo-100 dark:bg-indigo-900/30 p-3 rounded-full mr-4">
                        <Phone className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                          Phone
                        </p>
                        <span className="text-slate-800 dark:text-slate-200 font-medium">
                          {contact.phone}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-start">
                      <div className="bg-indigo-100 dark:bg-indigo-900/30 p-3 rounded-full mr-4">
                        <MapPin className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                          Location
                        </p>
                        <span className="text-slate-800 dark:text-slate-200 font-medium">
                          {contact.location}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-white dark:bg-[#161b27] rounded-xl p-8 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
                  <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-200 mb-6">
                    Connect With Me
                  </h2>
                  <div className="flex gap-4">
                    <a
                      href={contact.facebookUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-indigo-100 dark:bg-indigo-900/30 p-3 rounded-full text-indigo-600 dark:text-indigo-400 hover:bg-indigo-200 dark:hover:bg-indigo-800/30 transition-colors"
                    >
                      <Facebook className="h-5 w-5" />
                    </a>
                    <a
                      href={contact.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-indigo-100 dark:bg-indigo-900/30 p-3 rounded-full text-indigo-600 dark:text-indigo-400 hover:bg-indigo-200 dark:hover:bg-indigo-800/30 transition-colors"
                    >
                      <Github className="h-5 w-5" />
                    </a>
                    <a
                      href={contact.linkedinUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-indigo-100 dark:bg-indigo-900/30 p-3 rounded-full text-indigo-600 dark:text-indigo-400 hover:bg-indigo-200 dark:hover:bg-indigo-800/30 transition-colors"
                    >
                      <Linkedin className="h-5 w-5" />
                    </a>
                    <a
                      href={contact.twitterUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-indigo-100 dark:bg-indigo-900/30 p-3 rounded-full text-indigo-600 dark:text-indigo-400 hover:bg-indigo-200 dark:hover:bg-indigo-800/30 transition-colors"
                    >
                      <Twitter className="h-5 w-5" />
                    </a>
                  </div>
                </div>
              </div>

              {/* Contact Form */}
              <ContactForm />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
