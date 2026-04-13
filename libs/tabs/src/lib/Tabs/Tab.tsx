import React, { forwardRef } from 'react';
import type { TabProps } from '../models';
import { useTabsContext } from './Tabs';
import { TabRootStyled } from './styled';

export const Tab = forwardRef<HTMLButtonElement, TabProps>(
  (
    {
      value,
      label,
      icon,
      disabled = false,
      onClick,
      id: idProp,
      'aria-controls': ariaControls,
      ...rest
    },
    ref
  ) => {
    const context = useTabsContext();
    const { value: selectedValue, onChange, orientation, variant } = context;

    const selected = selectedValue === value;

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      if (disabled) {
        e.preventDefault();
        return;
      }
      if (onClick) onClick(e);
      onChange(value);
    };

    const tabId = idProp || `tab-${value}`;
    const panelId = ariaControls || `tabpanel-${value}`;

    return (
      <TabRootStyled
        ref={ref}
        role="tab"
        ownerSelected={selected}
        ownerDisabled={disabled}
        ownerOrientation={orientation}
        ownerVariant={variant}
        aria-selected={selected}
        aria-disabled={disabled}
        aria-controls={panelId}
        id={tabId}
        tabIndex={selected ? 0 : -1}
        onClick={handleClick}
        disabled={disabled}
        {...rest}
      >
        {icon}
        {label}
      </TabRootStyled>
    );
  }
);

Tab.displayName = 'Tab';
