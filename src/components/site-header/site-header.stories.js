import { mount } from '../../lib/html.js'
import { initSiteHeader, siteHeaderHtml } from './site-header.js'

export default {
  title: 'Components/Site header',
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'The Menu button uses Foundation’s hide-for-large class. Below the large breakpoint the nav is closed until the button opens it. Escape closes it.',
      },
    },
  },
}

export const Default = {
  render: () => mount(siteHeaderHtml(), initSiteHeader),
}
