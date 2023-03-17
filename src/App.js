import { El } from '@/library/elem';
export const app = () => {
  return El({
    element: 'button',
    className:
      'p-2 rounded-md bg-blue-500 text-gray-100 dark:bg-gray-100 dark:text-slate-700 float-right m-8',
    children: ['Switch Mode'],
    onclick: () => {
      document.documentElement.classList.toggle('dark');
      if (document.documentElement.classList.contains('dark')) {
        localStorage.theme = 'dark';
      } else {
        localStorage.theme = 'light';
      }
    },
  });
};
