import { snackbar } from "@/tools/snackbar"

const CHECK_INTERVAL = 60 * 1000
const VERSION_KEY = "version"

let timer: number | null = null
let isChecking = false
let hasNotified = false

function clearTimer() {
  if (timer === null) {
    return
  }

  window.clearTimeout(timer)
  timer = null
}

function scheduleNextCheck() {
  if (!import.meta.env.PROD || hasNotified) {
    return
  }

  clearTimer()
  timer = window.setTimeout(check, CHECK_INTERVAL)
}

/**
 * @description 检查站点更新
 */
async function check() {
  if (!import.meta.env.PROD) {
    clearTimer()
    return
  }

  if (document.visibilityState !== "visible" || isChecking || hasNotified) {
    scheduleNextCheck()
    return
  }

  isChecking = true

  try {
    const response = await fetch(`/version.json?timestamp=${Date.now()}`, { cache: "no-store" })
    if (!response.ok) {
      return
    }

    const { version } = (await response.json()) as { version?: string }
    if (!version) {
      return
    }

    const currentVersion = localStorage.getItem(VERSION_KEY)
    if (!currentVersion) {
      localStorage.setItem(VERSION_KEY, version)
      return
    }

    if (currentVersion !== version) {
      hasNotified = true
      clearTimer()
      localStorage.setItem(VERSION_KEY, version)
      snackbar.warning("检测到新版本，请手动刷新页面", 5000)
    }
  } catch {
    // ignore network instability and retry later
  } finally {
    isChecking = false
    if (!hasNotified) {
      scheduleNextCheck()
    }
  }
}

document.addEventListener("visibilitychange", () => {
  if (document.visibilityState === "visible" && !hasNotified) {
    void check()
  }
})

check()
