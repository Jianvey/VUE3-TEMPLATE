import permissions from "@/router/permissions"
import type { Permission } from "@/router/types/permission"
import { PermissionLevel } from "@/router/types/permission"
import useStore from "@/store"

/**
 * @description 判断当前用户是否拥有查询的权限
 * @param {Permission[]} permission 权限名称
 * @return {boolean} true:拥有权限 false:没有权限
 */
export function hasPermission(permission: string): boolean {
  return useStore().user.permission.includes(permission)
}

/**
 * @description 获取当前用户模块权限
 * @param {Permission[]} permissions 获取的权限数组
 * @return {Permission[]} 返回合法模块列表
 */
export function getModulePermissions(permissions: Permission[]): Permission[] {
  return permissions.reduce<Permission[]>((result, permission) => {
    const { level } = permission
    if (!hasPermission(permission.path)) return result
    if (level === PermissionLevel.MODULE) result.push(permission)

    return result
  }, [])
}

/**
 * @description 获取当前用户菜单权限
 * @param {Permission[]} permissions 获取的权限数组
 * @return {Permission[]} 返回合法菜单列表
 */
export function getMenuPermissions(permissions: Permission[]): Permission[] {
  return permissions.reduce<Permission[]>((result, permission) => {
    const { level, children } = permission
    if (!hasPermission(permission.path)) return result

    if (level === PermissionLevel.MODULE && children?.length) {
      result.push(...getMenuPermissions(children))
    } else if (level === PermissionLevel.MENU) {
      if (children?.length) result.push({ ...permission, children: getMenuPermissions(children) })
      else result.push(permission)
    }

    return result
  }, [])
}

/**
 * @description 获取当前用户第一个菜单权限
 * @return {Permission} 返回合法菜单
 */
export function getFirstMenu(): Permission | undefined {
  return getMenuPermissions(permissions)?.[0]
}
