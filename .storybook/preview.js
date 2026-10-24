import '@fontsource/newsreader/400.css'
import '@fontsource/newsreader/400-italic.css'
import '@fontsource/newsreader/500.css'
import '@fontsource/public-sans/400.css'
import '@fontsource/public-sans/500.css'
import '@fontsource/public-sans/600.css'
import '../src/styles/global.scss'

/** @type {import('@storybook/html-vite').Preview} */
const preview = {
  parameters: {
    layout: 'padded',
    options: {
      storySort: {
        order: ['Foundations', 'Components', 'Patterns'],
      },
    },
    a11y: {
      // List violations in the Accessibility tab, including ones not fixed yet.
      // The story still renders. Playwright opens stories with the manual
      // global so this scan does not start a second axe run.
      test: 'todo',
    },
  },
}

export default preview
