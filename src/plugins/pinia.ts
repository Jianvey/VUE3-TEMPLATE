import type { App } from "vue"

import { createPinia } from "pinia"
import persistedstate from "pinia-plugin-persistedstate"

export const PINIA = createPinia()

export function setupPinia(app: App<Element>) {
  app.use(PINIA.use(persistedstate))
}
