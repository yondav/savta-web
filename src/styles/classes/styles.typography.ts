import tw from 'twin.macro';

import type { TypographyProps } from 'types';

export const typography = {
  weight: (props: TypographyProps['weight']) => {
    switch (props) {
      case 'heavy':
        return tw`font-bold`;
      case 'semi':
        return tw`font-semibold`;
      case 'auto':
        return tw`font-medium`;
      default:
        return tw`font-medium`;
    }
  },

  color: (props: TypographyProps['color']) => {
    switch (props) {
      case 'current':
        return tw`text-current`;
      case 'secondary':
        return tw`text-neutral-700`;
      case 'white':
        return tw`text-neutral-50`;
      case 'black':
        return tw`text-neutral-900`;
      case 'danger':
        return tw`text-medium-red`;
      case 'success':
        return tw`text-medium-green`;
      case 'link':
        return tw`text-accent-blue hover:text-bright-pink transition-colors`;
      default:
        return tw`text-current`;
    }
  },

  typography: (props: TypographyProps) => [
    typography.weight(props.weight),
    typography.color(props.color),
  ],
};
