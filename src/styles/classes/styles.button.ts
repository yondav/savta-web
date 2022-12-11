import tw, { css } from 'twin.macro';

import type { ButtonProps } from 'types';

export const button = ({ variant, size }: ButtonProps) => [
  tw`rounded-lg p-2.5 font-semibold text-neutral-100 hover:-translate-y-0.5 focus-visible:outline-none transition-transform duration-200`,
  css`
    &:disabled {
      pointer-events: none;
      ${tw`saturate-0`}
    }
  `,
  variant === 'primary' && tw`bg-gradient-to-b from-medium-orange to-accent-orange`,
  variant === 'secondary' && tw`bg-gradient-to-b from-medium-blue to-accent-blue`,
  variant === 'success' && tw`bg-gradient-to-b from-bright-green to-medium-green`,
  variant === 'danger' && tw`bg-gradient-to-b from-medium-red to-accent-red`,

  size === 'lg' && tw`text-lg`,
  size === 'md' && tw`text-base`,
  size === 'sm' && tw`text-sm`,
];
