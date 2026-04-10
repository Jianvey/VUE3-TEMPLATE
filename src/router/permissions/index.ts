import type { Permission, PermissionPathFromTree } from "@/router/types/permission"

import HomePermissions from "@/router/permissions/HomePermissions"

export const permissions = [...HomePermissions] as const satisfies readonly Permission[]

export type PermissionPath = PermissionPathFromTree<typeof permissions>

export default permissions
