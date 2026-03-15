import type { RouteRecordRaw } from "vue-router"

import AuthRoutes from "@/router/routes/AuthRoutes"
import ErrorRoutes from "@/router/routes/ErrorRoutes"
import MainRoutes from "@/router/routes/MainRoutes"

const routes: Readonly<RouteRecordRaw[]> = [...AuthRoutes, ...MainRoutes, ...ErrorRoutes]

export default routes
