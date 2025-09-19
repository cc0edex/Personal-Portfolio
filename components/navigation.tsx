"use client";
import Link from "@/components/Link";
import { usePathname } from "next/navigation";
import ThemeToggle from "@/components/theme-toggle";
import { useEffect, useState, useRef, useMemo } from "react";
import { Menu, X } from "lucide-react";
import { navItems } from "@/app/data/constants";

export default function Navigation() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const previousPathRef = useRef(pathname);

  const activeItem = useMemo(() => {
    return navItems.find(
      (item) =>
        item.path === pathname ||
        (item.path !== "/" && pathname?.startsWith(item.path))
    );
  }, [pathname]);

  const getDirection = useMemo(() => {
    if (!previousPathRef.current) return "right";

    const prevIndex = navItems.findIndex(
      (item) =>
        item.path === previousPathRef.current ||
        (item.path !== "/" && previousPathRef.current?.startsWith(item.path))
    );

    const currentIndex = navItems.findIndex(
      (item) =>
        item.path === pathname ||
        (item.path !== "/" && pathname?.startsWith(item.path))
    );

    return currentIndex > prevIndex ? "right" : "left";
  }, [pathname]);

  useEffect(() => {
    previousPathRef.current = pathname;
    setIsMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  return (
    <>
      {/* Desktop Navigation */}
      <nav className="hidden md:flex bg-white dark:bg-gray-900 rounded-xl shadow-lg items-center border border-white dark:border-gray-800 justify-between px-4 py-2">
        <div className="flex space-x-5">
          {navItems.map((item) => {
            const isActive = item === activeItem;
            return (
              <Link
                key={item.path}
                href={item.path}
                className={`text-sm font-medium relative py-1 transition-colors duration-100 ${
                  isActive
                    ? "text-slate-800 dark:text-neutral-200"
                    : "text-slate-800 dark:text-neutral-200"
                }`}
              >
                {item.name}
                {isActive && (
                  <div
                    className={`absolute -bottom-1 left-0 right-0 rounded-full h-[0.175rem] bg-indigo-700 dark:bg-indigo-600 indicator-${getDirection}`}
                  />
                )}
              </Link>
            );
          })}
        </div>
        <div className="flex items-center ml-2">
          <ThemeToggle />
        </div>
      </nav>

      {/* Mobile Navigation */}
      <nav className="flex md:hidden bg-white dark:bg-slate-900 border border-white dark:border-gray-800 rounded-xl px-3 py-2 shadow-lg items-center absolute left-3 justify-between">
        <button
          onClick={() => setIsMenuOpen(true)}
          className="p-1 text-slate-800 dark:text-neutral-200"
          aria-label="Open menu"
        >
          <Menu className="h-5 w-5" />
        </button>
      </nav>

      {/* Mobile Overlay */}
      {isMenuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={() => setIsMenuOpen(false)}
        />
      )}

      {/* Mobile Menu */}
      <div
        className={`fixed top-0 left-0 bottom-0 w-3/4 max-w-xs bg-white dark:bg-[#161b27] z-50 transform transition-transform duration-150 ease-out md:hidden ${
          isMenuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex justify-between items-center p-4 border-b border-gray-200 dark:border-gray-700">
          <ThemeToggle />
          <button
            onClick={() => setIsMenuOpen(false)}
            className="p-1 text-slate-800 dark:text-neutral-200"
            aria-label="Close menu"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="py-4">
          {navItems.map((item) => {
            const isActive = item === activeItem;
            return (
              <Link
                key={item.path}
                href={item.path}
                className={`flex items-center px-6 py-3 text-base font-medium relative transition-colors duration-100 ${
                  isActive
                    ? "text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-900/20"
                    : "text-slate-800 dark:text-neutral-200 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-gray-50 dark:hover:bg-gray-800/50"
                }`}
              >
                {item.name}
                {isActive && (
                  <div className="absolute left-0 top-0 bottom-0 w-1 bg-indigo-600 dark:bg-indigo-400" />
                )}
              </Link>
            );
          })}
        </div>
      </div>
    </>
  );
}
