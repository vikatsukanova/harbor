import { spawn } from 'node:child_process'
import { watch } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
let running = false
let queued = false

function build() {
  if (running) {
    queued = true
    return
  }
  running = true
  const child = spawn('node', ['scripts/build-tokens.js'], { cwd: root, stdio: 'inherit' })
  child.on('exit', () => {
    running = false
    if (queued) {
      queued = false
      build()
    }
  })
}

build()
watch(path.join(root, 'tokens'), () => build())
console.log('Watching tokens/. Edit tokens.json and Storybook will pick up the new CSS.')
