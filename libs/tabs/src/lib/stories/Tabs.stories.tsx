import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Tabs } from '../Tabs/Tabs';
import { Tab } from '../Tabs/Tab';
import { TabPanel } from '../Tabs/TabPanel';
import { ThemeProvider } from '@thanh-libs/theme';

// ─── Basic ───────────────────────────────────────────────

const BasicStory = () => {
  const [val, setVal] = useState<string | number>('one');
  return (
    <>
      <Tabs value={val} onChange={setVal}>
        <Tab value="one" label="Item One" />
        <Tab value="two" label="Item Two" />
        <Tab value="three" label="Item Three" disabled />
      </Tabs>
      <TabPanel value="one" selectedValue={val}>First panel content</TabPanel>
      <TabPanel value="two" selectedValue={val}>Second panel content</TabPanel>
      <TabPanel value="three" selectedValue={val}>Third panel content (disabled, cannot be reached via click)</TabPanel>
    </>
  );
};

// ─── Vertical ────────────────────────────────────────────

const VerticalStory = () => {
  const [val, setVal] = useState<string | number>('1');
  return (
    <div style={{ display: 'flex' }}>
      <Tabs value={val} onChange={setVal} orientation="vertical">
        <Tab value="1" label="Tab 1" />
        <Tab value="2" label="Tab 2" />
        <Tab value="3" label="Tab 3" />
      </Tabs>
      <TabPanel value="1" selectedValue={val}>Information regarding Tab 1</TabPanel>
      <TabPanel value="2" selectedValue={val}>Information regarding Tab 2</TabPanel>
      <TabPanel value="3" selectedValue={val}>Information regarding Tab 3</TabPanel>
    </div>
  );
};

// ─── Scrollable ──────────────────────────────────────────

const ScrollableStory = () => {
  const [val, setVal] = useState<string | number>('1');
  return (
    <div style={{ width: 300 }}>
      <Tabs value={val} onChange={setVal} variant="scrollable">
        {Array.from({ length: 15 }).map((_, i) => (
          <Tab key={i} value={`${i}`} label={`Tab ${i}`} />
        ))}
      </Tabs>
      <TabPanel value="5" selectedValue={val}>Scroll to see 5th tab selected.</TabPanel>
    </div>
  );
};

// ─── Playground ──────────────────────────────────────────

const PlaygroundStory = (args: any) => {
  const [val, setVal] = useState<string | number>('1');
  return (
    <div style={{ display: args.orientation === 'vertical' ? 'flex' : 'block', width: args.variant === 'scrollable' ? 300 : '100%' }}>
      <Tabs value={val} onChange={setVal} orientation={args.orientation} variant={args.variant}>
        <Tab value="1" label="First Tab" />
        <Tab value="2" label="Second Tab" />
        <Tab value="3" label="Third Tab" disabled={args.disabledTab} />
      </Tabs>
      <TabPanel value="1" selectedValue={val}>Content for First Tab</TabPanel>
      <TabPanel value="2" selectedValue={val}>Content for Second Tab</TabPanel>
      <TabPanel value="3" selectedValue={val}>Content for Third Tab</TabPanel>
    </div>
  );
};

// ─── Meta & Exports ──────────────────────────────────────

const meta: Meta = {
  title: 'Tabs/Tabs',
  decorators: [
    (Story) => (
      <ThemeProvider>
        <div style={{ padding: 40 }}>
          <Story />
        </div>
      </ThemeProvider>
    ),
  ],
};

export default meta;

export const Basic: StoryObj = { name: 'Basic', render: () => <BasicStory /> };
export const Vertical: StoryObj = { name: 'Vertical', render: () => <VerticalStory /> };
export const Scrollable: StoryObj = { name: 'Scrollable', render: () => <ScrollableStory /> };

export const Playground: StoryObj = {
  name: 'Playground',
  argTypes: {
    orientation: { control: 'select', options: ['horizontal', 'vertical'] },
    variant: { control: 'select', options: ['standard', 'scrollable', 'fullWidth'] },
    disabledTab: { control: 'boolean' },
  },
  args: {
    orientation: 'horizontal',
    variant: 'standard',
    disabledTab: false,
  },
  render: (args: any) => <PlaygroundStory {...args} />,
};
