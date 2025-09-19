"use client"

import type { ReactNode } from "react"

interface CategoryBadgeProps {
  children: ReactNode
  className?: string
}

export default function CategoryBadge({ children, className = "" }: CategoryBadgeProps) {
  const baseClasses =
    "text-xs px-2 py-1 rounded-full bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300"

  return <span className={`${baseClasses} ${className}`}>{children}</span>
}
