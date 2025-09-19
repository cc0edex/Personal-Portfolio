"use client"

import { usePathname } from "next/navigation"
import type { ReactNode } from "react"

interface PageWrapperProps {
  children: ReactNode
}

export default function PageWrapper({ children }: PageWrapperProps) {
  const pathname = usePathname()

  return (
    <div key={pathname} className="min-h-screen transition-opacity duration-100 ease-out">
      {children}
    </div>
  )
}
