import tw, { css } from 'twin.macro';

import type { DimmerProps } from 'types';

export const dimmer = ({ active }: DimmerProps) => [
  tw`hidden fixed w-full h-full top-0 left-0 bg-[rgba(53,53,53,.6)] transition-all duration-100 ease-linear z-30`,
  active &&
    css`
      display: block !important;
      backdrop-filter: blur(4.5px) !important;
    `,
];
