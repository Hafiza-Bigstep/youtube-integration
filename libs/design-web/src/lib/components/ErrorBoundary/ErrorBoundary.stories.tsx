import type { Meta, StoryObj } from '@storybook/react';
import { ErrorBoundary } from './ErrorBoundary';

const meta: Meta<typeof ErrorBoundary> = {
  component: ErrorBoundary,
  title: 'ErrorBoundary',
};
export default meta;
type Story = StoryObj<typeof ErrorBoundary>;

export const Primary = {
  args: {},
};
