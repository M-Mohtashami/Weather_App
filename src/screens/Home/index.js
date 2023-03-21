import { El, DB } from '@/library';
import { Textfield } from '@/components';
import { svgs } from '@/assets';
import { debounce } from 'lodash/function';

const apiRequest = new DB();
apiRequest.setBaseUrl('https://api.openweathermap.org/data/2.5');

let historySearch = JSON.parse(localStorage.getItem('History')) || [];

const renderCard = (data, elem) => {
  const details = El({
    element: 'div',
    className: 'flex flex-col items-center gap-6',
    children: [
      El({
        element: 'span',
        className: 'font-semibold',
        innerText: data.name + ' , ' + data.sys.country,
      }),
      El({
        element: 'div',
        className: 'flex items-center gap-8',
        children: [
          El({
            element: 'img',
            className: 'w-16',
            src: `https://openweathermap.org/img/w/${data.weather[0].icon}.png`,
          }),
          El({
            element: 'div',
            className: 'flex flex-col items-center justify-center',
            children: [
              El({
                element: 'span',
                className: 'font-semibold',
                innerText: data.weather[0].main,
              }),
              El({
                element: 'span',
                className: 'text-sm',
                innerText: data.weather[0].description,
              }),
            ],
          }),
        ],
      }),
      El({
        element: 'div',
        className: 'flex items-end justify-center gap-8',
        children: [
          El({
            element: 'div',
            className: 'flex justify-center',
            children: [
              El({
                element: 'span',
                className: 'text-6xl font-bold',
                innerText: parseInt(data.main.temp),
              }),
              El({
                element: 'span',
                className: 'text-lg',
                innerText: 'o',
              }),
            ],
          }),
          El({
            element: 'span',
            className: 'text-lg',
            innerText:
              parseInt(data.main.temp_max) + '/' + parseInt(data.main.temp_min),
          }),
        ],
      }),
      El({
        element: 'span',
        className: 'text-lg',
        innerText: new Date().toDateString(),
      }),
      El({
        element: 'div',
        className: 'flex flex-col items-start justify-between gap-2',
        children: [
          El({
            element: 'div',
            className: 'flex items-center justify-center gap-4',
            children: [
              El({
                element: 'span',
                className:
                  '[&_path]:fill-slate-600 dark:[&_path]:fill-slate-100',
                innerHTML: svgs.Wind,
              }),
              El({
                element: 'span',
                className:
                  ' pr-6 border-r-2 border-slate-600 dark:border-slate-200',
                innerText: 'Wind',
              }),
              El({
                element: 'span',
                className: '',
                innerText: data.wind.speed,
              }),
            ],
          }),
          El({
            element: 'div',
            className: 'flex items-start justify-center gap-2',
            children: [
              El({
                element: 'span',
                className:
                  '[&_path]:fill-blue-600 dark:[&_path]:fill-slate-100',
                innerHTML: svgs.Humid,
              }),
              El({
                element: 'span',
                className:
                  'text-left pr-2 border-r-2 border-slate-600 dark:border-slate-200',
                innerText: 'Humid',
              }),
              El({
                element: 'span',
                className: '',
                innerText: data.main.humidity,
              }),
            ],
          }),
        ],
      }),
    ],
  });
  elem.innerHTML = '';
  elem.appendChild(details);
};
const renderHistory = () => {
  const searchHistory =
    document.getElementById('search-history') ||
    El({
      element: 'div',
      className:
        'w-full flex flex-row gap-4 md:flex-col col-span-2 md:col-span-1 truncate',
    });
  searchHistory.innerHTML = '';
  historySearch = JSON.parse(localStorage.getItem('History'));
  if (historySearch) {
    historySearch.map((item) => {
      apiRequest.setEndPoint(
        `weather?q=${item}&appid=c2a5e5757bf8e2de367336c584de74bd&units=metric`
      );
      apiRequest.getDB().then((data) => {
        const row = El({
          element: 'div',
          className:
            'flex items-center gap-2 p-2 w-full bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-600 dark:border-gray-700',
          children: [
            El({
              element: 'img',
              className: 'w-16',
              src: `https://openweathermap.org/img/w/${data.weather[0].icon}.png`,
            }),
            El({
              element: 'div',
              className: 'flex flex-col items-center',
              children: [
                El({
                  element: 'span',
                  className: 'font-semibold',
                  innerText: data.name + ' , ' + data.sys.country,
                }),
                El({
                  element: 'span',
                  className: '',
                  innerText: data.weather[0].main,
                }),
              ],
            }),
            El({
              element: 'div',
              className: 'flex justify-center',
              children: [
                El({
                  element: 'span',
                  className: 'text-6xl font-bold',
                  innerText: parseInt(data.main.temp),
                }),
                El({
                  element: 'span',
                  className: 'text-lg',
                  innerText: 'o',
                }),
              ],
            }),
          ],
        });
        searchHistory.appendChild(row);
      });
    });
  }
  return searchHistory;
};

const apiData = (e) => {
  const wheatherCard = document.getElementById('wheather-details');
  const content = document.getElementById('content');
  const searchBox = document.getElementById('search-box');
  apiRequest.setEndPoint(
    `weather?q=${e.target.value}&appid=c2a5e5757bf8e2de367336c584de74bd&units=metric`
  );
  apiRequest.getDB().then((data) => {
    if (e.target.value === '') {
      content.classList.add('opacity-0');
      content.classList.remove('opacity-100');
      searchBox.classList.remove('-translate-y-20');
    } else {
      content.classList.add('opacity-100');
      content.classList.remove('opacity-0');
      searchBox.classList.add('-translate-y-20');
      renderCard(data, wheatherCard);
      if (historySearch) {
        historySearch.unshift(data.name);
        localStorage.setItem('History', JSON.stringify(historySearch));
      } else {
        let historySearch = [];
        historySearch.unshift(data.name);
        localStorage.setItem('History', JSON.stringify(historySearch));
      }
      console.log(data);
    }
  });
};

export const home = () => {
  return El({
    element: 'div',
    className: 'text-slate-700 dark:text-slate-200',
    children: [
      El({
        element: 'div',
        id: 'search-box',
        className:
          'w-2/3 lg:w-2/4 xl:w-1/2 mx-auto relative transition ease-in-out duration-500 z-20',
        children: [
          Textfield({
            placeholder: 'search',
            variant: 'search',
            onkeyup: debounce(apiData, 500),
          }),
          El({
            element: 'span',
            className: 'absolute left-2',
            innerHTML: svgs.SearchIcon,
          }),
        ],
      }),
      El({
        element: 'div',
        id: 'content',
        className:
          'mx-12 grid grid-cols-2 gap-8 lg:mx-64 transition-opacity ease-in-out duration-500 opacity-0',
        children: [
          El({
            element: 'div',
            id: 'wheather-details',
            className:
              'w-full h-auto p-6 col-span-2 md:col-span-1 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-600 dark:border-gray-700',
          }),
          El({
            element: 'div',
            id: 'search-history',
            className:
              'w-full h-96 flex flex-row gap-4 md:flex-col col-span-2 md:col-span-1 overflow-y-scroll',
            children: [renderHistory()],
          }),
        ],
      }),
    ],
  });
};
