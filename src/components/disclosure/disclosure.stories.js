import { mount } from '../../lib/html.js'
import { disclosureHtml, initDisclosure } from './disclosure.js'

const content = {
  id: 'sources',
  title: 'Sources',
  body: 'Harbour master logs, 1978 to 1986, and the municipal type specification for the pier signs.',
}

export default {
  title: 'Components/Disclosure',
  parameters: {
    docs: {
      description: {
        component:
          'Replaces Foundation’s accordion where the control should be a button. Escape closes it and returns focus to the trigger.',
      },
    },
  },
}

export const Closed = {
  render: () => mount(disclosureHtml(content), initDisclosure),
}

export const Open = {
  render: () => mount(disclosureHtml({ ...content, id: 'sources-open', open: true }), initDisclosure),
}
