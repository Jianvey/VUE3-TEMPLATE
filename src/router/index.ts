import { createRouter, createWebHistory } from "vue-router"

import { BASE_URL } from "@/global/env"
import routes from "@/router/routes"
import useStore from "@/store"
import { hasPermission } from "@/tools/permission"
import { setProgress, setTitle } from "@/tools/router"

const router = createRouter({
  history: createWebHistory(BASE_URL),
  routes,
  scrollBehavior(to, from, saved) {
    if (saved) return saved
    if (to.hash) return { el: to.hash, behavior: "smooth" }
    return { top: 0, left: 0, behavior: "smooth" }
  },
})

router.beforeEach(to => {
  setProgress()

  if (to.meta.auth && (!useStore().user.token || !hasPermission(to.meta.permission ?? to.path))) {
    return { name: "Login" }
  }

  return true
})

router.afterEach(to => {
  setProgress(false)
  setTitle(to)
})

export default router
