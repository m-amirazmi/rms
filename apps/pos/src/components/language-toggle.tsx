import { cn } from "@workspace/ui/lib/utils"

import { useLanguageStore } from "@/features/language"
import { MY, GB } from "country-flag-icons/react/3x2"

interface LanguageToggleProps {
  className?: string
}

/**
 * Two-segment language toggle.
 *
 * Active option is highlighted with primary background; inactive option
 * is transparent. Designed to easily accommodate a third language in the
 * future by switching from a segmented control to a dropdown.
 */
export function LanguageToggle({ className }: LanguageToggleProps) {
  const language = useLanguageStore((s) => s.language)
  const setLanguage = useLanguageStore((s) => s.setLanguage)

  return (
    <div
      className={cn(
        "inline-flex items-center rounded-md border border-border bg-muted p-0.5 text-xs font-medium tracking-wider uppercase",
        className
      )}
    >
      {(["EN", "MY"] as const).map((lang) => (
        <button
          key={lang}
          type="button"
          onClick={() => setLanguage(lang)}
          className={cn(
            "flex items-center gap-1 rounded-sm px-2 py-2 leading-none transition-colors",
            language === lang
              ? "bg-primary text-primary-foreground"
              : "text-muted-foreground hover:text-foreground"
          )}
          aria-pressed={language === lang}
        >
          {lang === "EN" ? (
            <GB className="inline-block h-3 w-4" title="English" />
          ) : (
            <MY className="inline-block h-3 w-4" title="Malay" />
          )}
          {lang}
        </button>
      ))}
    </div>
  )
}
