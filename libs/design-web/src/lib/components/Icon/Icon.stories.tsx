import type { Meta, StoryObj } from '@storybook/react';
import { IconComponent } from './Icon';

const meta: Meta<typeof IconComponent> = {
  component: IconComponent,
  title: 'IconComponent',
};
export default meta;
type Story = StoryObj<typeof IconComponent>;

export const Primary = {
  args: {},
};
