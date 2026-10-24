import { escapeHtml } from '../../lib/html.js'

const links = [
  { href: '/journal', label: 'Journal', current: true },
  { href: '/archive', label: 'Archive', current: false },
  { href: '/about', label: 'About', current: false },
]

export function siteHeaderHtml() {
  const items = links
    .map((link) => {
      const current = link.current ? ' aria-current="page"' : ''
      return `<li><a href="${link.href}"${current}>${escapeHtml(link.label)}</a></li>`
    })
    .join('')

  return `<header class="site-header">
    <div class="grid-container site-header__inner">
      <a class="site-header__mark" href="/">Harbor</a>
      <button class="site-header__toggle hide-for-large" type="button" aria-expanded="false" aria-controls="site-nav" data-nav-toggle>Menu</button>
      <nav class="site-header__nav" id="site-nav" aria-label="Primary" data-nav>
        <ul>${items}</ul>
      </nav>
    </div>
  </header>`
}

export function initSiteHeader(root) {
  const header = root.querySelector('.site-header') ?? root
  const toggle = header.querySelector('[data-nav-toggle]')
  const nav = header.querySelector('[data-nav]')
  if (!toggle || !nav) return

  const setOpen = (open) => {
    toggle.setAttribute('aria-expanded', String(open))
    toggle.textContent = open ? 'Close' : 'Menu'
    nav.classList.toggle('is-open', open)
  }

  toggle.addEventListener('click', () => {
    setOpen(toggle.getAttribute('aria-expanded') !== 'true')
  })

  header.addEventListener('keydown', (event) => {
    if (event.key !== 'Escape' || toggle.getAttribute('aria-expanded') !== 'true') return
    setOpen(false)
    toggle.focus()
  })
}
