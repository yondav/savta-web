import React from 'react';
import { CgImage } from 'react-icons/cg';
import { styled } from 'twin.macro';

import { classes } from 'styles';

import type { ImgProps } from 'types';

const { img } = classes;

const Image = styled(({ ...props }: ImgProps) => (
  // we need square and circle to be passed here to satisfy the render without throwing an error for passing a boolean value to a dom element attribute unexpectedly
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  <div {...(({ variant, ...rest }) => rest)(props)}>
    <CgImage
      tw='text-blue-400 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'
      size='33%'
    />
    {props.src && <img alt={props.alt} {...props} />}
  </div>
))<ImgProps>`
  ${img()}
  ${({ variant }) => img({ variant })}
`;

export default Image;
