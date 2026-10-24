import { escapeHtml } from '../../lib/html.js'

export function cardHtml({ meta, title, href, body, level = 2 }) {
  const Tag = `h${level}`
  return `<article class="card">
    <p class="card__meta">${escapeHtml(meta)}</p>
    <${Tag} class="card__title"><a href="${escapeHtml(href)}">${escapeHtml(title)}</a></${Tag}>
    <p class="card__body">${escapeHtml(body)}</p>
  </article>`
}
