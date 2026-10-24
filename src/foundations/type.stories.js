import { mount } from '../lib/html.js'

const samples = [
  ['Display', '--font-size-display', '--font-family-serif', 'Notes from a working shoreline'],
  ['Title', '--font-size-title', '--font-family-serif', 'The pier at last light'],
  ['Body', '--font-size-body', '--font-family-serif', 'The archive keeps two copies of every notice.'],
  ['UI', '--font-size-small', '--font-family-sans', 'Save changes'],
  ['Eyebrow', '--font-size-eyebrow', '--font-family-sans', 'JOURNAL'],
]

export default { title: 'Foundations/Type' }

export const Ramp = {
  render: () =>
    mount(
      `<div class="type-ramp">${samples
        .map(
          ([name, size, family, text]) =>
            `<p class="type-ramp__row"><span class="type-ramp__name">${name}</span><span style="font-size: var(${size}); font-family: var(${family})">${text}</span></p>`,
        )
        .join('')}</div>`,
    ),
}
