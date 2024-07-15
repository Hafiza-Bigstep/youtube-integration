import type { Meta, StoryObj } from '@storybook/react';
import { InputWrapper } from './InputWrapper';

const meta: Meta<typeof InputWrapper> = {
  component: InputWrapper,
  title: 'InputWrapper',
};
export default meta;
type Story = StoryObj<typeof InputWrapper>;

export const Primary = {
  args: {},
};
