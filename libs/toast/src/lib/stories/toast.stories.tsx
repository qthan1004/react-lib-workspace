import React from 'react';
import type { Meta } from '@storybook/react';
import { ToastProvider, useToast } from '../ToastProvider/ToastProvider';
import { ThemeProvider } from '@thanh-libs/theme';

const meta: Meta = {
  title: 'Components/Toast',
  decorators: [
    (Story) => (
      <ThemeProvider>
        <Story />
      </ThemeProvider>
    ),
  ],
};

export default meta;

const ToastDemo = () => {
  const { addToast } = useToast();

  return (
    <div style={{ display: 'flex', gap: 8, padding: 40, flexWrap: 'wrap' }}>
      <button onClick={() => addToast('This is a success message!', { variant: 'success' })}>
        Success
      </button>
      <button onClick={() => addToast('This is an error message!', { variant: 'error' })}>
        Error
      </button>
      <button onClick={() => addToast('This is a warning message!', { variant: 'warning' })}>
        Warning
      </button>
      <button onClick={() => addToast('This is an info message!', { variant: 'info' })}>
        Info
      </button>
      <button onClick={() => addToast('This stays for 10 seconds.', { duration: 10000 })}>
        Long Duration
      </button>
    </div>
  );
};

export const Basic = () => (
  <ToastProvider>
    <ToastDemo />
  </ToastProvider>
);

export const TopRightPlacement = () => (
  <ToastProvider placement="top-right">
    <ToastDemo />
  </ToastProvider>
);
