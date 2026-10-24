import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import test from 'node:test'
import { variablesToTokenSets } from './pull-figma.js'

test('converts Figma variables into token sets and preserves aliases', () => {
  const payload = JSON.parse(readFileSync(new URL('./fixtures/figma-variables.json', import.meta.url), 'utf8'))
  const tokens = variablesToTokenSets(payload)

  assert.equal(tokens.primitive.color.ink['900'].value, '#1c2824')
  assert.equal(tokens.primitive.color.ink['900'].type, 'color')
  assert.equal(tokens.primitive.space['16'].value, '16')
  assert.equal(tokens.primitive.space['16'].type, 'spacing')
  assert.equal(tokens.semantic.color.text.primary.value, '{primitive.color.ink.900}')
  assert.deepEqual(tokens.$metadata.tokenSetOrder, ['primitive', 'semantic'])
})
