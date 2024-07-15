import type { Meta, StoryObj } from '@storybook/react';
import { ToggleSwitch } from './Toggle';

const meta: Meta<typeof ToggleSwitch> = {
  component: ToggleSwitch,
  title: 'ToggleSwitch',
};
export default meta;
type Story = StoryObj<typeof ToggleSwitch>;

export const Primary = {
  args: {},
};
