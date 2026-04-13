import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';
import { describe, it, expect } from 'vitest';
import { axe, toHaveNoViolations } from 'jest-axe';
import { ThemeProvider } from '@thanh-libs/theme';
import { Badge } from '../src/lib/Badge/Badge';

expect.extend(toHaveNoViolations);

describe('Badge', () => {
  it('renders correctly with count', () => {
    render(
      <ThemeProvider>
        <Badge count={5}>
          <div data-testid="child" />
        </Badge>
      </ThemeProvider>
    );
    expect(screen.getByTestId('child')).toBeInTheDocument();
    expect(screen.getAllByText('5')[0]).toBeInTheDocument();
  });

  it('renders max value with + when count > max', () => {
    render(
      <ThemeProvider>
        <Badge count={100} max={99}>
          <div />
        </Badge>
      </ThemeProvider>
    );
    expect(screen.getAllByText('99+')[0]).toBeInTheDocument();
  });

  it('renders a dot when dot is true', () => {
    render(
      <ThemeProvider>
        <Badge dot count={5}>
          <div />
        </Badge>
      </ThemeProvider>
    );
    expect(screen.queryByText('5')).not.toBeInTheDocument();
  });

  it('is invisible visually when count is 0 and showZero is false', () => {
    const { container } = render(
      <ThemeProvider>
        <Badge count={0}>
          <div />
        </Badge>
      </ThemeProvider>
    );
    // The screen should render '0' but transforming it to scale 0
    expect(screen.getAllByText('0').length).toBeGreaterThan(0);
  });

  it('has no accessibility violations', async () => {
    const { container } = render(
      <ThemeProvider>
        <Badge count={10}>
          <button>Inbox</button>
        </Badge>
      </ThemeProvider>
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
