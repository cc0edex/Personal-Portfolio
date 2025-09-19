"use client"

import { useMediaQuery } from "./use-media-query"

export function useResponsive() {
  const isMobile = useMediaQuery("(max-width: 768px)")
  const isTablet = useMediaQuery("(min-width: 769px) and (max-width: 1024px)")
  const isDesktop = useMediaQuery("(min-width: 1025px)")
  const isLargeDesktop = useMediaQuery("(min-width: 1280px)")

  return {
    isMobile,
    isTablet,
    isDesktop,
    isLargeDesktop,
    // Helper for conditional rendering
    screen: {
      mobile: isMobile,
      tablet: isTablet,
      desktop: isDesktop,
      largeDesktop: isLargeDesktop,
    },
  }
}
