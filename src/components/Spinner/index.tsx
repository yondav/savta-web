import Container from 'components/Container';
import Dimmer from 'components/Dimmer';
import React from 'react';
import { ImSpinner6 } from 'react-icons/im';
import { styled } from 'twin.macro';

import { classes } from 'styles';
import type { SpinnerProps } from 'types';

import ConditionalWrapper from '../ConditionalWrapper';

const { spinner } = classes;

const Styled = styled(ImSpinner6)(spinner.spinner);

export default function Spinner({ container }: SpinnerProps) {
  return (
    <ConditionalWrapper
      condition={Boolean(container)}
      wrapper={children => (
        <Container
          flex={{ justifyContent: 'center', alignItems: 'center' }}
          css={container?.size === 'screen' ? spinner.screen : spinner.full}
        >
          {container?.dim && <Dimmer active />}
          {children}
        </Container>
      )}
    >
      <Styled />
    </ConditionalWrapper>
  );
}
