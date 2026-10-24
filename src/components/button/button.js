import { escapeHtml } from '../../lib/html.js'

export function buttonHtml({ variant = 'primary', label, disabled = false, type = 'button' }) {
  const classes = variant === 'primary' ? 'btn' : `btn btn--${variant}`
  const disabledAttr = disabled ? ' disabled' : ''
  return `<button class="${classes}" type="${escapeHtml(type)}"${disabledAttr}>${escapeHtml(label)}</button>`
}
