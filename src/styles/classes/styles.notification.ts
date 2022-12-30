import tw from 'twin.macro';

export const notification = {
  bar: tw`p-2.5 fixed bottom-0 left-0 w-full bg-orange-400 text-neutral-50 text-center z-50`,
  toast: ({ variant = 'primary' }: { variant?: 'danger' | 'success' | 'primary' }) => [
    tw`p-5 font-semibold fixed bottom-2.5 left-2.5 w-80 rounded-md shadow-xl text-neutral-50 z-50`,
    variant === 'primary' && tw`bg-yellow-400 text-black`,
    variant === 'danger' && tw`bg-red-400`,
    variant === 'success' && tw`bg-green-400`,
  ],
  animation: {
    hidden: { y: 100 },
    visible: { y: 0 },
  },
  transition: { duration: 0.3, delay: 0.3, delayChildren: 0.2, ease: 'linear' },
};
