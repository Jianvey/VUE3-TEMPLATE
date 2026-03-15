import { defineStore } from "pinia"

import type { SnackbarOptions, State } from "./types"

const activeTexts = new Set<string>()

const useSnackbarStore = defineStore("snackbar", {
  state: (): State => {
    return {
      queue: [],
    }
  },
  actions: {
    open(options: SnackbarOptions) {
      if (activeTexts.has(options.text)) return

      activeTexts.add(options.text)
      this.queue.push({
        ...options,
        onDismiss: () => {
          activeTexts.delete(options.text)
        },
      })
    },

    close() {
      const message = this.queue.shift()
      if (message) activeTexts.delete(message.text)
    },

    clear() {
      this.queue = []
      activeTexts.clear()
    },
  },
})

export default useSnackbarStore
