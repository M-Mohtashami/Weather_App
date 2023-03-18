import { El } from '@/library';

export const auth = (child) => {
  return El({
    element: 'div',
    className: 'w-[80%] md:w-[60%] lg:w-[50%] mx-auto',
    children: [child],
  });
};
