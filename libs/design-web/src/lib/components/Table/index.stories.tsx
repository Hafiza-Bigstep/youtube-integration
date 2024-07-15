import type { Meta, StoryObj } from '@storybook/react';
import { Table } from './index';

const meta: Meta<typeof Table> = {
  component: Table,
  title: 'Table',
};
export default meta;
type Story = StoryObj<typeof Table>;

export const Primary = {
  args: {},
};
