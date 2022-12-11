import { styled } from 'twin.macro';

import { classes } from 'styles';

import type { TypographyProps } from 'types';

const { typography } = classes;

const H1 = styled.h1<TypographyProps>(props => typography.typography(props));
const H2 = styled.h2<TypographyProps>(props => typography.typography(props));
const H3 = styled.h3<TypographyProps>(props => typography.typography(props));
const H4 = styled.h4<TypographyProps>(props => typography.typography(props));
const H5 = styled.h5<TypographyProps>(props => typography.typography(props));
const H6 = styled.h6<TypographyProps>(props => typography.typography(props));
const P = styled.p<TypographyProps>(props => typography.typography(props));
const Span = styled.span<TypographyProps>(props => typography.typography(props));

export { H1, H2, H3, H4, H5, H6, P, Span };
