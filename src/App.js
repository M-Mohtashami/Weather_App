import { El } from '@/library';
import { modal, modeToggle } from '@/layout';
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
        id: 'popup-modal',
        tabindex: '-1',
        className:
          'fixed top-0 left-0 right-0 z-50 p-4 hidden flex items-center justify-center bg-slate-700 bg-opacity-50 dark:bg-slate-200 dark:bg-opacity-50 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] md:h-full',
      }),
      El({
        element: 'div',
        id: 'routes',
        children: [routes()],
      }),
    ],
  });
};
