import { auth } from '@/screens';
import { login, register } from '@/layout';
import { El } from '@/library';

export const routes = () => {
  const routesEl = document.getElementById('routes') || El({ element: 'div' });
  routesEl.innerHTML = '';
  console.log(location.pathname);
  switch (location.pathname) {
    case '/':
      return (routesEl.innerHTML = 'Welcome to Wheather App');
    case '/login':
      return routesEl.appendChild(auth(login()));
    case '/register':
      return routesEl.appendChild(auth(register()));
    default:
      return (routesEl.innerHTML = 'page not found');
  }
};
