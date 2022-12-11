import { AnimatePresence, motion } from 'framer-motion';
import React, { useCallback, useEffect } from 'react';
import { IoMdClose } from 'react-icons/io';
import { styled } from 'twin.macro';

import { classes } from 'styles';

import type { ModalProps } from 'types';

import Container from '../Container';
import Dimmer from '../Dimmer';

const { modal } = classes;

const ModalContainer = styled(motion.div).attrs({
  variants: { hidden: { opacity: 0 }, visible: { opacity: 1 } },
  initial: 'hidden',
  animate: 'visible',
  exit: 'hidden',
  transition: { duration: 0.2, delay: 0.1, ease: 'linear' },
})<{ fitted?: ModalProps['fitted'] }>(({ fitted }) => modal.container({ fitted }));

const Wrapper = styled(motion.div).attrs({
  variants: { hidden: { y: 500 }, visible: { y: 0 } },
  initial: 'hidden',
  animate: 'visible',
  exit: 'hidden',
  transition: { duration: 0.2, delay: 0.1, ease: 'linear' },
})(modal.wrapper);

const CloseContainer = styled.div(modal.close);

const ModalHeader = styled.header(() => modal.header);

const ModalBody = styled.article(() => modal.body);

export default function Modal({ open, handleClose, fitted, children }: ModalProps) {
  const handleBlur = useCallback(() => {
    document.body.style.overflow = 'unset';
    document.documentElement.style.overflow = 'auto';
    handleClose();
  }, [handleClose]);

  useEffect(() => {
    if (open) {
      document.documentElement.style.overflow = 'hidden';
    } else {
      document.documentElement.style.overflow = 'auto';
    }
  }, [open]);

  return (
    <AnimatePresence>
      {open && (
        <>
          <Dimmer key='dimmer' active={open} onClick={handleBlur} />
          <ModalContainer key='modal' fitted={fitted}>
            <Wrapper>
              <CloseContainer onClick={handleBlur}>
                <IoMdClose size='1.6em' />
              </CloseContainer>
              <Container flex={{ column: true, gap: { x: 20, y: 20 } }} tw='h-full'>
                {children}
              </Container>
            </Wrapper>
          </ModalContainer>
        </>
      )}
    </AnimatePresence>
  );
}

export { ModalBody, ModalHeader };
