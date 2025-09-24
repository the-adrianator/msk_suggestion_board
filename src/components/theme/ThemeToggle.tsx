"use client";
import { useTheme } from "next-themes";
import {
  SunIcon,
  MoonIcon,
  ComputerDesktopIcon,
} from "@heroicons/react/24/outline";

export const ThemeToggle: React.FC = () => {
  const { theme, setTheme } = useTheme();

  // Cycle through themes: light → dark → system
  const toggleTheme = () => {
    if (theme === "light") setTheme("dark");
    else if (theme === "dark") setTheme("system");
    else setTheme("light");
  };

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colours"
      aria-label="Toggle theme"
    >
      {theme === "light" && <SunIcon className="h-5 w-5" />}
      {theme === "dark" && <MoonIcon className="h-5 w-5" />}
      {theme === "system" && <ComputerDesktopIcon className="h-5 w-5" />}
    </button>
  );
};
