import { escapeHtml } from '../../lib/html.js'

export function disclosureHtml({ id, title, body, open = false }) {
  const expanded = open ? 'true' : 'false'
  const hidden = open ? '' : ' hidden'
  const triggerId = `${id}-trigger`
  return `<div class="disclosure" data-disclosure>
    <button class="disclosure__trigger" id="${escapeHtml(triggerId)}" type="button" aria-expanded="${expanded}" aria-controls="${escapeHtml(id)}" data-disclosure-trigger>
      <span>${escapeHtml(title)}</span>
      <span class="disclosure__icon" aria-hidden="true"></span>
    </button>
    <div class="disclosure__panel" id="${escapeHtml(id)}" role="region" aria-labelledby="${escapeHtml(triggerId)}" data-disclosure-panel${hidden}>
      <p>${escapeHtml(body)}</p>
    </div>
  </div>`
}

export function initDisclosure(root) {
  const nodes = root.matches?.('[data-disclosure]') ? [root] : [...root.querySelectorAll('[data-disclosure]')]

  for (const node of nodes) {
    const trigger = node.querySelector('[data-disclosure-trigger]')
    const panel = node.querySelector('[data-disclosure-panel]')
    const setOpen = (open) => {
      trigger.setAttribute('aria-expanded', String(open))
      panel.hidden = !open
    }

    trigger.addEventListener('click', () => {
      setOpen(trigger.getAttribute('aria-expanded') !== 'true')
    })

    node.addEventListener('keydown', (event) => {
      if (event.key !== 'Escape' || trigger.getAttribute('aria-expanded') !== 'true') return
      setOpen(false)
      trigger.focus()
    })
  }
}
