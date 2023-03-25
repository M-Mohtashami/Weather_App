import { El } from '@/library';
import { svgs } from '@/assets';
export const spiner = () => {
  return El({
    element: 'div',
    className: 'w-16 h-16 flex items-center justify-center',
    innerHTML: svgs.Spiner,
  });
};
