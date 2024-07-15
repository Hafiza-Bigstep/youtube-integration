import type { Meta, StoryObj } from '@storybook/react';
import { NavLinks } from './NavLinks';

const meta: Meta<typeof NavLinks> = {
  component: NavLinks,
  title: 'NavLinks',
};
export default meta;
type Story = StoryObj<typeof NavLinks>;

export const Primary = {
  args: {},
};
