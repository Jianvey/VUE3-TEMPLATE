import type { VSnackbar } from "vuetify/components"

export type SnackbarColor = VSnackbar["$props"]["color"]

export interface SnackbarOptions {
  text: string
  color?: SnackbarColor
  timeout?: number
}

export interface SnackbarMessage {
  text: string
  color?: SnackbarColor
  timeout?: number
  onDismiss?: () => void
}

export interface State {
  queue: SnackbarMessage[]
}
