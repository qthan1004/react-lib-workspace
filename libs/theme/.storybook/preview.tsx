import { Preview } from '@storybook/react-vite';
import { ThemeProvider } from '../src';

const preview: Preview = {
  parameters: {
    backgrounds: {
      disable: true,
    },
  },
  decorators: [
    (Story) => (
      <ThemeProvider>
        <Story />
      </ThemeProvider>
    ),
  ],
};

export default preview;
