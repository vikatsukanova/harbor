import { mount } from '../../lib/html.js'
import { fieldHtml } from './field.js'

const base = {
  id: 'email',
  label: 'Email',
  hint: 'We send one letter a month. Nothing else.',
  placeholder: 'you@example.com',
  type: 'email',
}

export default {
  title: 'Components/Field',
  parameters: {
    docs: {
      description: {
        component:
          'The label is always visible. An error sets aria-invalid and moves into a role="alert" region announced by the hint id.',
      },
    },
  },
}

export const Default = {
  render: () => mount(fieldHtml(base)),
}

export const Error = {
  render: () =>
    mount(
      fieldHtml({
        ...base,
        id: 'email-error',
        value: 'not-an-email',
        error: 'Enter an email address, such as ada@harbor.test.',
      }),
    ),
}
