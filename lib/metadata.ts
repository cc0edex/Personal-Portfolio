// lib/metadata.ts
import type { Metadata } from "next";

interface MetaProps {
  title: string;
  description?: string;
  url?: string;
  image?: string;
}

export function generateMetadata({
  title,
  description = "Personal portfolio website of Noufel Benchabia, a frontend developer based in Algeria",
  url = process.env.NEXT_PUBLIC_SITE_URL,
  image = "/img/favicon.ico",
}: MetaProps): Metadata {
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url,
      siteName: "Noufel Benchabia - Frontend Developer",
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      locale: "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
  };
}
export function createDynamicMetadata(
  slug: string,
  title: string,
  description: string
): Metadata {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL;
  return generateMetadata({
    title,
    description,
    url: `${baseUrl}/${slug}`,
  });
}
