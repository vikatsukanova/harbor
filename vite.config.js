import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { defineConfig } from 'vite'

const root = path.dirname(fileURLToPath(import.meta.url))

export default defineConfig({
  css: {
    preprocessorOptions: {
      scss: {
        loadPaths: [path.join(root, 'node_modules')],
        quietDeps: true,
        silenceDeprecations: ['import', 'global-builtin', 'color-functions', 'if-function', 'slash-div'],
      },
    },
  },
})
