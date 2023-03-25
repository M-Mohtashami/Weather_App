import { El } from '@/library';
import { routes } from '@/Routes';
import { renderHome } from '@/screens';
import Cookies from 'js-cookie';
import { spiner } from '@/components';

const goHome = () => {
  if (Cookies.get('weather')) {
    history.pushState(null, null, '/home');
  } else {
    history.pushState(null, null, '/login');
  }
  routes();
};

export const welcome = () => {
  setTimeout(goHome, 4000);
  return El({
    element: 'div',
    className:
      'absolute top-0 left-0 bg-white dark:bg-slate-800 flex items-center justify-center w-full h-full z-50',
    children: [
      El({
        element: 'video',
        className: 'w-full h-96',
        loop: true,
        autoplay: true,
        muted: true,
        controls: false,
        children: [
          El({
            element: 'source',
            src: './src/assets/video/Lightning_Bolt_At_Night.mp4',
            type: 'video/mp4',
          }),
        ],
      }),
      El({
        element: 'h1',
        className:
          'absolute text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 text-6xl font-bold animate-pulse',
        innerText: 'WEATHER APP',
      }),
    ],
  });
};
