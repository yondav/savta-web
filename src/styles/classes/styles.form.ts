import tw from 'twin.macro';

import type { CellSpanValue, Gap } from 'types';

import { container } from './styles.container';

export const form = {
  base: ({ grid }: { grid?: { cols: CellSpanValue; gap: Gap } }) => [
    tw`mt-5 md:mt-0`,
    container.base,
    grid && container.grid.container({ cols: grid.cols, gap: grid.gap }),
  ],

  group: tw`flex flex-col justify-start gap-2 p-2.5`,

  input: ({ error }: { error?: string }) => [
    tw`px-3.5 py-2.5 text-sm font-medium rounded-lg bg-neutral-100 focus-visible:(bg-neutral-300 outline-none) transition-colors duration-200`,

    error && tw`border border-red-400 bg-red-100 focus-visible:bg-red-100`,
  ],

  label: tw`text-sm font-semibold uppercase`,
};
