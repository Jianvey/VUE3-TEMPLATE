import type { RouteRecordRaw } from "vue-router"

const AuthRoutes: Readonly<RouteRecordRaw[]> = [
  {
    path: "/login",
    name: "Login",
    component: () => import("@/views/Auth/Login/Login.vue"),
    meta: { title: "登录" },
  },
]

export default AuthRoutes
