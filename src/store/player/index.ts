import { defineStore } from "pinia"
import { markRaw, toRaw } from "vue"

import type { State } from "./types"

export default defineStore("player", {
  persist: false,
  state: (): State => ({
    players: [],
  }),
  actions: {
    register(player: Plyr) {
      const raw = markRaw(player)
      if (!this.players.some(p => toRaw(p) === raw)) {
        this.players.push(raw)
      }
    },
    unregister(player: Plyr) {
      const index = this.players.findIndex(p => toRaw(p) === toRaw(player))
      if (index !== -1) {
        this.players.splice(index, 1)
      }
    },
    pauseOthers(current: Plyr) {
      const rawCurrent = toRaw(current)
      this.players.forEach(p => {
        if (toRaw(p) !== rawCurrent && !p.paused) {
          p.pause()
        }
      })
    },
  },
})
