import React from 'react';
import { styled } from 'twin.macro';

import { classes } from 'styles';

import type { ImgProps } from 'types';

const { img } = classes;

const Image = styled(({ ...props }: ImgProps) => (
  // we need square and circle to be passed here to satisfy the render without throwing an error for passing a boolean value to a dom element attribute unexpectedly
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  <div {...(({ variant, ...rest }) => rest)(props)}>
    <img alt={props.alt} {...props} />
  </div>
))<ImgProps>`
  ${img()}
  ${({ variant }) => img({ variant })}
`;

export default Image;
