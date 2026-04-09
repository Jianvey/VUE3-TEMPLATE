import type { AutoAnimateOptions, AutoAnimationPlugin } from "@formkit/auto-animate"

import { ObjectDirective } from "vue"

declare module "vue" {
  interface ComponentCustomProperties {
    /** 用户权限校验*/
    vPermission: ObjectDirective<HTMLElement, PermissionPaths>
    /**自动注入动画*/
    vAutoAnimate: ObjectDirective<HTMLElement, Partial<AutoAnimateOptions> | AutoAnimationPlugin>
  }
}
