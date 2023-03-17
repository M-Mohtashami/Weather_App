import './src/styles/index.css';
import { app } from './src/App';

const wheather = document.getElementById('app');

if (localStorage.theme === 'dark') {
  document.documentElement.classList.add('dark');
} else {
  document.documentElement.classList.remove('dark');
}

wheather.appendChild(app());
wheather.classList.add('h-full');
wheather.classList.add('dark:bg-slate-800');
