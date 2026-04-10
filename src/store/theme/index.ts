import { defineStore } from "pinia"

import { ColorTheme, Mode, type State } from "./types"

let mediaQuery: MediaQueryList | null = null
let isInitialized = false
const handleSystemThemeChange = ({ matches }: MediaQueryListEvent) => {
  const store = useThemeStore()
  if (store.mode !== Mode.SYSTEM) return

  store.dark = matches
  if (matches) document.documentElement.classList.add("dark")
  else document.documentElement.classList.remove("dark")
}

const useThemeStore = defineStore("theme", {
  persist: true,
  state: (): State => {
    return {
      mode: Mode.SYSTEM,
      dark: matchMedia("(prefers-color-scheme: dark)").matches,
      colorTheme: ColorTheme.DEFAULT,
    }
  },
  actions: {
    init() {
      mediaQuery ??= matchMedia("(prefers-color-scheme: dark)")

      this.setColorTheme(this.colorTheme)
      this.setMode(this.mode)

      if (isInitialized) {
        return
      }

      mediaQuery.addEventListener("change", handleSystemThemeChange)
      isInitialized = true
    },
    setMode(mode: Mode) {
      mediaQuery ??= matchMedia("(prefers-color-scheme: dark)")
      this.mode = mode
      this.dark = mode === Mode.SYSTEM ? mediaQuery.matches : mode === Mode.DARK
      if (this.dark) document.documentElement.classList.add("dark")
      else document.documentElement.classList.remove("dark")
    },
    toggleMode() {
      this.setMode(this.dark ? Mode.LIGHT : Mode.DARK)
    },
    setColorTheme(colorTheme: ColorTheme) {
      this.colorTheme = colorTheme

      if (colorTheme === ColorTheme.DEFAULT) {
        document.documentElement.removeAttribute("data-theme")
      } else {
        document.documentElement.setAttribute("data-theme", colorTheme)
      }
    },
  },
})

export default useThemeStore
