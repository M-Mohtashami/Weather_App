import './src/styles/index.css';
import { app } from './src/App';
import { svgs } from './src/assets/svgs/index';
import Cookies from 'js-cookie';
import { renderHome } from './src/screens/Home/index';

const wheather = document.getElementById('app');
console.log(Cookies.get('weather'));
Cookies.get('weather')
  ? history.pushState(null, null, '/')
  : history.pushState(null, null, '/login');
wheather.appendChild(app());
wheather.classList.add('h-full');
wheather.classList.add('dark:bg-slate-800');

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

renderHome();
