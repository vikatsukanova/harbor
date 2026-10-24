import { mount } from '../../lib/html.js'
import { sectionHeaderHtml } from './section-header.js'

export default { title: 'Components/Section header' }

export const Default = {
  render: () =>
    mount(
      sectionHeaderHtml({
        eyebrow: 'Journal',
        title: 'Notes from a working shoreline',
        lede: 'Essays on weather, archives, and the signs people actually read.',
      }),
    ),
}
