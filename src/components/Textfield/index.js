import { svgs } from '@/assets'
import El from '@/library/El'

export const Textfield = ({
  label,
  helperText,
  error = false,
  ...inputProps
}) => {
  return El({
    element: 'div',
    className: 'flex text-gray-600 flex-col px-1',
    child: [
      El({
        element: 'label',
        className: 'text-sm mb-1 px-1',
        child: label || '',
      }),
      El({
        className: `px-1 py-3 outline-none border  rounded-md
        ${error ? 'border-red-400' : ' border-blue-400'}
        `,
        element: 'input',
        ...inputProps,
      }),
      El({
        element: 'p',
        className: 'text-xs flex gap-1 mt-2 px-1',
        child: helperText
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
                child: helperText,
              }),
            ]
          : '',
      }),
    ],
  })
}
