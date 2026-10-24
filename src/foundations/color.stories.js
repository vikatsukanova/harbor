import { mount } from '../lib/html.js'

const swatches = [
  ['Page', '--color-background-page', '--color-text-primary'],
  ['Raised', '--color-background-raised', '--color-text-primary'],
  ['Accent', '--color-background-accent', '--color-text-inverse'],
  ['Danger surface', '--color-background-danger', '--color-text-danger'],
  ['Link', '--color-background-page', '--color-text-link'],
  ['Muted', '--color-background-page', '--color-text-muted'],
]

export default { title: 'Foundations/Color' }

export const Swatches = {
  render: () =>
    mount(`<ul class="swatches">${swatches
      .map(
        ([name, background, color]) =>
          `<li class="swatches__item" style="background: var(${background}); color: var(${color})"><span>${name}</span></li>`,
      )
      .join('')}</ul>`),
}
