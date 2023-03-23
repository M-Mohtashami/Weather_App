import { El } from '@/library';
import { svgs } from '@/assets';
export const modal = (message, action) => {
  return El({
    element: 'div',
    className: 'relative w-full h-full max-w-md md:h-auto',
    children: [
      El({
        element: 'div',
        className: 'relative bg-white rounded-lg shadow dark:bg-gray-700',
        children: [
          El({
            element: 'button',
            type: 'button',
            className:
              'absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white" data-modal-hide="popup-modal',
            onclick: (e) => {
              const modal = e.target.closest('#popup-modal');
              console.log(modal);
              modal.classList.add('hidden');
            },
            children: [
              El({
                element: 'span',
                innerHTML: svgs.Close,
              }),
              El({
                element: 'span',
                className: 'sr-only',
                innerText: 'Close modal',
              }),
            ],
          }),
          El({
            element: 'div',
            className: 'p-6 text-center',
            children: [
              El({
                element: 'span',
                className:
                  'flex items-center justify-center [&_path]:fill-gray-400 dark:[&_path]:fill-gray-400',
                innerHTML: svgs.InfoSvgIcon,
              }),
              El({
                element: 'h3',
                className:
                  'mb-5 text-lg font-normal text-gray-500 dark:text-gray-400',
                innerText: message,
              }),
              El({
                element: 'button',
                type: 'button',
                className:
                  'text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2',
                onclick: action.func,
                innerText: action.text,
              }),
            ],
          }),
        ],
      }),
    ],
  });
};
