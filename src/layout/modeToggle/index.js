import { El } from '@/library';
import { svgs } from '@/assets';
import Cookies from 'js-cookie';
import { routes } from '@/Routes';

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

const logoutHandler = (e) => {
  Cookies.remove('weather');
  e.currentTarget.classList.add('hidden');
  document.getElementById('routes').classList.toggle('-translate-x-[100%]');
  setTimeout(() => {
    document.getElementById('routes').classList.toggle('-translate-x-[100%]');
    history.pushState(null, null, '/login');
    routes();
  }, 500);
};

export const modeToggle = () => {
  return El({
    element: 'div',
    className: 'w-full h-20 reletive',
    children: [
      El({
        element: 'button',
        type: 'button',
        className:
          'float-right m-4 text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none rounded-lg text-sm p-2.5',
        innerHTML: svgs.DarkIcon + svgs.LightIcon,
        eventListener: [
          {
            event: 'click',
            callback: modeSwitcher,
          },
        ],
      }),
      El({
        element: 'button',
        type: 'button',
        id: 'logout',
        className:
          'float-left m-4 text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg focus:outline-none text-sm p-2.5 [&_path]:fill-slate-600 dark:[&_path]:fill-slate-400 hidden transform rotate-180 ',
        innerHTML: svgs.Logout,
        eventListener: [
          {
            event: 'click',
            callback: logoutHandler,
          },
        ],
      }),
    ],
  });
};
