import { El, DB } from '@/library';
import { Textfield } from '@/components';
import { svgs } from '@/assets';
import { debounce } from 'lodash/function';
import { spiner } from '@/components';

const apiRequest = new DB();
apiRequest.setBaseUrl('https://api.openweathermap.org/data/2.5');

let historySearch = JSON.parse(localStorage.getItem('History')) || [];

const renderCard = (data, elem) => {
  const details = El({
    element: 'div',
    className: 'w-full flex flex-col items-center gap-6',
    children: [
      El({
        element: 'span',
        className: 'font-semibold',
        innerText: data.name + ' , ' + data.sys.country,
      }),
      El({
        element: 'div',
        className: 'w-full flex items-center justify-center gap-16',
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
        className: 'w-full flex items-end justify-center gap-16',
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
              El({
                element: 'span',
                className: 'text-4xl',
                innerHTML: ' C',
              }),
            ],
          }),
          El({
            element: 'span',
            className: 'text-2xl',
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
                  '[&_path]:fill-slate-600 dark:[&_path]:fill-slate-100 w-5',
                innerHTML: svgs.Wind,
              }),
              El({
                element: 'span',
                className:
                  ' w-16 border-r-2 border-slate-600 dark:border-slate-200',
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
            className: 'flex items-start justify-between gap-4',
            children: [
              El({
                element: 'span',
                className:
                  '[&_path]:fill-blue-600 dark:[&_path]:fill-slate-100 w-5',
                innerHTML: svgs.Humid,
              }),
              El({
                element: 'span',
                className:
                  'text-left w-16 border-r-2 border-slate-600 dark:border-slate-200',
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
        'h-auto flex flex-row gap-4 md:flex-col col-span-2 md:col-span-1 overflow-x-scroll md:h-96 md:overflow-y-scroll scrollbar-hide hover:scroll-auto',
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
          dataset: {
            name: data.name,
          },
          className:
            'w-full max-w-xs flex items-center justify-between flex-shrink-0 gap-2 p-2 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-600 dark:border-gray-700 cursor-pointer',
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
                  className: 'text-sm truncate md:text-md md:font-semibold',
                  innerText: data.name + ' , ' + data.sys.country,
                }),
                El({
                  element: 'span',
                  className: 'text-sm md:text-md',
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
                  className: 'text-2xl md:text-6xl md:font-bold',
                  innerText: parseInt(data.main.temp),
                }),
                El({
                  element: 'span',
                  className: 'text-sm md:text-lg',
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

export const renderHome = () => {
  const weatherCard = document.getElementById('wheather-details');
  const content = document.getElementById('content');
  const searchBox = document.getElementById('search-box');
  const searchIcon = document.getElementById('search-icon');
  const search = document.getElementById('search');

  if (historySearch) {
    content.classList.add('opacity-100');
    content.classList.remove('opacity-0');
    searchIcon.classList.remove('top-6');
    searchIcon.classList.add('top-4');
    searchBox.classList.add('-translate-y-20');
    search.classList.remove('p-4', 'dark:bg-gray-600', 'bg-gray-200');
    search.classList.add('p-2.5', 'dark:bg-gray-700', 'bg-gray-50');
    apiRequest.setEndPoint(
      `weather?q=${historySearch[0]}&appid=c2a5e5757bf8e2de367336c584de74bd&units=metric`
    );
    weatherCard.innerHTML = '';
    weatherCard.appendChild(spiner());
    apiRequest.getDB().then((data) => {
      renderCard(data, weatherCard);
    });
    renderHistory();
  }
};

const apiData = (e) => {
  const weatherCard = document.getElementById('wheather-details');
  const content = document.getElementById('content');
  const searchBox = document.getElementById('search-box');
  const searchIcon = document.getElementById('search-icon');
  const search = document.getElementById('search');
  apiRequest.setEndPoint(
    `weather?q=${e.target.value}&appid=c2a5e5757bf8e2de367336c584de74bd&units=metric`
  );
  weatherCard.innerHTML = '';
  weatherCard.appendChild(spiner());
  apiRequest.getDB().then((data) => {
    if (e.target.value === '' && !historySearch) {
      content.classList.add('opacity-0');
      content.classList.remove('opacity-100');
      searchIcon.classList.add('top-6');
      searchIcon.classList.remove('top-4');
      searchBox.classList.remove('-translate-y-20');
      search.classList.add('p-4', 'dark:bg-gray-600', 'bg-gray-200');
      search.classList.remove('p-2.5', 'dark:bg-gray-700', 'bg-gray-50');
      renderHome();
    } else {
      content.classList.add('opacity-100');
      content.classList.remove('opacity-0');
      searchIcon.classList.remove('top-6');
      searchIcon.classList.add('top-4');
      searchBox.classList.add('-translate-y-20');
      search.classList.remove('p-4', 'dark:bg-gray-600', 'bg-gray-200');
      search.classList.add('p-2.5', 'dark:bg-gray-700', 'bg-gray-50');
      renderCard(data, weatherCard);
      if (historySearch) {
        historySearch.length >= 6 ? historySearch.pop() : null;
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

const historyHandler = (e) => {
  const weatherCard = document.getElementById('wheather-details');
  if (!e.target.closest('[data-name]')) return;
  const selected = e.target.closest('[data-name]').dataset.name;
  apiRequest.setEndPoint(
    `weather?q=${selected}&appid=c2a5e5757bf8e2de367336c584de74bd&units=metric`
  );
  weatherCard.innerHTML = '';
  weatherCard.appendChild(spiner());
  apiRequest.getDB().then((data) => {
    renderCard(data, weatherCard);
  });
};

export const home = () => {
  setTimeout(renderHome, 100);
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
            id: 'search',
            variant: 'search',
            onkeyup: debounce(apiData, 500),
          }),
          El({
            element: 'span',
            id: 'search-icon',
            className: 'absolute left-2 top-6',
            innerHTML: svgs.SearchIcon,
          }),
          El({
            element: 'ul',
            id: 'prev-search',
            className:
              'w-full bg-white absolute top-14 rounded-b-md bg-opacity-70 hidden',
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
              'w-full mx-auto flex items-center justify-center max-w-sm h-auto p-4 col-span-2 md:col-span-1 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-600 dark:border-gray-700',
          }),
          El({
            element: 'div',
            id: 'search-history',
            eventListener: [
              {
                event: 'click',
                callback: historyHandler,
              },
            ],
            className:
              'h-auto flex flex-row gap-4 md:flex-col col-span-2 md:col-span-1 overflow-x-scroll md:h-96 md:overflow-y-scroll scrollbar-hide',
            children: [renderHistory()],
          }),
        ],
      }),
    ],
  });
};
