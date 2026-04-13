import type { HTMLAttributes, ReactNode } from 'react';

export interface TabsProps extends Omit<HTMLAttributes<HTMLDivElement>, 'onChange'> {
  /** The value of the currently selected Tab. */
  value?: string | number;
  /** Default value for uncontrolled usage. */
  defaultValue?: string | number;
  /** Callback fired when the value changes. */
  onChange?: (value: string | number) => void;
  /** The component orientation */
  orientation?: 'horizontal' | 'vertical';
  /** The variant to use */
  variant?: 'standard' | 'scrollable' | 'fullWidth';
  children?: ReactNode;
}

export interface TabProps extends HTMLAttributes<HTMLButtonElement> {
  /** The value identifying this tab. */
  value: string | number;
  /** Display label for the tab. */
  label?: ReactNode;
  /** Icon element. */
  icon?: ReactNode;
  /** If true, the tab will be disabled. */
  disabled?: boolean;
}


