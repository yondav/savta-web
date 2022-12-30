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
        return tw`text-red-400`;
      case 'success':
        return tw`text-green-400`;
      case 'link':
        return tw`text-blue-400 hover:text-blue-200 transition-colors`;
      default:
        return tw`text-current`;
    }
  },

  typography: (props: TypographyProps) => [
    typography.weight(props.weight),
    typography.color(props.color),
  ],
};
