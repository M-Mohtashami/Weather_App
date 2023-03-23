import { auth, home } from '@/screens';
import { login, register } from '@/layout';
import { El } from '@/library';

const privateRoutes = (elem, child) => {
  return Cookies.get('weather')
    ? elem.appendChild(child)
    : elem.appendChild(auth(login()));
};

export const routes = () => {
  const routesEl = document.getElementById('routes') || El({ element: 'div' });
  routesEl.innerHTML = '';
  console.log(location.pathname);
  switch (location.pathname) {
    case '/':
      return routesEl.appendChild(home());
    case '/login':
      return routesEl.appendChild(auth(login()));
    case '/register':
      return routesEl.appendChild(auth(register()));
    default:
      return (routesEl.innerHTML = 'page not found');
  }
};
