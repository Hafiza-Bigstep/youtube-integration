import type { Meta, StoryObj } from '@storybook/react';
import { Alert } from './Alert';

const meta: Meta<typeof Alert> = {
  component: Alert,
  title: 'Alert',
};
export default meta;
type Story = StoryObj<typeof Alert>;

export const Primary = {
  args: {},
};
