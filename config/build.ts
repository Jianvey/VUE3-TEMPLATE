import type { BuildOptions, ConfigEnv } from "vite"

export default function build(_config: ConfigEnv): BuildOptions {
  return {
    rollupOptions: {
      output: {
        chunkFileNames: "js/[hash].js",
        entryFileNames: "js/[hash].js",
        assetFileNames: "assets/[ext]/[hash].[ext]",
        manualChunks(id) {
          if (id.includes("node_modules")) {
            return "vendor"
          }
        },
      },
    },
  }
}
