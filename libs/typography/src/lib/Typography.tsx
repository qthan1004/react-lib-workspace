import { forwardRef } from 'react';
import type { ElementType } from 'react';

import { useTheme } from '@emotion/react';

import type { ThemeSchema } from '@thanhdq/theme';

import type { TypographyProps } from './models';

import {
  HEADING_LEVEL_MAP,
  HEADING_VARIANTS,
  VARIANT_TAG_MAP,
} from './constants';

import { resolveColor } from './helpers';

import { TypographyStyled } from './styled';

export const Typography = forwardRef<HTMLElement, TypographyProps>(
  (
    {
      variant = 'body',
      component,
      color,
      align,
      weight,
      gutterBottom = false,
      noWrap = false,
      children,
      ...rest
    },
    ref,
  ) => {
    const theme = useTheme() as ThemeSchema;

    // Resolve tag
    const tag = component ?? VARIANT_TAG_MAP[variant];

    // Resolve color from theme palette
    const resolvedColor = resolveColor(color, theme);

    // WCAG 2.2 SC 1.3.1: aria-level when heading variant uses non-heading tag
    const isHeadingVariant = HEADING_VARIANTS.has(variant);
    const tagIsHeading = typeof tag === 'string' && tag.match(/^h[1-6]$/);
    const ariaProps: Record<string, unknown> = {};
    if (isHeadingVariant && !tagIsHeading) {
      ariaProps['role'] = 'heading';
      ariaProps['aria-level'] = HEADING_LEVEL_MAP[variant];
    }

    return (
      <TypographyStyled
        as={tag as ElementType}
        ref={ref}
        ownerVariant={variant}
        ownerColor={resolvedColor}
        ownerAlign={align}
        ownerFontWeight={weight}
        ownerGutterBottom={gutterBottom}
        ownerNoWrap={noWrap}
        {...ariaProps}
        {...rest}
      >
        {children}
      </TypographyStyled>
    );
  },
);

Typography.displayName = 'Typography';
export default Typography;
