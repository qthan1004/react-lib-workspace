import { Preview } from '@storybook/react-vite';
import { ThemeProvider } from '@thanhdq/theme';

const preview: Preview = {
  decorators: [
    (Story) => (
      <ThemeProvider>
        <Story />
      </ThemeProvider>
    ),
  ],
};

export default preview;
