"use client"

import { useState, useEffect } from "react"
import { useTheme } from "next-themes"
import { Moon, Sun } from "lucide-react"
import { useMediaQuery } from "@/hooks/use-media-query"

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const isTablet = useMediaQuery("(min-width: 769px) and (max-width: 1024px)")

  // Avoid hydration mismatch
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <button className="h-7 w-7 md:h-7 lg:h-8 md:w-7 lg:w-8 rounded-full flex items-center justify-center">
        <Moon className="h-3.5 w-3.5 md:h-3.5 lg:h-4 md:w-3.5 lg:w-4" />
        <span className="sr-only">Toggle theme</span>
      </button>
    )
  }

  return (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="h-7 w-7 md:h-7 lg:h-8 md:w-7 lg:w-8 rounded-full flex items-center justify-center text-gray-700 dark:text-gray-300 transition-transform duration-150 hover:rotate-12"
      aria-label="Toggle theme"
    >
      <div className="relative w-3.5 h-3.5 md:w-3.5 lg:w-4 md:h-3.5 lg:h-4">
        <Moon
          className={`h-3.5 w-3.5 md:h-3.5 lg:h-4 md:w-3.5 lg:w-4 absolute transition-all duration-150 ${theme === "dark" ? "opacity-0 rotate-90 scale-0" : "opacity-100 rotate-0 scale-100"}`}
        />
        <Sun
          className={`h-3.5 w-3.5 md:h-3.5 lg:h-4 md:w-3.5 lg:w-4 absolute transition-all duration-150 ${theme === "dark" ? "opacity-100 rotate-0 scale-100" : "opacity-0 rotate-90 scale-0"}`}
        />
      </div>
      <span className="sr-only">Toggle theme</span>
    </button>
  )
}
