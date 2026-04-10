/**
 * @description 生成权限类型文件
 */

import type { Plugin } from "vite"

import fs from "fs"
import path from "path"

function generatePermissionPathsType() {
  try {
    const content = `import type { PermissionPath } from "@/router/permissions"\n\ndeclare global {\n  type PermissionPaths = PermissionPath\n}\n\nexport {}\n`
    fs.writeFileSync(path.resolve(__dirname, "../../src/typings/permission-type.d.ts"), content)
  } catch (error) {
    console.error("❌ Error while generating permissions paths type:", error)
  }
}

export default function (): Plugin {
  return {
    name: "generate-permission-type",
    buildStart() {
      generatePermissionPathsType()
    },
    handleHotUpdate({ file }) {
      if (/\/src\/router\/permissions\/.*\.tsx$/.test(file)) generatePermissionPathsType()
    },
  }
}
