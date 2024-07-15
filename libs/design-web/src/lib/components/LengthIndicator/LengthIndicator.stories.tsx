import type { Meta, StoryObj } from '@storybook/react';
import { LengthIndicator } from './LengthIndicator';

const meta: Meta<typeof LengthIndicator> = {
  component: LengthIndicator,
  title: 'LengthIndicator',
};
export default meta;
type Story = StoryObj<typeof LengthIndicator>;

export const Primary = {
  args: {},
};
