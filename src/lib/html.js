export function escapeHtml(value) {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
}

export function mount(html, init) {
  const root = document.createElement('div')
  root.innerHTML = html
  init?.(root)
  return root
}
