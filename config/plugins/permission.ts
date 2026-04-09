/**
 * @description 生成权限类型文件
 */

import type { Plugin } from "vite"

import fs from "fs"
import path from "path"

/**
 * 递归获取目录下所有以 .tsx 结尾的文件路径
 * @param dir 起始目录
 * @returns 文件路径数组
 */
function getTsxFiles(dir: string): string[] {
  const entries = fs.readdirSync(dir, { withFileTypes: true })
  const files = entries.flatMap(entry => {
    const fullPath = path.join(dir, entry.name)
    if (entry.isDirectory()) {
      // 如果是文件夹，递归进入
      return getTsxFiles(fullPath)
    } else if (entry.isFile() && entry.name.endsWith(".tsx")) {
      // 如果是 .tsx 文件，记录路径
      return fullPath
    } else {
      return []
    }
  })
  return files
}

async function generatePermissionPathsType() {
  try {
    const permissionsDir = path.resolve(__dirname, "../../src/router/permissions")
    const tsxFiles = getTsxFiles(permissionsDir)

    const paths = tsxFiles.flatMap(file => {
      const fileContent = fs.readFileSync(file, "utf-8")
      // 提取路径匹配
      return [...fileContent.matchAll(/path:\s*["']([^"']+)["']/g)].map(match => match[1])
    })

    const pathUnionType = paths.map(path => ` | "${path}"`).join("\n")
    const content = `declare global {\ntype PermissionPaths =\n${pathUnionType};\n}\nexport {}`
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
