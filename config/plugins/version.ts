import { exec } from "child_process"
import fs from "fs"
import path from "path"
import type { Plugin } from "vite"

export default function (): Plugin {
  return {
    name: "create-version",
    buildStart() {
      exec("git log -1 --pretty=format:'%H %cd' --date=iso-strict", (err, stdout) => {
        fs.writeFile(
          path.join(__dirname, "../../public/version.json"),
          JSON.stringify({ version: stdout.trim() }),
          "utf8",
          () => {},
        )
      })
    },
  }
}
