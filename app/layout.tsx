import "@/app/globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import type { Metadata } from "next";
import { Roboto, Dancing_Script } from "next/font/google";
import ConditionalNavigation from "./ConditionalNavigation";
import Footer from "@/components/Footer";
import { Toaster } from "@/components/ui/toaster";
import { Suspense } from "react";
import { ConnectDb } from "@/lib/config/db";
const roboto = Roboto({
  subsets: ["latin"],
  variable: "--font-roboto",
  style: ["normal", "italic"],
  display: "swap", // Optimize font loading
});
const dancing = Dancing_Script({
  weight: ["400", "700"],
  variable: "--font-dancing-script",
  subsets: ["latin"],
  display: "swap",
  preload: true,
  fallback: ["cursive"],
});

export const metadata: Metadata = {
  title: "Noufel Benchabia - Frontend Developer",
  description:
    "Personal portfolio website of Noufel Benchabia, a frontend developer based in Algeria",
  icons: {
    icon: "/img/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  ConnectDb();
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${roboto.className} ${dancing.variable} font-sans`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          {/* Fixed Navigation - Only show on non-admin pages */}
          <Suspense fallback={null}>
            <ConditionalNavigation />
          </Suspense>

          {/* Page Content */}
          <Toaster />
          {children}

          {/* Footer */}

          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
