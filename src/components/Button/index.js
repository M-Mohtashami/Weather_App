import { El } from '@/library';

const variants = {
  contained:
    'text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800',
  outlined: ' border border-2 text-blue-700 font-bold border-blue-700',
  link: 'bg-transparent',
};

export const Button = ({
  element = 'button',
  child,
  classes,
  variant = 'contained',
  ...rest
}) => {
  return El({
    element,
    className: `${variants[variant]} ${classes}`,
    children: [child],
    ...rest,
  });
};
