import type { App } from "vue"

import { createPinia } from "pinia"
import persistedstate from "pinia-plugin-persistedstate"

import useLocaleStore from "@/store/locale"
import useThemeStore from "@/store/theme"

export const PINIA = createPinia()

export function setupPinia(app: App<Element>) {
  app.use(PINIA.use(persistedstate))

  const theme = useThemeStore(PINIA)
  const locale = useLocaleStore(PINIA)
  theme.init()
  locale.setLanguage(locale.language)
}
