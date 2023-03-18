import { Button, Textfield } from '@/components';
import { El } from '@/library/elem';
import { routes } from '@/Routes';
import { DB } from '@/library';

export const login = () => {
  return El({
    element: 'form',
    id: 'login-form',
    eventListener: [
      {
        event: 'submit',
        callback: loginHandler,
      },
    ],
    className:
      'bg-slate-100 p-4 py-12 rounded-md border border-slate-200 shadow-md dark:bg-slate-600 dark:border-slate-500 dark:shadow-slate-400 dark:shadow-sm',
    children: [
      Textfield({
        label: 'Your email',
        type: 'email',
        name: 'email',
        placeholder: 'example@wheather.com',
        required: true,
      }),
      Textfield({
        label: 'Your password',
        type: 'password',
        name: 'password',
        required: true,
      }),
      Button({
        child: 'Login',
        type: 'submit',
      }),
      El({
        element: 'span',
        className: 'text-slate-800 pl-4 dark:text-slate-200',
        innerText: 'or',
      }),
      Button({
        child: 'Register',
        id: 'to-register',
        eventListener: [
          {
            event: 'click',
            callback: toRegistration,
          },
        ],
        type: 'submit',
        variant: 'link',
        classes:
          'text-slate-800 font-semibold px-4 underline dark:text-slate-200',
      }),
    ],
  });
};

export const loginHandler = (e) => {
  e.preventDefault();
  const users = new DB('users');
  const formData = new FormData(e.target);
  users.setEndPoint(`users?email=${formData.get('email')}`);

  users.getItem().then((response) => {
    if (response !== []) {
      response[0].password === formData.get('password')
        ? history.pushState(null, null, '/')
        : history.pushState(null, null, '/login');
    } else {
      history.pushState(null, null, '/register');
      console.log('user not found');
    }

    routes();
  });
};
export const toRegistration = () => {
  history.pushState(null, null, '/register');
  routes();
};
