import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { Metadata } from "next";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
interface MetadataOptions {
  title: string;
  description: string;
  keywords?: string[];
  image?: string;
  url?: string;
  type?: "website" | "article" | "profile";
  noIndex?: boolean;
  siteName?: string;
  author?: string;
  publishedTime?: string;
  modifiedTime?: string;
}
/**
 * Generate custom metadata for Next.js pages
 * @param options - Metadata configuration options
 * @returns Metadata object for Next.js
 */
export function createMetadata(options: MetadataOptions): Metadata {
  const {
    title,
    description,
    keywords = [],
    image = "/og-image.jpg", // Default OG image
    url = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
    type = "website",
    noIndex = false,
    siteName = "Noufel Benchabia - Web Developer", // Default site name
    author = "Noufel Benchabia", // Default author
    publishedTime,
    modifiedTime,
  } = options;

  const fullTitle = `${title} | ${siteName}`;

  return {
    title: fullTitle,
    description,
    keywords: keywords.join(", "),
    authors: [{ name: author }],
    creator: author,
    publisher: author,

    // Robots
    robots: {
      index: !noIndex,
      follow: !noIndex,
      googleBot: {
        index: !noIndex,
        follow: !noIndex,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },

    // Open Graph
    openGraph: {
      title: fullTitle,
      description,
      url,
      siteName,
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      locale: "en_US",
      type,
      ...(publishedTime && { publishedTime }),
      ...(modifiedTime && { modifiedTime }),
    },
    // Additional metadata
    alternates: {
      canonical: url,
    },
  };
}
