import React from 'react';
import { createGlobalStyle } from 'styled-components';
import tw, { GlobalStyles as BaseStyles } from 'twin.macro';

import { root } from './root';

const CustomStyles = createGlobalStyle({
  ':root': root,

  html: {
    ...tw`text-neutral-900 text-base min-w-[350px] overflow-x-hidden scroll-behavior[smooth] transition-all duration-200 ease-linear`,
  },

  body: {
    fontFamily: 'Montserrat',
    ...tw`antialiased bg-light-pink text-neutral-900 font-normal transition-all duration-200 ease-linear`,
  },

  h1: { ...tw`text-4xl` },
  h2: { ...tw`text-3xl` },
  h3: { ...tw`text-2xl` },
  h4: { ...tw`text-xl` },
  h5: { ...tw`text-lg` },
  h6: { ...tw`text-base` },
  span: { ...tw`text-sm` },
  p: { ...tw`text-base` },
});

export default function Styles() {
  return (
    <>
      <BaseStyles />
      <CustomStyles />
    </>
  );
}
