export enum Mode {
  LIGHT,
  DARK,
  SYSTEM,
}

export enum ColorTheme {
  DEFAULT = "default",
  LAVENDER = "lavender",
}

export interface State {
  mode: Mode
  dark: boolean
  colorTheme: ColorTheme
}
