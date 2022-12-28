import { AnimatePresence } from 'framer-motion';
import React, { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import tw, { styled } from 'twin.macro';

import { Container, Nav, Spinner } from 'components';
import { useAuth } from 'contexts/firebase/auth';
import { useToast } from 'contexts/toast';
import { toTitleCase } from 'utils/utils.textFormat';

const Wrapper = styled(Container)(
  tw`relative top-28 bottom-28 mx-auto max-w-[1170px] h-full min-h-[calc(100vh - 9rem)]`
);

export default function Layout() {
  const { authenticated, user, loading } = useAuth();
  const { toast } = useToast();

  const navigate = useNavigate();

  useEffect(() => {
    if (!loading) {
      const checkUser = () => {
        if (!authenticated) navigate('/auth/login');
        else if (authenticated && user)
          toast(`Welcome back ${toTitleCase(`${user.firstName} ${user.lastName}`)}`);
      };

      checkUser();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authenticated, loading, user]);

  return (
    <>
      <Nav />
      <Wrapper as='main' grid={{ cols: 16, gap: { x: 20, y: 20 } }}>
        <AnimatePresence>
          {loading && <Spinner container={{ size: 'screen', dim: true }} />}
        </AnimatePresence>
        <Outlet />
      </Wrapper>
    </>
  );
}
