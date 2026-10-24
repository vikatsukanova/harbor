/**
 * Turns a Figma Variables API payload into Tokens Studio JSON.
 *
 * The local variables endpoint is available on Figma Enterprise.
 * On other plans, export from the Tokens Studio plugin and replace tokens/tokens.json,
 * keeping the same primitive / semantic / component sets.
 *
 *   FIGMA_TOKEN=... FIGMA_FILE_KEY=... npm run figma:pull
 *   npm run figma:pull -- --fixture scripts/fixtures/figma-variables.json
 */
import { readFileSync, writeFileSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')

export function figmaColorToHex({ r, g, b, a = 1 }) {
  const channel = (value) => Math.round(value * 255).toString(16).padStart(2, '0')
  const hex = `#${channel(r)}${channel(g)}${channel(b)}`
  return a < 0.999 ? `${hex}${channel(a)}` : hex
}

export function tokenTypeFor(name, resolvedType) {
  if (resolvedType === 'COLOR') return 'color'
  if (resolvedType === 'STRING') return name.includes('font/family') ? 'fontFamilies' : 'other'
  if (resolvedType === 'FLOAT') {
    if (name.includes('font/weight')) return 'fontWeights'
    if (name.includes('font/line')) return 'lineHeights'
    if (name.includes('font/size')) return 'fontSizes'
    if (name.includes('radius')) return 'borderRadius'
    return 'spacing'
  }
  return 'other'
}

function assign(target, name, token) {
  const parts = name.split('/')
  let cursor = target
  for (const part of parts.slice(0, -1)) {
    cursor[part] ??= {}
    cursor = cursor[part]
  }
  cursor[parts.at(-1)] = token
}

export function variablesToTokenSets(payload) {
  const collections = payload.meta.variableCollections
  const variables = payload.meta.variables
  const sets = {}

  for (const variable of Object.values(variables)) {
    const collection = collections[variable.variableCollectionId]
    const modeId = collection.modes[0]?.modeId
    const raw = variable.valuesByMode[modeId]
    const setName = collection.name
    sets[setName] ??= {}

    const value =
      raw && typeof raw === 'object' && raw.type === 'VARIABLE_ALIAS'
        ? referenceFor(raw.id)
        : formatValue(variable.name, variable.resolvedType, raw)

    assign(sets[setName], variable.name, {
      value,
      type: tokenTypeFor(variable.name, variable.resolvedType),
    })
  }

  function referenceFor(id) {
    const variable = variables[id]
    const collection = collections[variable.variableCollectionId]
    return `{${collection.name}.${variable.name.replaceAll('/', '.')}}`
  }

  return {
    ...sets,
    $metadata: { tokenSetOrder: Object.keys(sets) },
    $themes: [],
  }
}

function formatValue(name, resolvedType, raw) {
  if (resolvedType === 'COLOR') return figmaColorToHex(raw)
  if (resolvedType === 'FLOAT') return String(raw)
  return String(raw)
}

async function loadPayload() {
  const fixtureFlag = process.argv.indexOf('--fixture')
  if (fixtureFlag !== -1) {
    const file = path.resolve(root, process.argv[fixtureFlag + 1])
    return JSON.parse(readFileSync(file, 'utf8'))
  }

  const token = process.env.FIGMA_TOKEN
  const fileKey = process.env.FIGMA_FILE_KEY
  if (!token || !fileKey) {
    console.error('Set FIGMA_TOKEN and FIGMA_FILE_KEY, or pass --fixture <file>.')
    console.error('The variables API requires a Figma Enterprise plan. Otherwise export JSON from Tokens Studio.')
    process.exit(1)
  }

  const response = await fetch(`https://api.figma.com/v1/files/${fileKey}/variables/local`, {
    headers: { 'X-Figma-Token': token },
  })
  if (!response.ok) {
    console.error(`Figma responded ${response.status}. ${await response.text()}`)
    process.exit(1)
  }
  return response.json()
}

const isDirectRun = process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)

if (isDirectRun) {
  const payload = await loadPayload()
  const tokens = variablesToTokenSets(payload)
  const destination = path.join(root, 'tokens/tokens.json')
  writeFileSync(destination, `${JSON.stringify(tokens, null, 2)}\n`)
  console.log('Wrote tokens/tokens.json. Run npm run tokens next.')
}
