import { motion } from 'framer-motion';
import React, { useEffect, useState } from 'react';
import { Outlet, useLocation, useParams } from 'react-router-dom';
import tw, { styled } from 'twin.macro';

import { Container, Spinner } from 'components';
import { useAuth } from 'contexts/firebase/auth';
import Logo from 'components/Logo';

enum AuthRoutes {
  login = 'login',
  signup = 'signup',
  forgot = 'forgot-password',
  dashboard = 'dashboard',
}

const Wrapper = styled(motion.div).attrs(() => ({
  variants: {
    hidden: { filter: 'saturate(100%)' },
    visible: { filter: 'saturate(150%)' },
  },
  initial: 'hidden',
  animate: 'visible',
  exit: 'hidden',
  transition: { duration: 0.5, ease: 'linear' },
}))(
  tw`flex justify-center items-center bottom-28 mx-auto w-full h-full min-h-screen bg-neutral-400 rounded-none bg-center bg-cover bg-no-repeat saturate-150`
);

const Card = styled(Container)<{ path: AuthRoutes }>(({ path }) => [
  tw`w-full bg-neutral-50 rounded-lg shadow-2xl transition-all`,
  path === AuthRoutes.signup && tw`max-w-[600px]`,
  (path === AuthRoutes.login || path === AuthRoutes.forgot) && tw`max-w-[400px]`,
  path === AuthRoutes.dashboard && tw`max-w-[1024px]`,
]);

const bg =
  'https://savtas-cookbook.s3.amazonaws.com/hamza-nouasria-awgx32myh0u-unsplashjpg';
export default function Layout() {
  const [path, setPath] = useState<AuthRoutes>(AuthRoutes.login);
  const { pathname } = useLocation();
  const query = useParams();

  const { loading } = useAuth();

  useEffect(() => {
    const currPathArr = pathname.split('/');
    setPath(
      query.otp
        ? (currPathArr[currPathArr.length - 2] as AuthRoutes)
        : (currPathArr[currPathArr.length - 1] as AuthRoutes)
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [path, pathname]);

  return (
    <Wrapper
      // flex={{ justifyContent: 'center', alignItems: 'center' }}
      style={{ backgroundImage: `url(${bg})` }}
    >
      <Card path={path}>
        <Container
          as='header'
          flex={{ justifyContent: 'center', alignItems: 'center' }}
          tw='max-w-[50%] mx-auto'
        >
          <Logo />
        </Container>
        {loading ? (
          <Container
            flex={{ justifyContent: 'center', alignItems: 'center' }}
            tw='w-full h-full'
          >
            <Spinner />
          </Container>
        ) : (
          <Outlet />
        )}
      </Card>
    </Wrapper>
  );
}
