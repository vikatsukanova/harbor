import { mount } from '../../lib/html.js'
import { buttonHtml } from './button.js'

export default {
  title: 'Components/Button',
  render: (args) => mount(buttonHtml(args)),
  args: {
    label: 'Save changes',
    variant: 'primary',
    disabled: false,
  },
  argTypes: {
    variant: { control: 'select', options: ['primary', 'secondary', 'ghost'] },
    label: { control: 'text' },
    disabled: { control: 'boolean' },
  },
  parameters: {
    docs: {
      description: {
        component:
          'Actions on content pages. Primary is the one accent fill. Every variant keeps a 2.75rem target and a 2px offset focus ring.',
      },
    },
  },
}

export const Primary = {}

export const Secondary = {
  args: { variant: 'secondary', label: 'Cancel' },
}

export const Ghost = {
  args: { variant: 'ghost', label: 'Back to journal' },
}

export const Disabled = {
  args: { disabled: true },
}
