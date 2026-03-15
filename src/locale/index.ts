import { en, ja, zhHans } from "vuetify/locale"

import enUS from "@/locale/languages/en-US.json"
import jaJP from "@/locale/languages/ja-JP.json"
import zhCN from "@/locale/languages/zh-CN.json"
import type { Locales } from "@/locale/types"
import type { Messages } from "@/locale/types"

const vuetifyMessages = {
  "en-US": en,
  "zh-CN": zhHans,
  "ja-JP": ja,
}

export const messages: Messages = {
  "en-US": { ...enUS, $vuetify: vuetifyMessages["en-US"] },
  "zh-CN": { ...zhCN, $vuetify: vuetifyMessages["zh-CN"] },
  "ja-JP": { ...jaJP, $vuetify: vuetifyMessages["ja-JP"] },
}

const locales: Locales[] = [
  { label: "English", language: "en-US" },
  { label: "简体中文", language: "zh-CN" },
  { label: "日本語", language: "ja-JP" },
]

export default locales
