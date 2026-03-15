import NProgress from "nprogress"
import type { RouteLocationNormalized } from "vue-router"

import { SITE_TITLE } from "@/global/env"
import routes from "@/router/routes"

/**
 * @description 获取所有 keep-alive: true 的路由名称
 * @param {RouteRecordRaw[]} list 路由列表
 * @return {string[]} 路由名称数组
 */
export function getKeepAliveNames(list = routes): string[] {
  return list.reduce<string[]>((names: string[], { name, meta, children }) => {
    if (meta?.["keep-alive"]) names.push(name as string)
    if (children?.length) names.push(...getKeepAliveNames(children))
    return names
  }, [])
}

/**
 * @description 进度条控制
 * @param {boolean} show 是否显示进度条
 * @return {}
 */
export function setProgress(show: boolean = true): void {
  if (show) {
    NProgress.start()
  } else {
    NProgress.done()
  }
}

/**
 * @description 设置页面标题
 * @param {RouteLocationNormalized} route 路由
 * @return {}
 */
export function setTitle({ meta: { title } }: RouteLocationNormalized): void {
  document.title = title ? `${title} | ${SITE_TITLE}` : SITE_TITLE
}
