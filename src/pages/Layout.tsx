import React from 'react';
import { Outlet } from 'react-router-dom';
import tw, { styled } from 'twin.macro';

import { Container, Nav } from 'components';

const Wrapper = styled(Container)(
  tw`relative top-28 bottom-28 mx-auto max-w-[1170px] h-full min-h-[calc(100vh - 9rem)]`
);

export default function Layout() {
  return (
    <>
      <Nav />
      <Wrapper as='main' grid={{ cols: 16, gap: { x: 20, y: 20 } }}>
        <Outlet />
      </Wrapper>
    </>
  );
}
