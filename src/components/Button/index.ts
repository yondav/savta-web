import { styled } from 'twin.macro';

import { classes } from 'styles';

import type { ButtonProps } from 'types/types.props';

const { button } = classes;

const Button = styled.button<ButtonProps>(({ variant = 'primary', size = 'md' }) =>
  button({ variant, size })
);

export default Button;
