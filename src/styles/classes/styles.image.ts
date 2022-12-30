import tw, { css } from 'twin.macro';

import type { ImgProps } from 'types';

export const img = (props?: ImgProps) => [
  tw`bg-purple-200 relative overflow-hidden w-full transition-all duration-300 ease-in rounded-xl`,

  props?.variant === ('square' || 'circle') &&
    css`
      ${tw`before:block`}
      &:before {
        content: '';
        padding-top: 100%;
      }
      & img {
        ${tw`w-full absolute top-1/2 left-1/2 -translate-y-1/2	-translate-x-1/2`}
      }
    `,

  props?.variant === 'circle' && tw`rounded-full`,
];
