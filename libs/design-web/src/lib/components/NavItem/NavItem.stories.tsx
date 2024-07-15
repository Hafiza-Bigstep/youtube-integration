import type { Meta, StoryObj } from '@storybook/react';
import { NavItem } from './NavItem';

const meta: Meta<typeof NavItem> = {
  component: NavItem,
  title: 'NavItem',
};
export default meta;
type Story = StoryObj<typeof NavItem>;

export const Primary = {
  args: {},
};
