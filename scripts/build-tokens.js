import { mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { register } from '@tokens-studio/sd-transforms'
import StyleDictionary from 'style-dictionary'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const destination = path.join(root, 'src/styles/_tokens.scss')
const check = process.argv.includes('--check')

register(StyleDictionary)

// Primitive tokens keep a prefix so they can be referenced.
// Semantic and component tokens drop the set name: --color-text-primary, --button-padding-x.
StyleDictionary.registerTransform({
  name: 'name/harbor',
  type: 'name',
  transform: (token) => {
    const [set, ...rest] = token.path
    const parts = set === 'primitive' ? ['primitive', ...rest] : rest
    return parts.join('-')
  },
})

const buildPath = check ? mkdtempSync(path.join(tmpdir(), 'harbor-tokens-')) : path.join(root, 'src/styles')

const sd = new StyleDictionary({
  source: [path.join(root, 'tokens/tokens.json')],
  preprocessors: ['tokens-studio'],
  platforms: {
    css: {
      transformGroup: 'tokens-studio',
      transforms: ['name/harbor'],
      buildPath: buildPath.endsWith(path.sep) ? buildPath : `${buildPath}${path.sep}`,
      files: [
        {
          destination: check ? 'tokens.css' : '_tokens.scss',
          format: 'css/variables',
          options: { outputReferences: true },
          // Primitives stay in the file so semantic tokens can point at them with var().
          filter: (token) => !token.path.some((part) => String(part).startsWith('$')),
        },
      ],
    },
  },
})

await sd.buildAllPlatforms()

const generatedPath = check ? path.join(buildPath, 'tokens.css') : destination
const banner = '/* Generated from tokens/tokens.json. Run `npm run tokens` after editing tokens. */\n'
const css = `${banner}${readFileSync(generatedPath, 'utf8').trim()}\n`

if (check) {
  rmSync(buildPath, { recursive: true, force: true })
  const current = readFileSync(destination, 'utf8')
  if (current !== css) {
    console.error('src/styles/_tokens.scss is out of date. Run npm run tokens.')
    process.exit(1)
  }
  console.log('Tokens match src/styles/_tokens.scss')
} else {
  writeFileSync(destination, css)
  console.log('Wrote src/styles/_tokens.scss')
}
