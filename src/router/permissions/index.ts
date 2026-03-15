import HomePermissions from "@/router/permissions/HomePermissions"
import type { Permission } from "@/router/types/permission"

const permissions: Permission[] = [...HomePermissions]

export default permissions
