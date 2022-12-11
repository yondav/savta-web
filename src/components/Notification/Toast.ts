import { motion } from 'framer-motion';
import { styled } from 'twin.macro';

import { classes } from 'styles';

const {
  notification: { toast, animation, transition },
} = classes;

const Toast = styled(motion.div).attrs({
  variants: animation,
  initial: 'hidden',
  animate: 'visible',
  exit: 'hidden',
  transition,
})<{ variant?: 'primary' | 'success' | 'danger' }>(({ variant = 'primary' }) =>
  toast({ variant })
);

export default Toast;
