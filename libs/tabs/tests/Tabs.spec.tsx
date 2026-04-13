import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom/vitest';
import { describe, it, expect } from 'vitest';
import { axe, toHaveNoViolations } from 'jest-axe';
import { ThemeProvider } from '@thanh-libs/theme';
import React from 'react';
import { Tabs, Tab, TabPanel } from '../src';

expect.extend(toHaveNoViolations);

describe('Tabs', () => {
  it('renders horizontally by default and panels work', async () => {
    const user = userEvent.setup();
    const TestComponent = () => {
      const [val, setVal] = React.useState('1');
      return (
        <ThemeProvider>
          <Tabs value={val} onChange={(v) => setVal(v as string)}>
            <Tab value="1" label="One" />
            <Tab value="2" label="Two" />
          </Tabs>
          <TabPanel value="1" selectedValue={val}>C1</TabPanel>
          <TabPanel value="2" selectedValue={val}>C2</TabPanel>
        </ThemeProvider>
      );
    };
    render(<TestComponent />);

    expect(screen.getByRole('tablist')).toHaveAttribute('aria-orientation', 'horizontal');
    expect(screen.getByText('C1')).toBeVisible();
    expect(screen.queryByText('C2')).not.toBeInTheDocument();

    await user.click(screen.getByText('Two'));
    
    expect(screen.getByText('C2')).toBeVisible();
    expect(screen.queryByText('C1')).not.toBeInTheDocument();
  });

  it('renders vertically', () => {
    render(
      <ThemeProvider>
        <Tabs defaultValue="1" orientation="vertical">
          <Tab value="1" label="One" />
        </Tabs>
      </ThemeProvider>
    );
    expect(screen.getByRole('tablist')).toHaveAttribute('aria-orientation', 'vertical');
  });

  it('respects disabled state', async () => {
    const user = userEvent.setup();
    const TestComponent = () => {
      const [val, setVal] = React.useState('1');
      return (
        <ThemeProvider>
          <Tabs value={val} onChange={(v) => setVal(v as string)}>
            <Tab value="1" label="One" />
            <Tab value="2" label="Two" disabled />
          </Tabs>
          <TabPanel value="1" selectedValue={val}>C1</TabPanel>
          <TabPanel value="2" selectedValue={val}>C2</TabPanel>
        </ThemeProvider>
      );
    };
    render(<TestComponent />);
    
    expect(screen.getByText('Two')).toHaveAttribute('aria-disabled', 'true');
    await user.click(screen.getByText('Two'));
    expect(screen.getByText('C1')).toBeVisible();
    expect(screen.queryByText('C2')).not.toBeInTheDocument();
  });

  it('has no accessibility violations', async () => {
    const TestComponent = () => {
      const [val, setVal] = React.useState('1');
      return (
        <ThemeProvider>
          <Tabs value={val} onChange={(v) => setVal(v as string)}>
            <Tab value="1" label="One" />
            <Tab value="2" label="Two" />
          </Tabs>
          <TabPanel value="1" selectedValue={val}>C1</TabPanel>
          <TabPanel value="2" selectedValue={val}>C2</TabPanel>
        </ThemeProvider>
      );
    };
    const { container } = render(<TestComponent />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
