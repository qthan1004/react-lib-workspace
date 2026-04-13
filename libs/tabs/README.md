# @thanh-libs/tabs

An accessible, highly customizable, and theme-aware Tab component suite.

## Installation

```sh
npm install @thanh-libs/tabs
# or
yarn add @thanh-libs/tabs
```

## API Reference

### Tabs
| Prop | Type | Default | Description |
|---|---|---|---|
| `value` | `string \| number` | - | Controlled selected tab |
| `defaultValue` | `string \| number` | - | Uncontrolled selected tab |
| `onChange` | `(value: string \| number) => void` | - | Callback fired on tab change |
| `orientation` | `'horizontal' \| 'vertical'` | `'horizontal'` | Component alignment |
| `variant` | `'standard' \| 'scrollable' \| 'fullWidth'` | `'standard'` | Layout of Tab spacing |

### Tab
| Prop | Type | Default | Description |
|---|---|---|---|
| `value` | `string \| number` | - | Identifies this tab |
| `label` | `ReactNode` | - | Display text |
| `icon` | `ReactNode` | - | Icon |
| `disabled` | `boolean` | `false` | Disables interaction |

### TabPanel
| Prop | Type | Default | Description |
|---|---|---|---|
| `value` | `string \| number` | - | Corresponds to Tab value |

## Usage
```tsx
import { Tabs, Tab, TabPanel } from '@thanh-libs/tabs';

export const Example = () => (
  <>
    <Tabs defaultValue="1">
      <Tab value="1" label="One" />
      <Tab value="2" label="Two" />
    </Tabs>
    <TabPanel value="1">One</TabPanel>
    <TabPanel value="2">Two</TabPanel>
  </>
);
```
