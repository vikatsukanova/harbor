import { mount } from '../../lib/html.js'
import { articleHtml, initArticle } from './article.js'

export default {
  title: 'Patterns/Article',
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'A content page on Foundation’s XY grid: full width, then eight and four columns from the large breakpoint. This is the page you screenshot when a token changes.',
      },
    },
  },
}

export const Default = {
  render: () => mount(articleHtml(), initArticle),
}
