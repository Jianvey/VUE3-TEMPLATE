import { mdiAccount } from "@mdi/js"
import { VIcon } from "vuetify/components"

import { type Permission, PermissionLevel } from "@/router/types/permission"

const HomePermissions: Permission[] = [
  {
    path: "/home",
    label: "首页",
    icon: <VIcon icon={mdiAccount} />,
    level: PermissionLevel.MENU,
  },
]

export default HomePermissions
