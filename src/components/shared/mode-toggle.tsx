"use client"

import * as React from "react"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"

export function ModeToggle() {
  const { setTheme, resolvedTheme } = useTheme()
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <button
      onClick={() => setTheme(resolvedTheme === "light" ? "dark" : "light")}
      className="rounded-full border border-gray-300 dark:border-white/15 shadow-lg shadow-sky-900/10 size-10 flex justify-center items-center hover:bg-black/5 dark:hover:bg-white/10 transition-colors cursor-pointer text-[var(--heading-color)] dark:text-[var(--heading-color-dark)]"
    >
      <span className="sr-only">Toggle theme</span>
      {!mounted ? (
        <span className="w-5 h-5"></span>
      ) : resolvedTheme === "dark" ? (
        <Moon className="w-5 h-5" />
      ) : (
        <Sun className="w-5 h-5" />
      )}
    </button>
  )
}
