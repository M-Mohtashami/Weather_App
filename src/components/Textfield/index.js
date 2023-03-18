import { svgs } from '@/assets';
import { El } from '@/library';

export const Textfield = ({
  label,
  helperText = '',
  error = false,
  ...inputProps
}) => {
  return El({
    element: 'div',
    className: 'mb-6',
    children: [
      El({
        element: 'label',
        className:
          'block mb-2 text-sm font-medium text-gray-900 dark:text-white',
        children: label || '',
      }),
      El({
        className: `bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`,
        element: 'input',
        ...inputProps,
      }),
      El({
        element: 'p',
        className: 'text-xs flex gap-1 mt-2 px-1',
        children: helperText
          ? [
              El({
                element: 'span',
                className: error
                  ? '[&_path]:fill-red-500'
                  : '[&_path]:fill-blue-500',
                innerHTML: error ? svgs.ErrorSvgIcon : svgs.InfoSvgIcon,
              }),
              El({
                element: 'span',
                className: `flex-1 ${error ? 'text-red-500' : 'text-gray-500'}`,
                children: helperText,
              }),
            ]
          : '',
      }),
    ],
  });
};
