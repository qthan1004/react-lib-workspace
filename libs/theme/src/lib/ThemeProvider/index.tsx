import { ReactNode } from 'react';
import { ThemeProvider as ThemeProviderEmotion } from '@emotion/react';
import ThemeSchema from '../models';
import THEME_DEFAULT from '../constants/theme';
import GlobalStyles from '../GlobalStyles';

interface ThemeProviderProps {
  children?: ReactNode;
  theme?: ThemeSchema;
}

export const ThemeProvider = ({ children, theme }: ThemeProviderProps) => (
  <ThemeProviderEmotion
    theme={{
      ...THEME_DEFAULT,
      ...theme,
    }}
  >
    <GlobalStyles />
    {children}
  </ThemeProviderEmotion>
);

export default ThemeProvider;
