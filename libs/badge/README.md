# @thanh-libs/badge

Badge component used to highlight a number or status.

## Installation

```sh
npm install @thanh-libs/badge
# or
yarn add @thanh-libs/badge
```

## API Reference

| Prop | Type | Default | Description |
|---|---|---|---|
| `count` | `number \| ReactNode` | - | Number or content to display in the badge |
| `max` | `number` | `99` | Capped max value if count is numeric |
| `dot` | `boolean` | `false` | Shows a small dot instead of count |
| `color` | `BadgeColor` | `'primary'` | Semantic color variant |
| `showZero` | `boolean` | `false` | Shows the badge when count is zero |
| `placement` | `BadgePlacement` | `'top-right'` | Placement relative to children |
| `offset` | `[number, number]` | - | Offset from default position [x,y] |

## Usage

```tsx
import { Badge } from '@thanh-libs/badge';

export const Example = () => (
  <Badge count={5} color="error" placement="top-right">
    <div className="icon" />
  </Badge>
);
```

## Running tests

Run `yarn test` or `npx vitest` to execute unit tests.
