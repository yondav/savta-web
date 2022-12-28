import React from 'react';

import { useAuth } from 'contexts/firebase/auth';
import { Span, Image, Container, Cell, H3, P } from 'components';
import { toTitleCase } from 'utils/utils.textFormat';
import { Link, useSearchParams } from 'react-router-dom';
import type { User } from 'types';

import Write from './Write';

function Read({ user }: { user: User }) {
  return (
    <Container grid={{ cols: 6, gap: { x: 20, y: 20 } }} tw='mt-20'>
      <Cell span={{ col: 6 }} flex={{ column: true, alignItems: 'flex-start' }}>
        <Link to='?state=edit' tw='ml-auto'>
          <Span color='link'>Edit/Update</Span>
        </Link>
      </Cell>
      <Cell span={{ col: 6 }} sm={{ col: 3 }} md={{ col: 2 }}>
        {user.image && (
          <Image
            src={user?.image}
            alt={user?.firstName}
            variant='square'
            tw='max-w-[350px]'
          />
        )}
      </Cell>
      <Cell span={{ col: 6 }} sm={{ col: 3 }} md={{ col: 4 }}>
        <H3>{toTitleCase(`${user.firstName} ${user.lastName}`)}</H3>
        <P>{user.email.value}</P>
      </Cell>
    </Container>
  );
}

export default function Dashboard() {
  const { user } = useAuth();

  const [search] = useSearchParams();

  if (!user)
    return (
      <Container tw='mt-2.5 w-[fit-content] mx-auto'>
        <H3>You&apos;re no longer logged in.</H3>
        <Link to='/auth/login'>
          <Span color='link'>Login</Span>
        </Link>
      </Container>
    );

  return search.get('state') === 'edit' ? <Write user={user} /> : <Read user={user} />;
}
