import tw from 'twin.macro';

export const notification = {
  bar: tw`p-2.5 fixed bottom-0 left-0 w-full bg-accent-orange text-neutral-50 text-center z-50`,
  toast: ({ variant = 'primary' }: { variant?: 'danger' | 'success' | 'primary' }) => [
    tw`p-5 fixed bottom-2.5 left-2.5 w-80 rounded-md shadow-xl text-neutral-50 z-50`,
    variant === 'primary' && tw`bg-accent-orange`,
    variant === 'danger' && tw`bg-accent-red`,
    variant === 'success' && tw`bg-accent-green`,
  ],
  animation: {
    hidden: { y: 100 },
    visible: { y: 0 },
  },
  transition: { duration: 0.3, delay: 0.3, delayChildren: 0.2, ease: 'linear' },
};
