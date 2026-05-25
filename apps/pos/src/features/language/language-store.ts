import { create } from "zustand"
import { persist } from "zustand/middleware"

export type Language = "EN" | "MY"

interface LanguageState {
  /** Currently active UI language */
  language: Language
  /** Switch the active language and persist to localStorage */
  setLanguage: (language: Language) => void
}

/**
 * Global language store — persists the staff's preferred language to
 * localStorage (`rms_language`) so it survives across sessions.
 *
 * Default: English (`EN`).
 *
 * Usage:
 * ```ts
 * const language = useLanguageStore((s) => s.language)
 * const setLanguage = useLanguageStore((s) => s.setLanguage)
 * ```
 */
export const useLanguageStore = create<LanguageState>()(
  persist(
    (set) => ({
      language: "EN",
      setLanguage: (language) => set({ language }),
    }),
    {
      name: "rms_language",
    }
  )
)
