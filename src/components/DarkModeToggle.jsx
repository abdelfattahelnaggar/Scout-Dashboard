import { useTranslation } from "react-i18next";
import { useState, useEffect } from "react";

export default function DarkModeToggle() {
  const { t, i18n } = useTranslation();
  const [isDark, setIsDark] = useState(() => {
    // Check localStorage first, then system preference
    const saved = localStorage.getItem("darkMode");
    if (saved !== null) return JSON.parse(saved);
    return window.matchMedia("(prefers-color-scheme: dark)").matches;
  });

  useEffect(() => {
    // Apply dark class to html element
    if (isDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    // Save preference
    localStorage.setItem("darkMode", JSON.stringify(isDark));
  }, [isDark]);

  const toggleDarkMode = () => {
    setIsDark(!isDark);
  };

  return (
    <div className="flex items-center gap-1 z-50">
      <span
        className={` flex items-center dark:text-primary-text-dark text-md text-primary-text ${i18n.language === "ar" ? "font-bold" : "font-medium"}`}
      >
        {t("Theme")}:{" "}
      </span>
      <div
        className="relative size-6 rounded-full cursor-pointer transition-all duration-500 z-50 "
        style={{
          color: isDark ? "hsl(240, 100%, 95%)" : "hsl(40, 100%, 50%)",
          transform: isDark ? "scale(1)" : "scale(0.75)",
          boxShadow: isDark
            ? "inset calc(2rem * 0.33) calc(2rem * -0.25) 0"
            : `inset 0 0 0 2rem,
             calc(2rem * 0.65 * -1) 0 0 calc(2rem * -0.4),
             calc(2rem * 0.65) 0 0 calc(2rem * -0.4),
             0 calc(2rem * 0.65 * -1) 0 calc(2rem * -0.4),
             0 calc(2rem * 0.65) 0 calc(2rem * -0.4),
             calc(2rem * 0.45 * -1) calc(2rem * 0.45 * -1) 0 calc(2rem * -0.4),
             calc(2rem * 0.45) calc(2rem * 0.45) 0 calc(2rem * -0.4),
             calc(2rem * 0.45 * -1) calc(2rem * 0.45) 0 calc(2rem * -0.4),
             calc(2rem * 0.45) calc(2rem * 0.45 * -1) 0 calc(2rem * -0.4)`,
        }}
        onClick={toggleDarkMode}
        role="button"
        aria-label="Toggle dark mode"
        tabIndex={0}
      />
    </div>
  );
}
