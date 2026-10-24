import $ from 'jquery'
import 'foundation-sites'
import { escapeHtml } from '../../lib/html.js'

export function accordionHtml() {
  const items = [
    ['Tide tables', 'Posted each Friday. The print specification asks for 17px body type on the notice board.'],
    ['Pier closures', 'Wind over 40 knots closes the outer arm. The sign uses the same copper as a text link.'],
  ]

  const list = items
    .map(([title, body], index) => {
      const active = index === 0 ? ' is-active' : ''
      return `<li class="accordion-item${active}" data-accordion-item>
        <a href="#panel-${index}" class="accordion-title">${escapeHtml(title)}</a>
        <div class="accordion-content" data-tab-content id="panel-${index}"><p>${escapeHtml(body)}</p></div>
      </li>`
    })
    .join('')

  return `<ul class="accordion accordion--harbor" data-accordion data-allow-all-closed="true">${list}</ul>`
}

export function initAccordion(root) {
  $(root).foundation()
}
