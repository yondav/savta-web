import tw from 'twin.macro';

export const uploader = {
  single: {
    input: () => tw`pointer-events-none opacity-0 absolute top-0 left-0 w-full h-full`,
    content: {
      animation: {
        variants: { hidden: { opacity: 0 }, visible: { opacity: 1 } },
        initial: 'hidden',
        exit: 'hidden',
        animate: 'visible',
        transition: { duration: 0.2, ease: 'linear' },
      },
      style: () =>
        tw`absolute w-full bottom-0 left-0 max-h-[50%] p-3.5 bg-[#8083a5d1] uppercase rounded-b-xl`,
    },
    container: () => tw`relative p-0 bg-purple-200 cursor-pointer`,
  },
};
