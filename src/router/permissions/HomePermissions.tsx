import { mdiAccount } from "@mdi/js"
import { VIcon } from "vuetify/components"

import { type Permission, PermissionLevel } from "@/router/types/permission"

const HomePermissions = [
  {
    path: "/home",
    label: "首页",
    icon: <VIcon icon={mdiAccount} />,
    level: PermissionLevel.MENU,
  },
] as const satisfies readonly Permission[]

export default HomePermissions
