import { cardHtml } from './card.js'
import { mount } from '../../lib/html.js'

export default {
  title: 'Components/Card',
  parameters: {
    docs: {
      description: {
        component: 'One link, in the title. The card is not itself a link, so a page can add a second action later without nested links.',
      },
    },
  },
}

export const Default = {
  render: () =>
    mount(
      cardHtml({
        meta: 'Field notes',
        title: 'The pier at last light',
        href: '/journal/the-pier-at-last-light',
        body: 'A short walk from the archive to the water, and what the tide does to the type on the warning signs.',
      }),
    ),
}
