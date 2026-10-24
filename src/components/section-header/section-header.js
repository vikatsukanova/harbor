import { escapeHtml } from '../../lib/html.js'

export function sectionHeaderHtml({ eyebrow, title, lede, level = 1 }) {
  const Tag = level === 1 ? 'h1' : 'h2'
  return `<header class="section-header">
    <p class="section-header__eyebrow">${escapeHtml(eyebrow)}</p>
    <${Tag} class="section-header__title">${escapeHtml(title)}</${Tag}>
    <p class="section-header__lede">${escapeHtml(lede)}</p>
  </header>`
}
