import { motion } from 'framer-motion';
import { styled } from 'twin.macro';

import { classes } from 'styles';

const {
  notification: { bar, animation, transition },
} = classes;

const Bar = styled(motion.div).attrs({
  variants: animation,
  initial: 'hidden',
  animate: 'visible',
  exit: 'hidden',
  transition,
})(bar);

export default Bar;
