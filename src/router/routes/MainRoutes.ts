import type { RouteRecordRaw } from "vue-router"

const MainRoutes: Readonly<RouteRecordRaw[]> = [
  {
    path: "/",
    name: "Layout",
    component: () => import("@/views/Main/Layout/Layout.vue"),
    redirect: "/home",
    children: [
      {
        path: "/home",
        name: "Home",
        component: () => import("@/views/Main/Home/Home.vue"),
        meta: { title: "首页", auth: true },
      },
    ],
  },
]

export default MainRoutes
