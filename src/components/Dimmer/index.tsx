import { motion } from 'framer-motion';
import React from 'react';
import { styled } from 'twin.macro';

import { classes } from 'styles';

import type { DimmerProps } from 'types';

const { dimmer } = classes;

const Dimmer = styled(
  ({
    animate = true,
    ...props
  }: {
    active?: boolean;
    onClick?: () => void;
    animate?: boolean;
  }) => (
    <motion.div
      variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}
      initial={animate ? 'hidden' : 'visible'}
      animate='visible'
      exit='hidden'
      transition={{ duration: 0.6, delay: 0.2, ease: 'easeOut' }}
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      {...(({ active, ...rest }) => rest)(props)}
    />
  )
)<DimmerProps>(({ active }) => dimmer({ active }));

export default Dimmer;
