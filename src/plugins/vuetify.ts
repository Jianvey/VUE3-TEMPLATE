import "@/assets/styles/css/vendors/vuetify/settings.scss"
import "vuetify/styles"

import type { App } from "vue"

import { useI18n } from "vue-i18n"
import { createVuetify } from "vuetify"
import { aliases, mdi } from "vuetify/iconsets/mdi-svg"
import { createVueI18nAdapter } from "vuetify/locale/adapters/vue-i18n"

import { i18n } from "@/plugins/locale"

export function setupVuetify(app: App<Element>) {
  const vuetify = createVuetify({
    icons: { defaultSet: "mdi", aliases, sets: { mdi } },
    locale: {
      adapter: createVueI18nAdapter({ i18n, useI18n }),
    },
  })

  app.use(vuetify)
}
