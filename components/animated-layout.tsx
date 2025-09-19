"use client"

import { motion, AnimatePresence } from "framer-motion"
import { usePathname } from "next/navigation"
import type { ReactNode } from "react"

interface AnimatedLayoutProps {
  children: ReactNode
}

export default function AnimatedLayout({ children }: AnimatedLayoutProps) {
  const pathname = usePathname()

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={pathname}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{
          type: "spring",
          stiffness: 380,
          damping: 30,
        }}
        className="min-h-screen pt-20"
      >
        {children}
      </motion.div>
    </AnimatePresence>
  )
}
