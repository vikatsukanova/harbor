import { escapeHtml } from '../../lib/html.js'

export function fieldHtml({
  id,
  label,
  hint = '',
  error = '',
  value = '',
  type = 'text',
  placeholder = '',
}) {
  const describedBy = [hint ? `${id}-hint` : '', error ? `${id}-error` : ''].filter(Boolean).join(' ')
  const describedAttr = describedBy ? ` aria-describedby="${describedBy}"` : ''
  const invalidAttr = error ? ' aria-invalid="true"' : ''
  const hintHtml = hint ? `<p class="field__hint" id="${id}-hint">${escapeHtml(hint)}</p>` : ''
  const errorHtml = error ? `<p class="field__error" id="${id}-error" role="alert">${escapeHtml(error)}</p>` : ''

  return `<div class="field${error ? ' field--error' : ''}">
    <label class="field__label" for="${escapeHtml(id)}">${escapeHtml(label)}</label>
    <input class="field__input" id="${escapeHtml(id)}" type="${escapeHtml(type)}" value="${escapeHtml(value)}" placeholder="${escapeHtml(placeholder)}"${describedAttr}${invalidAttr}>
    ${hintHtml}
    ${errorHtml}
  </div>`
}
