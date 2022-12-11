import React, { useEffect, useState } from 'react';
import { Outlet, useLocation, useParams } from 'react-router-dom';
import tw, { styled } from 'twin.macro';

import { Container, Spinner } from 'components';
import { useAuth } from 'contexts/auth';
import Logo from 'components/Logo';

enum AuthRoutes {
  login = 'login',
  signup = 'signup',
  verify = 'verify-account',
  forgot = 'forgot-password',
  verifyReset = 'verify-reset',
  reset = 'reset-password',
  dashboard = 'dashboard',
}

const Wrapper = styled(Container)(
  tw`bottom-28 mx-auto w-full h-full min-h-screen bg-neutral-400 rounded-none bg-center bg-cover bg-no-repeat saturate-150`
);

const Card = styled(Container)<{ path: AuthRoutes }>(({ path }) => [
  tw`w-full bg-neutral-100 rounded-lg shadow-2xl`,
  path === AuthRoutes.signup && tw`max-w-[600px]`,
  (path === AuthRoutes.login || path === AuthRoutes.forgot) && tw`max-w-[400px]`,
  (path === AuthRoutes.verify || path === AuthRoutes.verifyReset) &&
    tw`max-w-[450px] w-[fit-content]`,
  path === AuthRoutes.reset && tw`max-w-[450px]`,
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
      flex={{ justifyContent: 'center', alignItems: 'center' }}
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
