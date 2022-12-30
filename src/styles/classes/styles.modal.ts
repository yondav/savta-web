import tw, { css } from 'twin.macro';

import type { ModalProps } from 'types';

export const modal = {
  container: ({ fitted }: { fitted?: ModalProps['fitted'] }) => [
    tw`fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 shadow-xl z-50 md:(max-w-[600px] max-h-[700px]) lg:(max-w-[990px]) w-full h-full`,
    fitted === 'height' && tw`h-[fit-content]`,
    fitted === 'width' && tw`w-[fit-content]`,
  ],

  wrapper: tw`px-10 py-7 border-0 rounded-xl shadow-lg relative flex flex-col w-full h-full bg-neutral-100 outline-none focus:outline-none overflow-y-hidden`,

  close: tw`absolute top-4 right-4 text-black transition-all duration-200 ease-linear cursor-pointer`,

  header: css`
    ${tw`border-b border-neutral-300 p-5`}
    flex-basis: 15%;

    &:first-child {
      margin-bottom: 10px;
    }
  `,

  body: css`
    margin-bottom: 10px;
    overflow-y: scroll;

    & > *:not(:last-child) {
      margin-bottom: 10px;
    }
  `,
};
