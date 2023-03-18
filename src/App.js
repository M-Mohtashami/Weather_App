import { El } from '@/library';
import { modeToggle } from '@/layout';
export const app = () => {
  return El({
    element: 'div',
    children: [modeToggle()],
  });
};
