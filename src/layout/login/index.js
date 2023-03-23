import { Button, Textfield } from '@/components';
import { routes } from '@/Routes';
import { DB, El } from '@/library';
import { modal } from '@/layout';
import { AES } from 'crypto-js';
import Cookies from 'js-cookie';

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
      El({
        element: 'div',
        className: 'flex items-start mb-6',
        children: [
          El({
            element: 'div',
            className: 'flex items-center h-5',
            children: [
              El({
                element: 'input',
                id: 'remember',
                name: 'remember',
                type: 'checkbox',
                value: '1',
                className:
                  'w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800',
              }),
            ],
          }),
          El({
            element: 'label',
            for: 'remember',
            className:
              'ml-2 text-sm font-medium text-gray-900 dark:text-gray-300',
            innerText: 'Remember Me',
          }),
        ],
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
  const popupModal = document.getElementById('popup-modal');
  const users = new DB('users');
  const formData = new FormData(e.target);
  const { email, password } = Object.fromEntries(formData);
  const token = AES.encrypt(JSON.stringify(email), password).toString();
  console.log(token);
  users.setEndPoint(`users?email=${formData.get('email')}`);

  users.getItem().then((response) => {
    console.log(response.length);
    if (response.length > 0) {
      if (response[0].password === formData.get('password')) {
        formData.has('remember')
          ? Cookies.set('weather', token, { expires: 7 })
          : null;
        history.pushState(null, null, '/');
        routes();
      } else {
        e.target.reset();
        popupModal.classList.remove('hidden');
        popupModal.innerHTML = '';
        popupModal.appendChild(
          modal('Input password is not corrected please try again', {
            text: 'Try Again',
            func: (e) => {
              history.pushState(null, null, '/login');
              e.target.closest('#popup-modal').classList.add('hidden');
              routes();
            },
          })
        );
      }
    } else {
      popupModal.classList.remove('hidden');
      popupModal.innerHTML = '';
      popupModal.appendChild(
        modal(
          'This email is not a registered email please fill registration form',
          {
            text: 'Registration',
            func: (e) => {
              history.pushState(null, null, '/register');
              e.target.closest('#popup-modal').classList.add('hidden');
              routes();
            },
          }
        )
      );
    }
  });
};
export const toRegistration = () => {
  history.pushState(null, null, '/register');
  routes();
};
