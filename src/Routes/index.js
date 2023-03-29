import { auth, home, welcome } from '@/screens';
import { login, register } from '@/layout';
import { El } from '@/library';
import Cookies from 'js-cookie';

const privateRoutes = (elem, child) => {
  if (Cookies.get('weather')) {
    return elem.appendChild(child);
  } else {
    history.pushState(null, null, '/login');
    return elem.appendChild(auth(login()));
  }
};

export const routes = () => {
  const routesEl = document.getElementById('routes') || El({ element: 'div' });
  routesEl.innerHTML = '';
  console.log(location.pathname);
  switch (location.pathname) {
    case '/welcome':
      return routesEl.appendChild(welcome());
    case '/':
    case '/home':
      document.getElementById('logout').classList.remove('hidden');
      return privateRoutes(routesEl, home());
    case '/login':
      return routesEl.appendChild(auth(login()));
    case '/register':
      return routesEl.appendChild(auth(register()));
    default:
      return (routesEl.innerHTML = 'page not found');
  }
};
