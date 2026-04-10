import type { VNode } from "vue"

export enum PermissionLevel {
  // 一级大模块
  MODULE = 0,
  // 二级菜单
  MENU = 1,
  // Tab页
  TAB = 2,
  // 功能按钮
  ACTION = 9,
}

export interface Permission {
  // 权限唯一值
  path: string
  // 权限描述标签
  label: string
  // 权限图标
  icon?: VNode
  // 权限等级
  level: PermissionLevel
  // 子列表
  children?: readonly Permission[]
}

export type PermissionPathFromTree<Tree> = Tree extends readonly (infer Item)[]
  ? PermissionPathFromTree<Item>
  : Tree extends {
        path: infer Path extends string
        children?: infer Children
      }
    ? Path | PermissionPathFromTree<NonNullable<Children>>
    : never
