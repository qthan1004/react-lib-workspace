import React, { createContext, useContext, forwardRef, HTMLAttributes, ReactNode } from 'react';
import { useTabsContext, TabsContext } from './Tabs';
import { TabPanelRootStyled } from './styled';

export interface TabPanelProps extends HTMLAttributes<HTMLDivElement> {
  /** The value of the corresponding Tab. */
  value: string | number;
  /** The currently selected value of the Tabs. If provided, TabPanel doesn't need to be inside Tabs context. */
  selectedValue?: string | number;
  children?: ReactNode;
}

export const TabPanel = forwardRef<HTMLDivElement, TabPanelProps>(
  ({ children, value, selectedValue: selectedValueProp, id: idProp, 'aria-labelledby': ariaLabelledby, ...rest }, ref) => {
    const context = useContext(TabsContext);
    
    const selectedValue = selectedValueProp !== undefined 
      ? selectedValueProp 
      : context?.value;

    const selected = selectedValue === value;

    if (!selected) {
      return null;
    }

    const panelId = idProp || `tabpanel-${value}`;
    const tabId = ariaLabelledby || `tab-${value}`;

    return (
      <TabPanelRootStyled
        ref={ref}
        role="tabpanel"
        id={panelId}
        aria-labelledby={tabId}
        {...rest}
      >
        {children}
      </TabPanelRootStyled>
    );
  }
);

TabPanel.displayName = 'TabPanel';
