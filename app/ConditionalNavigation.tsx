"use client";
import Navigation from "@/components/navigation";
export default function ConditionalNavigation() {
  const pathname =
    typeof window !== "undefined" ? window.location.pathname : "";

  // Don't show navigation on admin pages
  if (pathname.startsWith("/admin")) {
    return null;
  }

  return (
    <div className="fixed top-0 left-0 right-0 z-50 w-full flex justify-center pt-4  px-4 ">
      <Navigation />
    </div>
  );
}
