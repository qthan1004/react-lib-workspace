import { ForwardedRef, forwardRef } from 'react';
import { IconStyled } from './styled';
import { IconProps } from './model';

const Icon = (
  { name, className, children, size, color, ...restProps }: IconProps,
  ref: ForwardedRef<HTMLSpanElement>
) => (
  <IconStyled
    ref={ref}
    color={color}
    size={size}
    className={`icon-${name} ${className}`}
    {...restProps}
  >
    {children}
  </IconStyled>
);

export default forwardRef(Icon);
