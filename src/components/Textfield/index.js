import { svgs } from '@/assets';
import { El } from '@/library';

const variants = {
  regular:
    'bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500',
  search:
    'bg-gray-200 border border-gray-300 text-gray-900 text-md rounded-lg focus:outline-none absolute w-full p-4 px-8 dark:bg-gray-600 dark:border-gray-600 dark:placeholder-gray-200 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500',
};

export const Textfield = ({
  label,
  helperText = '',
  error = false,
  variant = 'regular',
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
        className: `${variants[variant]}`,
        element: 'input',
        autocomplete: 'off',
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
