import type { SnackbarOptions } from "@/store/snackbar/types"

import useStore from "@/store"

function open(params: SnackbarOptions) {
  const { snackbar } = useStore()
  snackbar.open({ text: params.text, color: params.color, timeout: params?.timeout ?? 3000 })
}

export const snackbar = {
  success(text: string, timeout?: number) {
    open({ text, color: "success", timeout })
  },

  error(text: string, timeout?: number) {
    open({ text, color: "error", timeout })
  },

  warning(text: string, timeout?: number) {
    open({ text, color: "warning", timeout })
  },

  info(text: string, timeout?: number) {
    open({ text, color: "info", timeout })
  },

  close() {
    const { snackbar } = useStore()
    snackbar.close()
  },

  clear() {
    const { snackbar } = useStore()
    snackbar.clear()
  },
}
