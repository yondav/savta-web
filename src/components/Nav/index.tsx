import React from 'react';
import { Link } from 'react-router-dom';
import { styled } from 'twin.macro';

import { classes } from 'styles';

import { useAuth } from 'contexts/auth';

import Logo from '../Logo';
import Container from '../Container';
import Image from '../Img';
import { Span } from '../Typography';

const { nav } = classes;

const Header = styled.header(nav.header);
// const Logo = styled.img.attrs( () => ( {
// 	src: logo,
// 	alt: 'Kinetic IQ Logo'
// } ) )( nav.logo );

export default function Nav() {
  const { user, cookie, logout } = useAuth();

  return (
    <Header>
      <Container flex={{ alignItems: 'center', justifyContent: 'space-between' }}>
        <Link to='/' tw='max-w-[200px] text-accent-pink'>
          <Logo />
          {/* <H1>Savta&apos;s Cookbook</H1> */}
        </Link>
        {user && cookie ? (
          <Container flex={{ column: true, alignItems: 'center' }} tw='p-0'>
            <Container
              as={Link}
              to={`/auth/${user.id}/dashboard`}
              flex={{ justifyContent: 'center', alignItems: 'center' }}
              tw='w-[34px] h-[34px] p-0 bg-medium-orange text-neutral-50 text-xl rounded-full'
            >
              {user.img ? (
                <Image src={user.img} alt={user?.firstName} variant='circle' />
              ) : (
                <Span weight='heavy'>{user?.firstName[0].toUpperCase()}</Span>
              )}
            </Container>
            <Span
              weight='semi'
              color='link'
              onClick={logout}
              tw='cursor-pointer ml-auto text-xs'
            >
              Log out
            </Span>
          </Container>
        ) : (
          <Link to='/auth/login'>
            <Span weight='semi' color='link'>
              Log in
            </Span>
          </Link>
        )}
      </Container>
    </Header>
  );
}
