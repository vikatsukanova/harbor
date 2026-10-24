import { buttonHtml } from '../../components/button/button.js'
import { cardHtml } from '../../components/card/card.js'
import { disclosureHtml, initDisclosure } from '../../components/disclosure/disclosure.js'
import { fieldHtml } from '../../components/field/field.js'
import { sectionHeaderHtml } from '../../components/section-header/section-header.js'
import { initSiteHeader, siteHeaderHtml } from '../../components/site-header/site-header.js'

export function articleHtml() {
  return `<div class="article-page">
    <a class="skip-link" href="#main">Skip to content</a>
    ${siteHeaderHtml()}
    <main class="article-page__main" id="main">
      <div class="grid-container">
        <div class="grid-x grid-margin-x">
          <article class="cell large-8">
            <div class="stack">
              ${sectionHeaderHtml({
                eyebrow: 'Journal',
                title: 'Notes from a working shoreline',
                lede: 'Essays on weather, archives, and the signs people actually read.',
              })}
              <div class="prose">
                <p>The archive keeps two copies of every notice: the one that was posted, and the one the designer wanted. They rarely match. Harbor is the set of pieces that makes the posted version the same as the file.</p>
                <p>Type stays at 17px on the page and on the pier board. The copper is reserved for links and eyebrows, so a reader can see what moves.</p>
              </div>
              ${disclosureHtml({
                id: 'article-sources',
                title: 'Sources',
                body: 'Harbour master logs, 1978 to 1986, and the municipal type specification for the pier signs.',
              })}
            </div>
          </article>
          <aside class="cell large-4">
            <div class="aside-stack">
              ${cardHtml({
                meta: 'Field notes',
                title: 'The pier at last light',
                href: '/journal/the-pier-at-last-light',
                body: 'What the tide does to the type on the warning signs.',
              })}
              ${cardHtml({
                meta: 'Archive',
                title: 'Margins you can write in',
                href: '/journal/a-margin-wide-enough',
                body: 'Why the measure stops at 66 characters, even when the grid has room.',
              })}
              <form class="newsletter" aria-labelledby="letter-title">
                <h2 id="letter-title">The monthly letter</h2>
                ${fieldHtml({
                  id: 'letter-email',
                  label: 'Email',
                  hint: 'One letter a month.',
                  placeholder: 'you@example.com',
                  type: 'email',
                })}
                ${buttonHtml({ label: 'Subscribe', type: 'submit' })}
              </form>
            </div>
          </aside>
        </div>
      </div>
    </main>
  </div>`
}

export function initArticle(root) {
  initSiteHeader(root)
  initDisclosure(root)
  root.querySelector('.newsletter')?.addEventListener('submit', (event) => event.preventDefault())
}
