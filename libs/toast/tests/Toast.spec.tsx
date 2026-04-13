import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom/vitest';
import { describe, it, expect, vi } from 'vitest';
import { axe, toHaveNoViolations } from 'jest-axe';
import { ThemeProvider } from '@thanh-libs/theme';
import { ToastProvider, useToast } from '../src';
import React from 'react';

expect.extend(toHaveNoViolations);

const TestComponent = () => {
  const { addToast } = useToast();
  return (
    <button onClick={() => addToast('Success message!', { variant: 'success', duration: 100 })}>
      Show Toast
    </button>
  );
};

describe('Toast', () => {
  it('renders correctly on trigger', async () => {
    const user = userEvent.setup();
    render(
      <ThemeProvider>
        <ToastProvider>
          <TestComponent />
        </ToastProvider>
      </ThemeProvider>
    );

    expect(screen.queryByText('Success message!')).not.toBeInTheDocument();

    await user.click(screen.getByText('Show Toast'));

    expect(screen.getByText('Success message!')).toBeVisible();
    expect(screen.getByRole('alert')).toBeInTheDocument();
  });

  it('auto removes after duration', async () => {
    const user = userEvent.setup();
    render(
      <ThemeProvider>
        <ToastProvider>
          <TestComponent />
        </ToastProvider>
      </ThemeProvider>
    );

    await user.click(screen.getByText('Show Toast'));
    expect(screen.getByText('Success message!')).toBeVisible();

    await waitFor(() => {
      expect(screen.queryByText('Success message!')).not.toBeInTheDocument();
    });
  });

  it('can be manually dismissed', async () => {
    const user = userEvent.setup();
    const PermanentToastComponent = () => {
      const { addToast } = useToast();
      return (
        <button onClick={() => addToast('Close me', { duration: 0 })}>
          Show Toast
        </button>
      );
    };

    render(
      <ThemeProvider>
        <ToastProvider>
          <PermanentToastComponent />
        </ToastProvider>
      </ThemeProvider>
    );

    await user.click(screen.getByText('Show Toast'));
    expect(screen.getByText('Close me')).toBeVisible();

    const closeButton = screen.getByLabelText('Close');
    await user.click(closeButton);

    expect(screen.queryByText('Close me')).not.toBeInTheDocument();
  });

  it('has no accessibility violations', async () => {
    // Cannot easily test portals via standard axe since document.body needs to be provided.
    // Instead, we render without testing library wrapper root, directly testing base element to capture portals.
    const { baseElement } = render(
      <ThemeProvider>
        <ToastProvider>
          <TestComponent />
        </ToastProvider>
      </ThemeProvider>
    );
    
    await userEvent.click(screen.getByText('Show Toast'));
    const results = await axe(baseElement);
    expect(results).toHaveNoViolations();
  });
});
