import { El } from '@/library';
import { svgs } from '@/assets';

const modeSwitcher = () => {
  const dark = document.getElementById('theme-toggle-dark-icon');
  const light = document.getElementById('theme-toggle-light-icon');

  document.documentElement.classList.toggle('dark');
  if (document.documentElement.classList.contains('dark')) {
    localStorage.theme = 'dark';
    dark.classList.add('hidden');
    light.classList.remove('hidden');
  } else {
    localStorage.theme = 'light';
    dark.classList.remove('hidden');
    light.classList.add('hidden');
  }
};
export const modeToggle = () => {
  return El({
    element: 'button',
    type: 'button',
    className:
      'float-right m-4 text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-2.5',
    innerHTML: svgs.DarkIcon + svgs.LightIcon,
    eventListener: [
      {
        event: 'click',
        callback: modeSwitcher,
      },
    ],
  });
};
