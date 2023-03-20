import { El, DB } from '@/library';
import { Textfield } from '@/components';
import { svgs } from '@/assets';

const apiData = () => {
  const apiRequest = new DB();
  apiRequest.setBaseUrl('https://api.openweathermap.org/data/2.5');
  apiRequest.setEndPoint(
    'weather?q=chabahar&appid=c2a5e5757bf8e2de367336c584de74bd'
  );
  console.log(apiRequest.getDB());
  return `<div>${apiRequest.getDB()} </div>`;
};

export const home = () => {
  return El({
    element: 'div',
    className:
      'w-2/3 lg:w-2/4 xl:w-1/2 mx-auto flex justify-center items-center text-slate-700 dark:text-slate-200',
    children: [
      El({
        element: 'div',
        className: 'w-full relative',
        children: [
          Textfield({
            placeholder: 'search',
            variant: 'search',
          }),
          El({
            element: 'span',
            className: 'absolute left-2',
            innerHTML: svgs.SearchIcon,
          }),
        ],
      }),
      apiData(),
    ],
  });
};
