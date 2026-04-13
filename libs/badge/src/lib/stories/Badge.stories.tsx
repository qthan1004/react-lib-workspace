import type { Meta, StoryObj } from '@storybook/react';
import { Badge } from '../Badge/Badge';
import { ThemeProvider } from '@thanh-libs/theme';

// ─── Helpers ──────────────────────────────────────────

const Box = () => (
  <div style={{ width: 40, height: 40, backgroundColor: '#e0e0e0', borderRadius: 4 }} />
);

// ─── Basic ───────────────────────────────────────────────

const BasicStory = () => (
  <Badge count={5}>
    <Box />
  </Badge>
);

// ─── Max Value ───────────────────────────────────────────

const MaxValueStory = () => (
  <Badge count={1000} max={99}>
    <Box />
  </Badge>
);

// ─── Dot ─────────────────────────────────────────────────

const DotStory = () => (
  <Badge dot>
    <Box />
  </Badge>
);

// ─── Colors ──────────────────────────────────────────────

const ColorsStory = () => (
  <div style={{ display: 'flex', gap: 24 }}>
    <Badge count={5} color="primary"><Box /></Badge>
    <Badge count={5} color="secondary"><Box /></Badge>
    <Badge count={5} color="error"><Box /></Badge>
    <Badge count={5} color="warning"><Box /></Badge>
    <Badge count={5} color="info"><Box /></Badge>
    <Badge count={5} color="success"><Box /></Badge>
  </div>
);

// ─── Placements ──────────────────────────────────────────

const PlacementsStory = () => (
  <div style={{ display: 'flex', gap: 40, padding: 20 }}>
    <Badge count={5} placement="top-left"><Box /></Badge>
    <Badge count={5} placement="top-right"><Box /></Badge>
    <Badge count={5} placement="bottom-left"><Box /></Badge>
    <Badge count={5} placement="bottom-right"><Box /></Badge>
  </div>
);

// ─── Playground ──────────────────────────────────────────

const PlaygroundStory = (args: any) => (
  <Badge {...args}>
    <Box />
  </Badge>
);

// ─── Meta & Exports ──────────────────────────────────────

const meta: Meta = {
  title: 'Badge/Badge',
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
export const MaxValue: StoryObj = { name: 'Max Value', render: () => <MaxValueStory /> };
export const Dot: StoryObj = { name: 'Dot', render: () => <DotStory /> };
export const Colors: StoryObj = { name: 'Colors', render: () => <ColorsStory /> };
export const Placements: StoryObj = { name: 'Placements', render: () => <PlacementsStory /> };

export const Playground: StoryObj = {
  name: 'Playground',
  argTypes: {
    color: { control: 'select', options: ['primary', 'secondary', 'error', 'warning', 'info', 'success'] },
    placement: { control: 'select', options: ['top-right', 'top-left', 'bottom-right', 'bottom-left'] },
    count: { control: 'number' },
    max: { control: 'number' },
    dot: { control: 'boolean' },
    invisible: { control: 'boolean' },
  },
  args: {
    color: 'primary',
    placement: 'top-right',
    count: 5,
    max: 99,
    dot: false,
    invisible: false,
  },
  render: (args: any) => <PlaygroundStory {...args} />,
};
