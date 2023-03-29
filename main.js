import './src/styles/index.css';
import { app } from './src/App';
import { svgs } from './src/assets/svgs/index';
import Cookies from 'js-cookie';
import { renderHome } from './src/screens/Home/index';
import { routes } from './src/Routes';

const weather = document.getElementById('app');
history.pushState(null, null, '/welcome');
// Cookies.get('weather')
//   ? history.pushState(null, null, '/')
//   : history.pushState(null, null, '/login');
weather.appendChild(app());
weather.classList.add('h-full');
weather.classList.add(
  'font-rubik',
  'bg-gradient-to-tl',
  'from-blue-600',
  'via-blue-400',
  'to-blue-200',
  'dark:bg-[radial-gradient(ellipse_at_left,_var(--tw-gradient-stops))]',
  'dark:from-blue-600',
  'dark:via-blue-900',
  'dark:to-slate-800'
);

if (localStorage.theme === 'dark') {
  const dark = document.getElementById('theme-toggle-dark-icon');
  const light = document.getElementById('theme-toggle-light-icon');
  document.documentElement.classList.add('dark');
  dark.classList.add('hidden');
  light.classList.remove('hidden');
} else {
  const dark = document.getElementById('theme-toggle-dark-icon');
  const light = document.getElementById('theme-toggle-light-icon');
  document.documentElement.classList.remove('dark');
  dark.classList.remove('hidden');
  light.classList.add('hidden');
}
// renderHome();
window.addEventListener('popstate', (e) => {
  if (location.pathname === '/welcome') history.pushState(null, null, '/');
  routes();
});
