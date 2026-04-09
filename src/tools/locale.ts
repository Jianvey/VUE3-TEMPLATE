import type { Keys } from "@/locale/types"

import { i18n } from "@/plugins/locale"

export function t(key: Keys, options: Record<string, unknown> = {}) {
  return i18n.global.t(key, options)
}
