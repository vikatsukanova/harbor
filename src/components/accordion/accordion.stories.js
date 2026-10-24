import { mount } from '../../lib/html.js'
import { accordionHtml, initAccordion } from './accordion.js'

export default {
  title: 'Components/Accordion',
  parameters: {
    docs: {
      description: {
        component:
          'Foundation’s accordion, restyled with Harbor tokens. The trigger is an anchor because that is what Foundation ships. New work uses Disclosure, which is a button.',
      },
    },
  },
}

export const Legacy = {
  render: () => mount(accordionHtml()),
  play: async ({ canvasElement }) => {
    initAccordion(canvasElement)
  },
}
