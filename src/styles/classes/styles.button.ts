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
  variant === 'primary' && tw`bg-orange-400`,
  variant === 'secondary' && tw`bg-white border-black`,
  variant === 'success' && tw`bg-green-400`,
  variant === 'danger' && tw`bg-red-400`,

  size === 'lg' && tw`text-lg`,
  size === 'md' && tw`text-base`,
  size === 'sm' && tw`text-sm`,
];
