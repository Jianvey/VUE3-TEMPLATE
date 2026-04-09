import { defineStore } from "pinia"

import type { Language } from "@/locale/types"

import { i18n } from "@/plugins/locale"

import type { State } from "./types"

const useLocaleStore = defineStore("locale", {
  persist: true,
  state: (): State => {
    return {
      language: "en-US",
    }
  },
  actions: {
    setLanguage(language: Language) {
      i18n.global.locale.value = language
      this.language = language
    },
  },
})

export default useLocaleStore
