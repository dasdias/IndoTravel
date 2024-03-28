import {modal} from './modal.js';
import {createModal} from './modalconfirm.js';
import {validateName} from './validateFields.js';

// const reservationTitle = document.querySelector('.reservation__title');


const reservationForm = document.querySelector('.reservation__form');
const tourForm = document.querySelector('.tour__form');
const footerForm = document.querySelector('.footer__form');

const reservationPrice = document.querySelector('.reservation__price');
// const reservationName = document.getElementById('reservation__name');

const URL = 'https://jsonplaceholder.typicode.com/';

const fetchRequest = async (url, {
  method = 'GET',
  callback,
  body,
  headers,
}) => {
  try {
    const options = {
      method,
    };
    // собираем body если есть
    if (body) options.body = JSON.stringify(body);
    // собираем headers если есть
    if (headers) options.headers = headers;

    // отправляем запрос
    const response = await fetch(url, options);

    // если ответ положительный, обрабатываем ответ
    if (response.ok) {
      const data = await response.json();
      // если есть callback функция, вызываем её и передаём ответ от сервера
      if (callback) callback(null, data);
      return;
    }

    // если ответ от сервера с ошибкой, то вызываем ошибку и передаём статус
    throw new Error(`Ошибка ${response.status} ${response.statusText}`);
  } catch (error) {
    // при ошибке вызываем колбек функцию и передаём ошибку
    callback(error);
  }
};


export const sendData = () => {
  // Форма "Бронирование тура"
  reservationForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const formTarget = e.target;

    const formData = {
      name: formTarget.name?.value || '',
      dates: formTarget.dates?.value || '',
      peopleCount: +formTarget.people?.value || '',
      price: reservationPrice.textContent?.trim() || '',
      phone: formTarget.phone?.value || '',
      mail: formTarget.mail?.value || '',
    };
    if (!validateName()) return;

    const checkConfirm = await modal(formData);


    if (!checkConfirm) return;


    fetchRequest(URL + 'posts', {
      method: 'POST',
      callback(err, data) {
        if (err) {
          formTarget.textContent = err;
          const {modalWrap} = createModal(`Упс... Что-то пошло не так`,
            `Не удалось отправить заявку.
            Пожалуйста, повторите отправку ещё раз`,
          );
          modalWrap.addEventListener('click', (e) => {
            const target = e.target;
            if (target.classList.contains('modal-wrap')) {
              target.remove();
            }
          });
          setTimeout(() => {
            modalWrap.remove();
          }, 6000);
          document.body.append(modalWrap);
          return;
        }
        const {modalWrap} = createModal(`Ваша заявка успешно <br> отправлена`,
          `Наши менеджеры свяжутся с вами в течении 3-х рабочих дней`, true);

        for (let i = 0; i < formTarget.elements.length; i++) {
          const element = formTarget.elements[i];
          element.setAttribute('disabled', true);
        }

        modalWrap.addEventListener('click', (e) => {
          const target = e.target;
          if (target.classList.contains('modal-wrap')) {
            target.remove();
          }
        });
        setTimeout(() => {
          modalWrap.remove();
        }, 6000);
        document.body.append(modalWrap);
      },
      body: {
        userId: Date.now(),
        title: `${formTarget.querySelector('.reservation__title')?.textContent ?
          `${formTarget.querySelector('.reservation__title').textContent}` :
          `${formTarget.querySelector('.footer__form-title').textContent}`} `,
        body: `${formTarget.dates?.value ?
            `Дата бронирования: ${formTarget.dates?.value};` : ''}
          ${formTarget.people?.value ?
            `Кол-во человек: ${formTarget.people?.value};` : ''}
          ${formTarget.name?.value ?
            `ФИО: ${formTarget.name?.value};` : ''}
          ${formTarget.phone?.value ?
            `Телефон: ${formTarget.phone?.value};` : ''}
          ${reservationPrice.textContent.trim() !== '0₽' ?
            `Цена общая: ${reservationPrice.textContent};` : ''}
          ${formTarget.mail?.value ? `E-mail: ${formTarget.mail?.value}` : ''}`,
      },
      headers: {'Content-type': 'application/json; charset=UTF-8'},
    });
  });

  // форма футера
  footerForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const formTarget = e.target;

    fetchRequest(URL + 'posts', {
      method: 'POST',
      callback(err, data) {
        if (err) {
          formTarget.textContent = err;
          const {modalWrap} = createModal(`Упс... Что-то пошло не так`,
            `Не удалось отправить заявку.
            Пожалуйста, повторите отправку ещё раз`,
          );
          modalWrap.addEventListener('click', (e) => {
            const target = e.target;
            if (target.classList.contains('modal-wrap')) {
              target.remove();
            }
          });
          setTimeout(() => {
            modalWrap.remove();
          }, 6000);
          document.body.append(modalWrap);
          return;
        }
        const {modalWrap} = createModal(`Ваша заявка успешно <br> отправлена`,
          `Наши менеджеры свяжутся с вами в течении 3-х рабочих дней`, true);

        for (let i = 0; i < formTarget.elements.length; i++) {
          const element = formTarget.elements[i];
          element.setAttribute('disabled', true);
        }

        modalWrap.addEventListener('click', (e) => {
          const target = e.target;
          if (target.classList.contains('modal-wrap')) {
            target.remove();
          }
        });
        setTimeout(() => {
          modalWrap.remove();
        }, 6000);
        document.body.append(modalWrap);
      },
      body: {
        userId: Date.now(),
        title: `${formTarget.querySelector('.reservation__title')?.textContent ?
          `${formTarget.querySelector('.reservation__title').textContent}` :
          `${formTarget.querySelector('.footer__form-title').textContent}`} `,
        body: `${formTarget.dates?.value ?
            `Дата бронирования: ${formTarget.dates?.value};` : ''}
          ${formTarget.people?.value ?
            `Кол-во человек: ${formTarget.people?.value};` : ''}
          ${formTarget.name?.value ?
            `ФИО: ${formTarget.name?.value};` : ''}
          ${formTarget.phone?.value ?
            `Телефон: ${formTarget.phone?.value};` : ''}
          ${reservationPrice.textContent.trim() !== '0₽' ?
            `Цена общая: ${reservationPrice.textContent};` : ''}
          ${formTarget.mail?.value ? `E-mail: ${formTarget.mail?.value}` : ''}`,
      },
      headers: {'Content-type': 'application/json; charset=UTF-8'},
    });
  });

  // форма узнать цену тура
  tourForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const formTarget = e.target;

    fetchRequest(URL + 'posts', {
      method: 'POST',
      callback(err, data) {
        if (err) {
          formTarget.textContent = err;
          const {modalWrap} = createModal(`Упс... Что-то пошло не так`,
            `Не удалось отправить заявку.
            Пожалуйста, повторите отправку ещё раз`,
          );
          modalWrap.addEventListener('click', (e) => {
            const target = e.target;
            if (target.classList.contains('modal-wrap')) {
              target.remove();
            }
          });
          setTimeout(() => {
            modalWrap.remove();
          }, 6000);
          document.body.append(modalWrap);
          return;
        }
        const {modalWrap} = createModal(`Ваша заявка успешно <br> отправлена`,
          `Наши менеджеры свяжутся с вами в течении 3-х рабочих дней`, true);

        for (let i = 0; i < formTarget.elements.length; i++) {
          const element = formTarget.elements[i];
          element.setAttribute('disabled', true);
        }

        modalWrap.addEventListener('click', (e) => {
          const target = e.target;
          if (target.classList.contains('modal-wrap')) {
            target.remove();
          }
        });
        setTimeout(() => {
          modalWrap.remove();
        }, 6000);
        document.body.append(modalWrap);
      },
      body: {
        userId: Date.now(),
        title: `Узнать цену`,
        body: `${formTarget.dates?.value ?
            `Дата бронирования: ${formTarget.dates?.value};` : ''}
          ${formTarget.people?.value ?
            `Кол-во человек: ${formTarget.people?.value};` : ''}
          ${formTarget.name?.value ?
            `ФИО: ${formTarget.name?.value};` : ''}
          ${formTarget.phone?.value ?
            `Телефон: ${formTarget.phone?.value};` : ''}
          ${reservationPrice.textContent.trim() !== '0₽' ?
            `Цена общая: ${reservationPrice.textContent};` : ''}
          ${formTarget.mail?.value ? `E-mail: ${formTarget.mail?.value}` : ''}`,
      },
      headers: {'Content-type': 'application/json; charset=UTF-8'},
    });
  });
};
