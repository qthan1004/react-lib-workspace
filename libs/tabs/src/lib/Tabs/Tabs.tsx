import React, { createContext, useContext, useState, forwardRef, useCallback } from 'react';
import type { TabsProps } from '../models';
import { TabsRootStyled, TabsListStyled } from './styled';

interface TabsContextType {
  value: string | number | undefined;
  onChange: (value: string | number) => void;
  orientation: 'horizontal' | 'vertical';
  variant: 'standard' | 'scrollable' | 'fullWidth';
}

export const TabsContext = createContext<TabsContextType | undefined>(undefined);

export const useTabsContext = () => {
  const context = useContext(TabsContext);
  if (!context) {
    throw new Error('Tab components must be used within a Tabs component');
  }
  return context;
};

export const Tabs = forwardRef<HTMLDivElement, TabsProps>(
  (
    {
      value: valueProp,
      defaultValue,
      onChange,
      orientation = 'horizontal',
      variant = 'standard',
      children,
      className,
      ...rest
    },
    ref
  ) => {
    const isControlled = valueProp !== undefined;
    const [internalValue, setInternalValue] = useState<string | number | undefined>(defaultValue);

    const currentValue = isControlled ? valueProp : internalValue;

    const handleChange = useCallback(
      (newValue: string | number) => {
        if (!isControlled) {
          setInternalValue(newValue);
        }
        onChange?.(newValue);
      },
      [isControlled, onChange]
    );

    return (
      <TabsContext.Provider
        value={{
          value: currentValue,
          onChange: handleChange,
          orientation,
          variant,
        }}
      >
        <TabsRootStyled
          ref={ref}
          ownerOrientation={orientation}
          className={className}
          {...rest}
        >
          <TabsListStyled
            role="tablist"
            aria-orientation={orientation}
            ownerOrientation={orientation}
            ownerVariant={variant}
          >
            {children}
          </TabsListStyled>
        </TabsRootStyled>
      </TabsContext.Provider>
    );
  }
);

Tabs.displayName = 'Tabs';
