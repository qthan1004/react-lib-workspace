import { css, Global, useTheme } from "@emotion/react";

import { pxToRem } from '@thanhdq/utils';

import { ThemeSchema } from "../models";

export const GlobalStyles = () => {
  const theme: ThemeSchema = useTheme();
  const { palette, font } = theme;

  return (
    <Global
      styles={css`
        html {
          font-size: ${font?.htmlFontSize}px;
        }

        body {
          width: 100%;
          height: 100%;
          min-height: 100%;
          padding: 0;
          margin: 0;
          font-size: ${pxToRem(font?.fontSize as number)};
          font-weight: ${font?.fontWeight};
          line-height: ${font?.lineHeight};
          color: ${palette?.common?.black};
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
        }
        a {
          color: ${palette?.common?.black};
          text-decoration: none;
        }
        a:focus-visible {
          outline: none;
        }
        button {
          outline: none;
        }
        ::-webkit-scrollbar {
          width: ${pxToRem(20)};
        }

        ::-webkit-scrollbar-track {
          background-color: transparent;
        }

        ::-webkit-scrollbar-thumb {
          background-color: ${palette?.scrollBar?.main};
          border-radius: ${pxToRem(20)};
          border: 6px solid transparent;
          background-clip: content-box;
        }

        ::-webkit-scrollbar-thumb:hover {
          background-color: ${palette?.scrollBar?.dark};
        }
        :focus-visible: {
          outline: ${pxToRem(20)} solid ${palette?.primary?.borderLine};
        }
        ::-webkit-scrollbar-corner {
          background-color: transparent;
        }
      `}
    />
  );
};
export default GlobalStyles;
