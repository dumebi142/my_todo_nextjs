'use client'

import * as React from "react"
import { ThemeProvider, useTheme } from "next-themes"
import { IconButton, Skeleton, IconButtonProps, Span } from "@chakra-ui/react"
import { LuMoon, LuSun } from "react-icons/lu"

// -----------------------------
// Color Mode Provider
// -----------------------------
export function ColorModeProvider(
  props: React.ComponentProps<typeof ThemeProvider>
) {
  return <ThemeProvider attribute="class" disableTransitionOnChange {...props} />
}

// -----------------------------
// Typed Hook for Color Mode
// -----------------------------
export function useColorMode() {
  const { resolvedTheme, setTheme, forcedTheme } = useTheme()
  const colorMode = forcedTheme || resolvedTheme || 'light'

  const toggleColorMode = () => {
    if (!resolvedTheme) return
    setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')
  }

  return { colorMode, toggleColorMode, setColorMode: setTheme }
}

// -----------------------------
// Hook for light/dark value selection
// -----------------------------
export function useColorModeValue<T>(light: T, dark: T): T {
  const { colorMode } = useColorMode()
  return colorMode === 'dark' ? dark : light
}

// -----------------------------
// Color Mode Toggle Button
// -----------------------------
export const ColorModeButton = React.forwardRef<HTMLButtonElement, IconButtonProps>(
  function ColorModeButton(props, ref) {
    const { toggleColorMode, colorMode } = useColorMode()

    return (
      <React.Suspense fallback={<Skeleton boxSize="8" />}>
        <IconButton
          onClick={toggleColorMode}
          variant="ghost"
          size="sm"
          aria-label="Toggle color mode"
          ref={ref}
          {...props}
          _icon={{ w: 5, h: 5 }}        />
           {colorMode === "dark" ? <LuMoon /> : <LuSun />}
      </React.Suspense>
    )
  }
)

// -----------------------------
// Optional: Light / Dark wrappers
// -----------------------------
export const LightMode = React.forwardRef<HTMLSpanElement, React.ComponentProps<typeof Span>>(
  function LightMode(props, ref) {
    return (
      <Span
        color="fg"
        display="contents"
        className="chakra-theme light"
        colorPalette="gray"
        colorScheme="light"
        ref={ref}
        {...props}
      />
    )
  }
)

export const DarkMode = React.forwardRef<HTMLSpanElement, React.ComponentProps<typeof Span>>(
  function DarkMode(props, ref) {
    return (
      <Span
        color="fg"
        display="contents"
        className="chakra-theme dark"
        colorPalette="gray"
        colorScheme="dark"
        ref={ref}
        {...props}
      />
    )
  }
)
