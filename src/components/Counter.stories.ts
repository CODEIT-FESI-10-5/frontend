import type { Meta, StoryObj } from '@storybook/react'
import Counter from './Counter'

const meta: Meta<typeof Counter> = {
  title: 'Example/Counter',
  component: Counter,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
