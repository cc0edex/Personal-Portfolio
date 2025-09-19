"use client";
import { Send } from "lucide-react";
import { useState } from "react";
export default function ContactForm() {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    const response = await fetch("/api/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formState),
    });
    if (!response.ok) {
      setIsSubmitting(false);
      return;
    }
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setFormState({
        name: "",
        email: "",
        subject: "",
        message: "",
      });

      // Reset success message after 5 seconds
      setTimeout(() => {
        setIsSubmitted(false);
      }, 5000);
    }, 1500);
  };
  return (
    <div className="lg:w-2/3">
      <div className="bg-white dark:bg-[#161b27] rounded-xl p-8 shadow-lg transition-all duration-300 hover:shadow-xl">
        <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-200 mb-6">
          Send Me a Message
        </h2>

        {isSubmitted ? (
          <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-6 text-center">
            <h3 className="text-xl font-bold text-green-800 dark:text-green-400 mb-2">
              Message Sent!
            </h3>
            <p className="text-green-700 dark:text-green-300">
              Thank you for reaching out. I'll get back to you as soon as
              possible.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                >
                  Your Name
                </label>
                <input
                  id="name"
                  name="name"
                  value={formState.name}
                  onChange={handleChange}
                  placeholder=""
                  required
                  className="w-full bg-transparent dark:border-gray-700 flex h-10 rounded-md border-2 px-3 py-2 text-base ring-offset-background border-input md:text-sm"
                />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                >
                  Your Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={formState.email}
                  onChange={handleChange}
                  placeholder=""
                  required
                  className="w-full bg-transparent dark:border-gray-700 flex h-10 rounded-md border-2 px-3 py-2 text-base ring-offset-background border-input md:text-sm"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="subject"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
              >
                Subject
              </label>
              <input
                id="subject"
                name="subject"
                value={formState.subject}
                onChange={handleChange}
                placeholder=""
                required
                className="w-full bg-transparent dark:border-gray-700 flex h-10 rounded-md border-2 px-3 py-2 text-base ring-offset-background border-input md:text-sm"
              />
            </div>

            <div>
              <label
                htmlFor="message"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
              >
                Message
              </label>
              <textarea
                id="message"
                name="message"
                value={formState.message}
                onChange={handleChange}
                placeholder=""
                required
                className="w-full min-h-[150px] rounded-md border-2 px-3 py-2 bg-transparent dark:border-gray-700 resize-none"
              />
            </div>

            <button
              type="submit"
              className="bg-indigo-600 hover:bg-indigo-700 text-white w-full md:w-auto h-10 px-4 py-2 rounded-md inline-flex items-center justify-center"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <span className="flex items-center">
                  <svg
                    className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Sending...
                </span>
              ) : (
                <span className="flex items-center">
                  <Send className="mr-2 h-4 w-4" /> Send Message
                </span>
              )}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
