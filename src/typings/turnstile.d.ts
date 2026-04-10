export {}

declare global {
  interface Window {
    turnstile: {
      render: (
        container: string | HTMLElement,
        options: {
          sitekey: string
          theme?: "auto" | "light" | "dark"
          size?: "normal" | "flexible" | "compact"
          execution?: "render" | "execute"
          appearance?: "always" | "execute" | "interaction-only"
          callback?: (token: string) => void
          "error-callback"?: () => void
        },
      ) => string

      reset: (widgetId?: string) => void
      remove: (widgetId: string) => void
      getResponse: (widgetId: string) => string
      isExpired: (widgetId: string) => boolean
      execute: (widgetId: string) => void
    }
  }

  const turnstile: Window["turnstile"]
}
