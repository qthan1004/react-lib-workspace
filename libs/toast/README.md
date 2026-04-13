# @thanh-libs/toast

A simple, accessible, and theme-aware Toast notification system.

## Installation

```sh
npm install @thanh-libs/toast
# or
yarn add @thanh-libs/toast
```

## Features
- Context-based `ToastProvider` and `useToast` hook.
- Support for `placement` (top-right, top-left, bottom-right, bottom-left, top-center, bottom-center).
- Variant statuses (success, error, warning, info).
- Auto-dismiss with configurable duration.
- Fully simulated ARIA compliance (role="alert").
- Animations for slide-in built with styled components.

## API Reference

### ToastProvider
| Prop | Type | Default | Description |
|---|---|---|---|
| `placement` | `ToastPlacement` | `'bottom-center'` | Display position of notifications |
| `duration` | `number` | `4000` | Default timeout duration in milliseconds |

### useToast
Returns an object with:
- `addToast(message: ReactNode, options?: { variant?: ToastVariant; duration?: number }): string`
- `removeToast(id: string): void`

## Usage
```tsx
import { ToastProvider, useToast } from '@thanh-libs/toast';

const Consumer = () => {
  const { addToast } = useToast();
  return <button onClick={() => addToast('Saved!', { variant: 'success' })}>Save</button>;
};

export const Example = () => (
  <ToastProvider placement="top-right">
    <Consumer />
  </ToastProvider>
);
```
