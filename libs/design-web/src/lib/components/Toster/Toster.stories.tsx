import type { Meta, StoryObj } from '@storybook/react';
import { Toaster } from './Toster';

const meta: Meta<typeof Toaster> = {
  component: Toaster,
  title: 'Toaster',
};
export default meta;
type Story = StoryObj<typeof Toaster>;

export const Primary = {
  args: {},
};
