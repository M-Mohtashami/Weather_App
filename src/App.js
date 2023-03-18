import { El } from '@/library';
import { modeToggle } from '@/layout';
import { auth } from '@/screens';
import { routes } from '@/Routes';

export const app = () => {
  return El({
    element: 'div',
    className: '',
    children: [
      modeToggle(),
      El({
        element: 'div',
        id: 'routes',
        children: [routes()],
      }),
    ],
  });
};
