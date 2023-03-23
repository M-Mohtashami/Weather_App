import { El } from '@/library';

export const auth = (child) => {
  return El({
    element: 'div',
    className: 'w-[80%] max-w-sm mx-auto',
    children: [child],
  });
};
